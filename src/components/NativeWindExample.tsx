/**
 * NativeWind Example Component
 * Demonstrates the usage of Tailwind CSS classes in React Native
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const NativeWindExample = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
      <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        NativeWind Example
      </Text>
      <Text className="text-base text-gray-700 dark:text-gray-300 mb-6 text-center">
        This component uses Tailwind CSS classes for styling
      </Text>
      <TouchableOpacity className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-6 py-3 rounded-lg">
        <Text className="text-white font-semibold">Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};