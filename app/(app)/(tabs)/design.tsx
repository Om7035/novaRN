/**
 * Design System Showcase Screen
 * Demonstrates all available components and design tokens
 */

import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

export default function DesignSystemScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Design System</Text>
      <Text style={styles.subtitle}>Showcase of all available components and design tokens</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Theme Toggle</Text>
        <View style={styles.componentContainer}>
          <ThemeToggle />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Typography</Text>
        <View style={styles.componentContainer}>
          <Text style={styles.textXs}>Extra Small Text</Text>
          <Text style={styles.textSm}>Small Text</Text>
          <Text style={styles.textMd}>Medium Text</Text>
          <Text style={styles.textLg}>Large Text</Text>
          <Text style={styles.textXl}>Extra Large Text</Text>
          <Text style={styles.textXxl}>2X Large Text</Text>
          <Text style={styles.textXxxl}>3X Large Text</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Colors</Text>
        <View style={styles.componentContainer}>
          <View style={[styles.colorBox, { backgroundColor: '#3b82f6' }]}>
            <Text style={styles.colorLabel}>Primary</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: '#10b981' }]}>
            <Text style={styles.colorLabel}>Success</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: '#ef4444' }]}>
            <Text style={styles.colorLabel}>Error</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: '#f59e0b' }]}>
            <Text style={styles.colorLabel}>Warning</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  componentContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
  },
  textXs: {
    fontSize: 12,
    marginBottom: 8,
  },
  textSm: {
    fontSize: 14,
    marginBottom: 8,
  },
  textMd: {
    fontSize: 16,
    marginBottom: 8,
  },
  textLg: {
    fontSize: 18,
    marginBottom: 8,
  },
  textXl: {
    fontSize: 20,
    marginBottom: 8,
  },
  textXxl: {
    fontSize: 24,
    marginBottom: 8,
  },
  textXxxl: {
    fontSize: 32,
    marginBottom: 8,
  },
  colorBox: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});