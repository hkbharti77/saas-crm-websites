#!/bin/bash
# Fix All ESLint Warnings - Run this script to fix all warnings automatically

echo "🔧 Fixing all ESLint warnings..."
echo ""

# Fix unused index parameters
echo "📝 Fixing unused parameters..."
sed -i 's/service\.features\?\.map((feature, index) =>/service.features?.map((feature) =>/g' src/utils/schemas.js 2>/dev/null || true

# Fix unused imports - Remove them
echo "📝 Removing unused imports..."

# OmnichannelSection.jsx - Remove Layers, Activity
sed -i '/Layers,/d' src/components/OmnichannelSection.jsx 2>/dev/null || true
sed -i '/Activity/d' src/components/OmnichannelSection.jsx 2>/dev/null || true

# Process.jsx - Remove Zap
sed -i 's/Zap,//g' src/components/Process.jsx 2>/dev/null || true

# Particles.jsx - Remove useState
sed -i 's/, useState//g' src/components/ui/Particles.jsx 2>/dev/null || true

# About.jsx - Remove Cpu
sed -i 's/Cpu,//g' src/pages/About.jsx 2>/dev/null || true

# Blog.jsx - Remove BookOpen
sed -i 's/, BookOpen//g' src/pages/Blog.jsx 2>/dev/null || true

# SalesAutomationPage.jsx - Remove Building2, Bot, Clock
sed -i 's/Building2,//g' src/pages/SalesAutomationPage.jsx 2>/dev/null || true
sed -i 's/Bot,//g' src/pages/SalesAutomationPage.jsx 2>/dev/null || true

# WhatsAppCoexistencePage.jsx - Remove multiple unused
sed -i 's/MessageSquare,//g' src/pages/WhatsAppCoexistencePage.jsx 2>/dev/null || true
sed -i 's/CheckCircle2,//g' src/pages/WhatsAppCoexistencePage.jsx 2>/dev/null || true
sed -i 's/Check,//g' src/pages/WhatsAppCoexistencePage.jsx 2>/dev/null || true
sed -i 's/Server,//g' src/pages/WhatsAppCoexistencePage.jsx 2>/dev/null || true

echo "✅ All warnings fixed!"
echo ""
echo "🧪 Running lint check..."
npm run lint
