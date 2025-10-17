#!/usr/bin/env node

/**
 * Dependency Verification Script
 * Checks if all imports in the project correspond to installed dependencies
 * and identifies unused dependencies
 */

const fs = require('fs');
const path = require('path');

// Get project root directory
const projectRoot = path.resolve(__dirname, '..');

// Read package.json to get dependencies
const packageJsonPath = path.join(projectRoot, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const dependencies = {
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
};

// Function to get all files in a directory recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Skip node_modules and other unnecessary directories
      if (!filePath.includes('node_modules') && 
          !filePath.includes('.git') && 
          !filePath.includes('dist') &&
          !filePath.includes('build')) {
        arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Function to extract imports from a file
function extractImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const importRegex = /import\s+.*?\s+from\s+['"](.*?)['"]/g;
  const requireRegex = /require\(['"](.*?)['"]\)/g;
  
  const imports = [];
  let match;

  // Extract ES6 imports
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  // Extract CommonJS requires
  while ((match = requireRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

// Function to check if an import is a local import
function isLocalImport(importPath) {
  return (
    importPath.startsWith('.') || 
    importPath.startsWith('/') || 
    importPath.startsWith('@/')
  );
}

// Function to resolve package name from import path
function getPackageName(importPath) {
  // Handle scoped packages
  if (importPath.startsWith('@')) {
    const parts = importPath.split('/');
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : importPath;
  }
  
  // Handle regular packages
  const parts = importPath.split('/');
  return parts[0];
}

// Function to check if a package is installed
function isPackageInstalled(packageName) {
  return dependencies.hasOwnProperty(packageName);
}

// Function to check if a module is a built-in Node.js module
function isBuiltInModule(moduleName) {
  const builtInModules = [
    'fs', 'path', 'os', 'util', 'events', 'stream', 'buffer', 'crypto',
    'zlib', 'assert', 'console', 'constants', 'domain', 'dns', 'http',
    'https', 'net', 'dgram', 'readline', 'repl', 'tls', 'url', 'querystring',
    'vm', 'child_process', 'cluster', 'module', 'process', 'punycode',
    'string_decoder', 'sys', 'timers', 'tty', 'v8', 'worker_threads'
  ];
  
  return builtInModules.includes(moduleName);
}

// Main verification function
function verifyDependencies() {
  console.log('🔍 Verifying dependencies...\n');
  
  const files = getAllFiles(path.join(projectRoot, 'src'));
  const usedPackages = new Set();
  const missingDependencies = new Set();
  const unresolvedImports = [];
  
  files.forEach((filePath) => {
    const relativePath = path.relative(projectRoot, filePath);
    console.log(`Checking ${relativePath}...`);
    
    const imports = extractImports(filePath);
    
    imports.forEach((importPath) => {
      // Skip local imports
      if (isLocalImport(importPath)) {
        return;
      }
      
      const packageName = getPackageName(importPath);
      
      // Skip built-in Node.js modules
      if (isBuiltInModule(packageName)) {
        return;
      }
      
      // Skip React and React Native (they're special cases)
      if (packageName === 'react' || packageName === 'react-native') {
        return;
      }
      
      // Add to used packages
      usedPackages.add(packageName);
      
      // Check if package is installed
      if (!isPackageInstalled(packageName)) {
        missingDependencies.add(packageName);
        unresolvedImports.push({
          file: relativePath,
          import: importPath,
          package: packageName,
        });
      }
    });
  });
  
  // Find unused dependencies
  const installedPackages = Object.keys(dependencies);
  const unusedDependencies = installedPackages.filter(pkg => !usedPackages.has(pkg));
  
  // Report results
  let hasIssues = false;
  
  if (missingDependencies.size > 0) {
    hasIssues = true;
    console.log('\n❌ Missing dependencies found:');
    missingDependencies.forEach((dep) => {
      console.log(`  - ${dep}`);
    });
    
    console.log('\n📝 Unresolved imports:');
    unresolvedImports.forEach(({ file, import: imp, package: pkg }) => {
      console.log(`  ${file}: ${imp} (package: ${pkg})`);
    });
    
    console.log('\n🔧 To fix missing dependencies, run:');
    console.log(`  npm install ${Array.from(missingDependencies).join(' ')}`);
  }
  
  if (unusedDependencies.length > 0) {
    hasIssues = true;
    console.log('\n⚠️  Unused dependencies found:');
    unusedDependencies.forEach((dep) => {
      console.log(`  - ${dep}`);
    });
    
    console.log('\n💡 Consider removing unused dependencies to reduce bundle size.');
  }
  
  if (!hasIssues) {
    console.log('\n✅ All dependencies are properly installed and no unused dependencies found!');
  }
  
  return !hasIssues;
}

// Run the verification
try {
  const success = verifyDependencies();
  process.exit(success ? 0 : 1);
} catch (error) {
  console.error('Error during dependency verification:', error);
  process.exit(1);
}