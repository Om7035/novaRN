/**
 * Mock API functions for demonstration purposes
 * Simulates network requests with delays and potential errors
 */

// Mock data
let mockTasks = [
  { id: '1', title: 'Learn React Native', completed: true },
  { id: '2', title: 'Build a NovaRN app', completed: false },
  { id: '3', title: 'Deploy to Expo', completed: false },
];

let nextId = 4;

/**
 * Simulates a network delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches all tasks
 */
export const fetchTasks = async (): Promise<any[]> => {
  await delay(1000); // Simulate network delay
  return [...mockTasks];
};

/**
 * Creates a new task
 */
export const createTask = async (title: string): Promise<any> => {
  await delay(500); // Simulate network delay
  
  const newTask = {
    id: String(nextId++),
    title,
    completed: false,
  };
  
  mockTasks = [...mockTasks, newTask];
  return newTask;
};

/**
 * Updates a task
 */
export const updateTask = async (id: string, updates: Partial<any>): Promise<any> => {
  await delay(300); // Simulate network delay
  
  mockTasks = mockTasks.map(task => 
    task.id === id ? { ...task, ...updates } : task
  );
  
  const updatedTask = mockTasks.find(task => task.id === id);
  return updatedTask;
};

/**
 * Deletes a task
 */
export const deleteTask = async (id: string): Promise<void> => {
  await delay(200); // Simulate network delay
  
  mockTasks = mockTasks.filter(task => task.id !== id);
};