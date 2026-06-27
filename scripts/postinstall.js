import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve directory names in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to recursively copy files
function copyRecursiveSync(src, dest, initCwd) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName),
        initCwd
      );
    });
  } else {
    // If the file already exists, let's not overwrite it to preserve user customizations.
    if (fs.existsSync(dest)) {
      console.log(`  - Skipping (already exists): ${path.relative(initCwd, dest)}`);
    } else {
      fs.copyFileSync(src, dest);
      console.log(`  - Created: ${path.relative(initCwd, dest)}`);
    }
  }
}

function run() {
  const packageRoot = path.resolve(__dirname, '..');
  
  // process.env.INIT_CWD is set by npm/yarn/pnpm to the directory where npm install was run
  let initCwd = process.env.INIT_CWD;
  if (!initCwd) {
    // Fallback: Check if we are inside a node_modules folder and extract the root path
    const normalizedPath = path.resolve(packageRoot);
    const nodeModulesPattern = `${path.sep}node_modules${path.sep}`;
    const nodeModulesIndex = normalizedPath.indexOf(nodeModulesPattern);
    if (nodeModulesIndex !== -1) {
      initCwd = normalizedPath.substring(0, nodeModulesIndex);
    } else {
      // If we are not inside node_modules and INIT_CWD is not set, we can't safely determine target
      console.log("RachanaUI: Could not determine consumer project root. Skipping component copy.");
      return;
    }
  }

  // Avoid copying if we are installing dependencies inside RachanaUI itself (development)
  if (path.resolve(initCwd) === packageRoot) {
    console.log("RachanaUI: Running in development mode. Skipping component copying.");
    return;
  }

  const srcDir = path.join(packageRoot, 'src', 'components', 'RachanaUI');
  const destDir = path.join(initCwd, 'src', 'components', 'RachanaUI');

  if (!fs.existsSync(srcDir)) {
    console.warn(`RachanaUI: Source components directory not found at ${srcDir}`);
    return;
  }

  try {
    console.log(`\n📦 RachanaUI: Copying component files to your workspace...`);
    console.log(`From: ${srcDir}`);
    console.log(`To: ${destDir}\n`);

    copyRecursiveSync(srcDir, destDir, initCwd);
    console.log("\n✅ RachanaUI: Copying complete! Components are available in src/components/RachanaUI.\n");
  } catch (error) {
    console.error("❌ RachanaUI: Failed to copy components during postinstall:", error);
  }
}

run();
