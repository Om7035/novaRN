/**
 * WelcomeScreen Component
 * Showcases the key features of NovaRN
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { useThemeStore } from '@/shared/store/useThemeStore';
import { useAppTheme } from '@/shared/hooks/use-app-theme';

export const WelcomeScreen = () => {
  const { theme } = useThemeStore();
  const effectiveTheme = useAppTheme();

  return (
    <ScrollView style={[styles.container, effectiveTheme === 'dark' && styles.darkContainer]} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={[styles.title, effectiveTheme === 'dark' && styles.darkTitle]}>Welcome to NovaRN!</Text>
        <Text style={[styles.subtitle, effectiveTheme === 'dark' && styles.darkSubtitle]}>The vibe-coded, production-ready Expo boilerplate</Text>
      </View>

      <View style={styles.featuresContainer}>
        <Text style={[styles.sectionTitle, effectiveTheme === 'dark' && styles.darkSectionTitle]}>Key Features</Text>
        
        <View style={[styles.featureCard, effectiveTheme === 'dark' && styles.darkFeatureCard]}>
          <Text style={[styles.featureTitle, effectiveTheme === 'dark' && styles.darkFeatureTitle]}>🔐 Secure Authentication</Text>
          <Text style={[styles.featureDescription, effectiveTheme === 'dark' && styles.darkFeatureDescription]}>
            Refresh tokens stored in expo-secure-store. 
            Access tokens live in memory only.
          </Text>
        </View>
        
        <View style={[styles.featureCard, effectiveTheme === 'dark' && styles.darkFeatureCard]}>
          <Text style={[styles.featureTitle, effectiveTheme === 'dark' && styles.darkFeatureTitle]}>📴 Offline-First</Text>
          <Text style={[styles.featureDescription, effectiveTheme === 'dark' && styles.darkFeatureDescription]}>
            Built-in optimistic updates and cache persistence with MMKV. 
            Your app works even when the internet doesn&apos;t.
          </Text>
        </View>
        
        <View style={[styles.featureCard, effectiveTheme === 'dark' && styles.darkFeatureCard]}>
          <Text style={[styles.featureTitle, effectiveTheme === 'dark' && styles.darkFeatureTitle]}>🎨 Theme Management</Text>
          <Text style={[styles.featureDescription, effectiveTheme === 'dark' && styles.darkFeatureDescription]}>
            Light/dark mode with automatic system preference detection 
            and persistent user choice.
          </Text>
          <View style={styles.themeToggleContainer}>
            <ThemeToggle />
            <Text style={[styles.themeStatus, effectiveTheme === 'dark' && styles.darkThemeStatus]}>
              Current mode: {theme} {theme === 'system' ? `(${effectiveTheme})` : ''}
            </Text>
          </View>
        </View>
        
        <View style={[styles.featureCard, effectiveTheme === 'dark' && styles.darkFeatureCard]}>
          <Text style={[styles.featureTitle, effectiveTheme === 'dark' && styles.darkFeatureTitle]}>📡 Data Fetching</Text>
          <Text style={[styles.featureDescription, effectiveTheme === 'dark' && styles.darkFeatureDescription]}>
            TanStack Query with automatic caching, background updates, 
            and error handling.
          </Text>
        </View>
        
        <View style={[styles.featureCard, effectiveTheme === 'dark' && styles.darkFeatureCard]}>
          <Text style={[styles.featureTitle, effectiveTheme === 'dark' && styles.darkFeatureTitle]}>🧭 File-Based Routing</Text>
          <Text style={[styles.featureDescription, effectiveTheme === 'dark' && styles.darkFeatureDescription]}>
            Expo Router with intuitive file-based routing structure. 
            No more manual navigation setup.
          </Text>
        </View>
      </View>

      <View style={[styles.ctaContainer, effectiveTheme === 'dark' && styles.darkCtaContainer]}>
        <Text style={styles.ctaText}>Try the Tasks tab to see offline sync in action!</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  darkTitle: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  darkSubtitle: {
    color: '#aaa',
  },
  featuresContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  darkSectionTitle: {
    color: '#fff',
  },
  featureCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  darkFeatureCard: {
    backgroundColor: '#2a2a2a',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  darkFeatureTitle: {
    color: '#fff',
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  darkFeatureDescription: {
    color: '#aaa',
  },
  themeToggleContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  themeStatus: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
  },
  darkThemeStatus: {
    color: '#aaa',
  },
  ctaContainer: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  darkCtaContainer: {
    backgroundColor: '#2563eb',
  },
  ctaText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});