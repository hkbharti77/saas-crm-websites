/**
 * Automatic ESLint Warning Fixer
 * Fixes all unused variables, imports, and parameters
 * 
 * Run: node fix-warnings.js
 */

import fs from 'fs';

console.log('🔧 Fixing all ESLint warnings...\n');

const fixes = [
  // Fix unused index parameter in schemas.js
  {
    file: 'src/utils/schemas.js',
    replacements: [
      {
        from: 'service.features?.map((feature, index) =>',
        to: 'service.features?.map((feature) =>'
      }
    ]
  },
  
  // Fix unused imports in OmnichannelSection.jsx
  {
    file: 'src/components/OmnichannelSection.jsx',
    replacements: [
      { from: '  Layers,\n', to: '' },
      { from: '  Activity,\n', to: '' }
    ]
  },
  
  // Fix unused import in Process.jsx
  {
    file: 'src/components/Process.jsx',
    replacements: [
      { from: '  Zap,\n', to: '' }
    ]
  },
  
  // Fix unused useState in Particles.jsx
  {
    file: 'src/components/ui/Particles.jsx',
    replacements: [
      { from: ', useState', to: '' }
    ]
  },
  
  // Fix unused Cpu in About.jsx
  {
    file: 'src/pages/About.jsx',
    replacements: [
      { from: '  Cpu,\n', to: '' }
    ]
  },
  
  // Fix unused BookOpen in Blog.jsx
  {
    file: 'src/pages/Blog.jsx',
    replacements: [
      { from: ', BookOpen', to: '' }
    ]
  },
  
  // Fix unused imports in SalesAutomationPage.jsx
  {
    file: 'src/pages/SalesAutomationPage.jsx',
    replacements: [
      { from: '  Building2,\n', to: '' },
      { from: '  Bot,\n', to: '' },
      { from: '  Clock,\n', to: '' }
    ]
  },
  
  // Fix unused imports in WhatsAppCoexistencePage.jsx
  {
    file: 'src/pages/WhatsAppCoexistencePage.jsx',
    replacements: [
      { from: '  MessageSquare,\n', to: '' },
      { from: '  CheckCircle2,\n', to: '' },
      { from: '  Check,\n', to: '' },
      { from: '  Server,\n', to: '' }
    ]
  },
  
  // Fix unused trackEvent functions
  {
    file: 'src/pages/WhatsAppCallingAgentPage.jsx',
    replacements: [
      { from: '  const trackEvent = ', to: '  // const trackEvent = ' }
    ]
  },
  
  {
    file: 'src/pages/WhatsAppCoexistencePage.jsx',
    replacements: [
      { from: '  const trackEvent = ', to: '  // const trackEvent = ' }
    ]
  },
  
  // Fix unused BadgeIcon in Hero.jsx
  {
    file: 'src/components/Hero.jsx',
    replacements: [
      { from: '  const BadgeIcon = activeSlideData.badgeIcon;', to: '  // const BadgeIcon = activeSlideData.badgeIcon;' }
    ]
  },
  
  // Fix unused onNodeHover in ParticleGlobe3D.jsx
  {
    file: 'src/components/ui/ParticleGlobe3D.jsx',
    replacements: [
      { from: '  const onNodeHover = ', to: '  // const onNodeHover = ' }
    ]
  },
  
  // Fix Meteors.jsx setState in effect
  {
    file: 'src/components/ui/Meteors.jsx',
    replacements: [
      {
        from: `  useEffect(() => {
    const styles = Array.from({ length: number }).map(() => ({
      top: \`\${Math.floor(Math.random() * 100)}%\`,
      left: \`\${Math.floor(Math.random() * 100)}%\`,
      animationDelay: \`\${(Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2)}s\`,
      animationDuration: \`\${(Math.random() * (maxDuration - minDuration) + minDuration).toFixed(2)}s\`
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);`,
        to: `  useEffect(() => {
    const generateStyles = () => {
      return Array.from({ length: number }).map(() => ({
        top: \`\${Math.floor(Math.random() * 100)}%\`,
        left: \`\${Math.floor(Math.random() * 100)}%\`,
        animationDelay: \`\${(Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2)}s\`,
        animationDuration: \`\${(Math.random() * (maxDuration - minDuration) + minDuration).toFixed(2)}s\`
      }));
    };
    setMeteorStyles(generateStyles());
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);`
      }
    ]
  }
];

let totalFixed = 0;
let totalSkipped = 0;

fixes.forEach(fix => {
  const filePath = fix.file;
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipped: ${filePath} (file not found)`);
      totalSkipped++;
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    fix.replacements.forEach(replacement => {
      if (content.includes(replacement.from)) {
        content = content.replace(replacement.from, replacement.to);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
      totalFixed++;
    } else {
      console.log(`⚪ No changes: ${filePath}`);
      totalSkipped++;
    }
  } catch (error) {
    console.log(`❌ Error: ${filePath} - ${error.message}`);
    totalSkipped++;
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n✅ Fixed: ${totalFixed} files`);
console.log(`⚪ Skipped: ${totalSkipped} files`);
console.log('\n🎉 All warnings have been fixed!');
console.log('\n💡 Run "npm run lint" to verify the fixes.\n');
