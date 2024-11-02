'use strict';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the directory name and file name for module resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the runner path
const runnerPath = path.join(__dirname, 'runner').replace(/\\/g, '/');

// Import the runner function dynamically
const runner = (await import(runnerPath)).default;

// Handle .scss file extensions
require.extensions['.scss'] = (module, filename) => {
  const normalizedFilename = filename.replace(/\\/g, '/');

  return module._compile(`
    runner('${normalizedFilename}', { describe, it });
  `, filename);
};
