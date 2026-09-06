# Fix All ESLint Warnings - PowerShell Script
# Run: .\fix-all-warnings.ps1

Write-Host "🔧 Fixing all ESLint warnings..." -ForegroundColor Cyan
Write-Host ""

$files = @{
    "src/utils/schemas.js" = @(
        @{Find = "service.features?.map((feature, index) =>"; Replace = "service.features?.map((feature) =>"}
    )
    "src/components/OmnichannelSection.jsx" = @(
        @{Find = "  Layers,`n"; Replace = ""}
        @{Find = "  Activity,`n"; Replace = ""}
    )
    "src/components/Process.jsx" = @(
        @{Find = "  Zap,`n"; Replace = ""}
    )
    "src/components/ui/Particles.jsx" = @(
        @{Find = ", useState"; Replace = ""}
    )
    "src/components/ui/ParticleGlobe3D.jsx" = @(
        @{Find = "const onNodeHover"; Replace = "// const onNodeHover"}
    )
    "src/pages/About.jsx" = @(
        @{Find = "  Cpu,`n"; Replace = ""}
    )
    "src/pages/Blog.jsx" = @(
        @{Find = ", BookOpen"; Replace = ""}
    )
    "src/pages/SalesAutomationPage.jsx" = @(
        @{Find = "  Building2,`n"; Replace = ""}
        @{Find = "  Bot,`n"; Replace = ""}
        @{Find = "  Clock,`n"; Replace = ""}
    )
    "src/pages/WhatsAppCoexistencePage.jsx" = @(
        @{Find = "  MessageSquare,`n"; Replace = ""}
        @{Find = "  CheckCircle2,`n"; Replace = ""}
        @{Find = "  Check,`n"; Replace = ""}
        @{Find = "  Server,`n"; Replace = ""}
        @{Find = "const trackEvent"; Replace = "// const trackEvent"}
    )
    "src/pages/WhatsAppCallingAgentPage.jsx" = @(
        @{Find = "const trackEvent"; Replace = "// const trackEvent"}
    )
    "src/components/Hero.jsx" = @(
        @{Find = "const BadgeIcon = activeSlideData.badgeIcon;"; Replace = "// const BadgeIcon = activeSlideData.badgeIcon;"}
    )
    "scripts/ping-indexnow.js" = @(
        @{Find = "} catch (err) {"; Replace = "} catch (error) {"; Line = 32}
    )
}

foreach ($file in $files.Keys) {
    if (Test-Path $file) {
        Write-Host "📝 Fixing $file..." -ForegroundColor Yellow
        $content = Get-Content $file -Raw
        $modified = $false
        
        foreach ($replacement in $files[$file]) {
            if ($content -match [regex]::Escape($replacement.Find)) {
                $content = $content -replace [regex]::Escape($replacement.Find), $replacement.Replace
                $modified = $true
            }
        }
        
        if ($modified) {
            Set-Content -Path $file -Value $content -NoNewline
            Write-Host "  ✅ Fixed" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  No changes needed" -ForegroundColor DarkGray
        }
    }
}

Write-Host ""
Write-Host "✅ All warnings fixed!" -ForegroundColor Green
Write-Host ""
Write-Host "🧪 Running lint check..." -ForegroundColor Cyan
npm run lint
