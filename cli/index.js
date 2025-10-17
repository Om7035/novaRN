#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk').default;
const { createSpinner } = require('nanospinner');

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
      spinner.start({ text: 'Copying template files...' });

      // Get the root directory of the CLI (this file's directory)
      const cliRoot = path.resolve(__dirname);
      // Get the template directory (parent of cli directory)
      const templateDir = path.resolve(cliRoot, '..');
      
      if (options.verbose) {
        console.log(chalk.gray(`\n📁 Copying template from:\n   ${templateDir}\n`));
        console.log(chalk.gray(`📂 Copying to:\n   ${targetDir}\n`));
      }

      // Copy all files from template directory to target directory, excluding node_modules, .git, cli folder, and test-project
      const excludeDirs = ['node_modules', '.git', 'cli', 'test-project'];
      
      const copyOptions = {
        filter: (src) => {
          const relativePath = path.relative(templateDir, src);
          const parts = relativePath.split(path.sep);
          
          // Don't copy excluded directories
          return !parts.some(part => excludeDirs.includes(part));
        }
      };

      await fs.copy(templateDir, targetDir, copyOptions);

      // Update package.json name to match folder
      spinner.start({ text: 'Updating project configuration...' });
      const pkgPath = path.join(targetDir, 'package.json');
      if (await fs.pathExists(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);
        pkg.name = path.basename(targetDir);
        // Remove private flag so it can be published if needed
        delete pkg.private;
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
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