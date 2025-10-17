import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

/**
 * Task item component
 * Displays a single task with title and completion status
 */

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => onToggle(task.id)} style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, textDecorationLine: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={{ padding: 8 }}>
          <Text style={{ color: '#FF3B30' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
