const fs = require('fs');
const path = require('path');

// Helper to format TS file for DSA
function writeModuleFile(filePath, modData, lessons) {
  const modVar = path.basename(filePath, '.ts').replace('dsa-module-', 'dsaModule');
  const content = `import { DSAModuleData, DSALessonContent } from '@/lib/types';

export const ${modVar}Data: DSAModuleData = ${JSON.stringify(modData, null, 2)};

export const ${modVar}Lessons: Record<string, DSALessonContent> = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(filePath, content, 'utf8');
}

// Helper to format TS file for Python
function writePythonModuleFile(filePath, modData, lessons) {
  const modVar = path.basename(filePath, '.ts').replace('python-module-', 'pythonModule');
  const content = `import { PythonModuleData, PythonLessonContent } from '@/lib/types';

export const ${modVar}Data: PythonModuleData = ${JSON.stringify(modData, null, 2)};

export const ${modVar}Lessons: Record<string, PythonLessonContent> = ${JSON.stringify(lessons, null, 2)};
`;
  fs.writeFileSync(filePath, content, 'utf8');
}

module.exports = { writeModuleFile, writePythonModuleFile };
