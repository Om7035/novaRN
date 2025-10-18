#!/usr/bin/env node

/**
 * Post-install script for NovaRN
 * Installs optional dependencies for enhanced features
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 NovaRN: Installing enhanced features...');

// Optional dependencies for enhanced features
const enhancedDeps = [
  '@tanstack/react-query@^5.90.5',
  '@tanstack/react-query-persist-client@^5.90.7', 
  '@tanstack/query-sync-storage-persister@^5.90.7',
  'react-native-mmkv@^3.3.3',
  'react-native-netinfo@^1.1.0'
];

const devDeps = [
  '@testing-library/jest-native@^5.4.3',
  '@testing-library/react-native@^13.3.3',
  'eslint@^9.25.0',
  'eslint-config-expo@~10.0.0',
  'jest@^30.2.0',
  '@expo/cli@^54.0.11',
  'expo-module-scripts@^5.0.7'
];

try {
  console.log('📦 Installing enhanced dependencies...');
  execSync(`npm install ${enhancedDeps.join(' ')}`, { stdio: 'inherit' });
  
  console.log('🧪 Installing development dependencies...');
  execSync(`npm install --save-dev ${devDeps.join(' ')}`, { stdio: 'inherit' });
  
  console.log('✅ Enhanced features installed successfully!');
  console.log('');
  console.log('🎉 Your NovaRN app is ready with:');
  console.log('   • Offline-first data fetching');
  console.log('   • Secure authentication');
  console.log('   • Testing setup');
  console.log('   • Development tools');
  console.log('');
  console.log('Next steps:');
  console.log('   npx expo start');
  
} catch (error) {
  console.log('⚠️  Some enhanced features could not be installed.');
  console.log('   Your app will still work with core features.');
  console.log('   Run "npm install" again to retry.');
}
