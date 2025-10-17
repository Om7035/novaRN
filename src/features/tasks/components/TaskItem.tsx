/**
 * TaskItem Component
 * Displays a single task with title and status
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onPress?: (task: Task) => void;
  onToggle?: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onPress, onToggle }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.content} 
        onPress={() => onPress?.(task)}
        accessibilityRole="button"
      >
        <Text style={[styles.title, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.toggleButton, task.completed && styles.toggleButtonCompleted]}
        onPress={() => onToggle?.(task)}
        accessibilityRole="button"
        accessibilityLabel={task.completed ? "Mark as incomplete" : "Mark as complete"}
      >
        <Text style={styles.toggleButtonText}>
          {task.completed ? '✓' : '○'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  content: {
    flex: 1,
    paddingVertical: 5,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  toggleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonCompleted: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  toggleButtonText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: 'bold',
  },
});