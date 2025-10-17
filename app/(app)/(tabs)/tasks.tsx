import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useGetTasks, useCreateTask } from '@/features/tasks/hooks/useTasks';
import { TaskItem } from '@/features/tasks/components/TaskItem';

/**
 * Tasks screen for offline functionality demo
 * Shows how to handle offline data persistence with TanStack Query
 */
export default function TasksScreen() {
  const { data: tasks = [], isLoading, error } = useGetTasks();
  const createTaskMutation = useCreateTask();
  const [isOnline, setIsOnline] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      createTaskMutation.mutate({
        title: newTaskTitle,
        completed: false,
      });
      setNewTaskTitle('');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading tasks...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading tasks</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Offline badge */}
      {!isOnline && (
        <View style={styles.offlineBadge}>
          <Text style={styles.offlineText}>Offline</Text>
        </View>
      )}
      
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem 
            task={item} 
            onPress={() => console.log('Task pressed:', item.id)}
            onToggle={() => console.log('Toggle task:', item.id)}
          />
        )}
      />
      
      {/* Add task input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter new task"
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddTask}
          disabled={createTaskMutation.isPending}
        >
          <Text style={styles.addButtonText}>
            {createTaskMutation.isPending ? 'Adding...' : 'Add'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
    color: '#FF3B30',
  },
  offlineBadge: {
    backgroundColor: '#FF9500',
    padding: 8,
    alignItems: 'center',
  },
  offlineText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});