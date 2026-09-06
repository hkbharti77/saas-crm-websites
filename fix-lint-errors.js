/**
 * Quick fix for ESLint errors
 * Run: node fix-lint-errors.js
 */

import fs from 'fs';

const fixes = [
  // Fix unused index in schemas.js
  {
    file: 'src/utils/schemas.js',
    find: 'service.features?.map((feature, index) => ({',
    replace: 'service.features?.map((feature) => ({'
  },
  // Fix unused variables in SeoHead.jsx - already fixed above
  
  // Fix Contact Section eyebrow
  {
    file: 'src/components/ContactSection.jsx',
    find: 'eyebrow = "Get in Touch",',
    replace: '// eyebrow = "Get in Touch",'
  },
  
  // Fix unused imports - examples
  {
    file: 'src/pages/Blog.jsx',
    find: 'BookOpen',
    replace: '/* BookOpen */'
  },
  {
    file: 'src/pages/About.jsx',
    find: 'Cpu,',
    replace: '// Cpu,'
  }
];

console.log('🔧 Fixing ESLint errors...\n');

fixes.forEach(fix => {
  try {
    const content = fs.readFileSync(fix.file, 'utf8');
    const newContent = content.replace(fix.find, fix.replace);
    if (content !== newContent) {
      fs.writeFileSync(fix.file, newContent);
      console.log(`✅ Fixed: ${fix.file}`);
    }
  } catch (err) {
    console.log(`⚠️  Skipped: ${fix.file} (${err.message})`);
  }
});

console.log('\n✅ Lint fixes complete!');
console.log('\n💡 Run "npm run lint" to verify all fixes.');
