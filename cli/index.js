#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const { extract } = require('tar');
const chalk = require('chalk').default;
const { createSpinner } = require('nanospinner');

// 🔧 CONFIG: Point to your public GitHub template repo
const GITHUB_USER = 'Om7035'; // ← CHANGE THIS!
const REPO_NAME = 'novarn';
const BRANCH = 'main';

// Version check function
async function checkForUpdates() {
  try {
    const response = await axios.get(`https://registry.npmjs.org/create-nova-rn/latest`, { timeout: 3000 });
    const latestVersion = response.data.version;
    const currentVersion = require('./package.json').version;
    
    if (latestVersion !== currentVersion) {
      console.log(chalk.yellow(`⚠️  New version available: ${latestVersion} (current: ${currentVersion})`));
      console.log(chalk.yellow(`   Run 'npm install -g create-nova-rn' to update\n`));
    }
  } catch (err) {
    // Silently fail update check
  }
}

// Progress tracking for downloads
function createDownloadProgress() {
  let lastLogged = 0;
  return (loaded, total) => {
    const percent = Math.round((loaded / total) * 100);
    if (percent - lastLogged >= 5 || percent === 100) {
      lastLogged = percent;
      process.stdout.write(`\r${chalk.gray(`📥 Downloading template: ${percent}%`)}`);
    }
  };
}

program
  .name('create-nova-rn')
  .description('Create a new NovaRN app with Expo, TypeScript, and offline-first architecture.')
  .version(require('./package.json').version)
  .argument('<project-directory>', 'Directory for the new project')
  .option('-t, --template <template>', 'Template to use (default: full)', 'full')
  .option('-v, --verbose', 'Enable verbose logging')
  .action(async (projectDir, options) => {
    const targetDir = path.resolve(process.cwd(), projectDir);
    const spinner = createSpinner('Creating your NovaRN app...').start();

    // Check for updates
    await checkForUpdates();

    if (fs.existsSync(targetDir)) {
      spinner.error({ text: `Directory "${projectDir}" already exists!` });
      process.exit(1);
    }

    if (options.verbose) {
      console.log(chalk.cyan(`\n🚀 Creating a new NovaRN app in:\n   ${targetDir}\n`));
    }

    try {
      // Create project folder
      await fs.ensureDir(targetDir);
      spinner.success({ text: 'Project directory created' });
      spinner.start({ text: 'Downloading template...' });

      // Download tarball from GitHub (public repo → no auth needed)
      const tarballUrl = `https://codeload.github.com/${GITHUB_USER}/${REPO_NAME}/tar.gz/${BRANCH}`;
      
      if (options.verbose) {
        console.log(chalk.gray(`📥 Fetching latest template from:\n   ${tarballUrl}\n`));
      }

      const response = await axios({
        method: 'GET',
        url: tarballUrl,
        responseType: 'stream',
        timeout: 30000,
        onDownloadProgress: options.verbose ? createDownloadProgress() : undefined
      });

      // Extract directly into targetDir (strip top-level folder from tar)
      spinner.start({ text: 'Extracting template...' });
      await new Promise((resolve, reject) => {
        response.data
          .pipe(extract({ strip: 1, C: targetDir }))
          .on('finish', resolve)
          .on('error', reject);
      });

      // Update package.json name to match folder and clean up CLI folder
      spinner.start({ text: 'Updating project configuration...' });
      const pkgPath = path.join(targetDir, 'package.json');
      if (await fs.pathExists(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);
        pkg.name = path.basename(targetDir);
        // Remove private flag so it can be published if needed
        delete pkg.private;
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
      }

      // Remove CLI folder from the template (not needed in user projects)
      const cliPath = path.join(targetDir, 'cli');
      if (await fs.pathExists(cliPath)) {
        await fs.remove(cliPath);
      }

      // Remove .git folder if it exists
      const gitPath = path.join(targetDir, '.git');
      if (await fs.pathExists(gitPath)) {
        await fs.remove(gitPath);
      }

      spinner.success({ text: 'NovaRN app created successfully!' });
      console.log(chalk.green('\n✅ Success! Your NovaRN app is ready.'));
      console.log(chalk.white(`
Next steps:
  cd ${projectDir}
  npm install
  npx expo start
`));

    } catch (err) {
      spinner.error({ text: `Failed to create project: ${err.message || err}` });
      await fs.remove(targetDir).catch(() => {});
      process.exit(1);
    }
  });

// Add list-templates command
program
  .command('list-templates')
  .description('List available templates')
  .action(() => {
    console.log(chalk.cyan('\nAvailable templates:'));
    console.log(chalk.white('  full - Full-featured NovaRN template (default)'));
    console.log(chalk.white('  minimal - Minimal NovaRN template (coming soon)'));
    console.log(chalk.gray('\nNote: Currently only the full template is available.\n'));
  });

// Add info command
program
  .command('info')
  .description('Display information about NovaRN')
  .action(() => {
    console.log(chalk.cyan('\nNovaRN - The Vibe-Coded Expo Boilerplate'));
    console.log(chalk.white('A production-ready React Native boilerplate that just works.'));
    console.log(chalk.gray('\nKey Features:'));
    console.log(chalk.gray('  • Expo Router with file-based routing'));
    console.log(chalk.gray('  • TypeScript strict mode'));
    console.log(chalk.gray('  • Authentication with secure token handling'));
    console.log(chalk.gray('  • Offline-first architecture with MMKV'));
    console.log(chalk.gray('  • Dark/light mode with system preference'));
    console.log(chalk.gray('  • TanStack Query + Axios for data fetching'));
    console.log(chalk.gray('  • Zustand for state management'));
    console.log(chalk.gray('  • Form handling and validation utilities'));
    console.log(chalk.gray('  • Global error boundaries'));
    console.log(chalk.gray('  • Rich UI component library'));
    console.log(chalk.gray('\nLearn more: https://github.com/Om7035/novarn\n'));
  });

program.parse();