import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTasks, createTask } from '@/shared/api/mockApi';

/**
 * Custom hook for task management with offline support
 * Provides data fetching and mutation functions for tasks
 */

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface CreateTaskContext {
  previousTasks?: Task[];
}

/**
 * Fetch all tasks from mock API
 */
export const useGetTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });
};

/**
 * Create a new task with optimistic updates and rollback
 */
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Task, Error, Partial<Task>, CreateTaskContext>({
    mutationFn: async (newTask) => {
      if (!newTask.title) {
        throw new Error('Task title is required');
      }
      return createTask(newTask.title);
    },
    
    // Optimistic update
    onMutate: async (newTask) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      
      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      
      // Optimistically update to the new value
      queryClient.setQueryData<Task[]>(['tasks'], (old) => [
        ...(old || []),
        {
          id: Date.now().toString(),
          title: newTask.title || 'New Task',
          completed: false,
        },
      ]);
      
      // Return a context object with the snapshotted value
      return { previousTasks };
    },
    
    // Rollback on error
    onError: (err, newTask, context) => {
      // Rollback to the previous value if mutation fails
      if (context?.previousTasks) {
        queryClient.setQueryData<Task[]>(['tasks'], context.previousTasks);
      }
    },
    
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};