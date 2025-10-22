# Cat Roulette Troubleshooting Guide

This guide helps you diagnose and fix common issues with the Cat Roulette project.

## Table of Contents

- [Quick Diagnostics](#quick-diagnostics)
- [Common Issues](#common-issues)
- [Browser Compatibility](#browser-compatibility)
- [Deployment Issues](#deployment-issues)
- [Performance Problems](#performance-problems)
- [Development Issues](#development-issues)
- [Advanced Troubleshooting](#advanced-troubleshooting)

## Quick Diagnostics

### Step 1: Run Compatibility Test
Open `test-browser-compatibility.html` in your browser to check if your browser supports all required features.

### Step 2: Check Browser Console
1. Press `F12` or right-click → "Inspect Element"
2. Go to "Console" tab
3. Look for red error messages
4. Refresh the page and watch for new errors

### Step 3: Run Unit Tests
Open `test-roulette.html` to verify core functionality is working correctly.

## Common Issues

### 🎯 Roulette Won't Spin

**Symptoms:**
- Clicking spin button does nothing
- Button appears disabled
- No animation occurs

**Causes & Solutions:**

1. **JavaScript Disabled**
   ```
   Solution: Enable JavaScript in browser settings
   Chrome: Settings → Privacy and Security → Site Settings → JavaScript
   Firefox: about:config → javascript.enabled = true
   ```

2. **Browser Compatibility**
   ```
   Solution: Use a modern browser (Chrome 60+, Firefox 55+, Safari 12+)
   Test: Open test-browser-compatibility.html
   ```

3. **JavaScript Errors**
   ```
   Solution: Check browser console for error messages
   Common errors:
   - "Cannot read property of undefined" → Missing DOM elements
   - "Function is not defined" → Script loading issues
   ```

4. **DOM Elements Missing**
   ```
   Solution: Verify index.html contains required elements:
   - id="spinButton"
   - id="rouletteWheel"
   - id="resultContainer"
   ```

### 🖼️ Images Not Loading

**Symptoms:**
- Placeholder images or broken image icons
- "Image not available" messages
- Blank result display

**Causes & Solutions:**

1. **File Path Issues**
   ```
   Check: Verify images/ directory exists and contains cat files
   Solution: Ensure file names in script.js match actual files
   
   Example:
   File: images/cat1.svg
   Code: filename: "cat1.svg" ✓
   Code: filename: "Cat1.svg" ✗ (case sensitive)
   ```

2. **File Permissions**
   ```
   Solution: Set proper file permissions (if using local server)
   chmod 644 images/*.svg
   chmod 755 images/
   ```

3. **Network Issues**
   ```
   Solution: Check if serving from local server vs file:// protocol
   Recommended: Use local server (python -m http.server 8000)
   ```

4. **Image Format Issues**
   ```
   Solution: Ensure images are web-compatible formats
   Supported: SVG, PNG, JPG, WebP
   Not supported: BMP, TIFF, PSD
   ```

### 🎨 Styling Problems

**Symptoms:**
- Layout appears broken
- Colors don't match expected theme
- Responsive design not working

**Causes & Solutions:**

1. **CSS Not Loading**
   ```
   Check: Browser console for 404 errors on style.css
   Solution: Verify style.css exists and path is correct in index.html
   ```

2. **Cache Issues**
   ```
   Solution: Hard refresh browser cache
   Chrome/Firefox: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   Safari: Cmd+Option+R
   ```

3. **CSS Syntax Errors**
   ```
   Solution: Validate CSS
   Tool: https://jigsaw.w3.org/css-validator/
   Check: Browser console for CSS parsing errors
   ```

### 📱 Responsive Design Issues

**Symptoms:**
- Layout breaks on mobile devices
- Elements overlap or are too small
- Horizontal scrolling required

**Causes & Solutions:**

1. **Viewport Meta Tag Missing**
   ```
   Check: index.html should contain:
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **CSS Media Queries**
   ```
   Test: Resize browser window to check breakpoints
   Breakpoints:
   - Mobile: < 768px
   - Tablet: 768px - 1023px
   - Desktop: 1024px+
   ```

3. **Fixed Widths**
   ```
   Solution: Use relative units (%, vw, rem) instead of fixed pixels
   Avoid: width: 500px;
   Use: width: 100%; max-width: 500px;
   ```

## Browser Compatibility

### Supported Browsers

| Browser | Version | Status | Notes |
|---------|---------|--------|-------|
| Chrome | 60+ | ✅ Full Support | Recommended |
| Firefox | 55+ | ✅ Full Support | Recommended |
| Safari | 12+ | ✅ Full Support | iOS 12+ |
| Edge | 79+ | ✅ Full Support | Chromium-based |
| IE | Any | ❌ Not Supported | Use modern browser |

### Feature Requirements

**Critical Features** (must be supported):
- `querySelector` and `addEventListener`
- `Element.classList`
- `Image` constructor
- `setTimeout` and `clearTimeout`

**Optional Features** (fallbacks provided):
- `Promise` and `async/await`
- `localStorage`
- CSS Transitions and Transforms
- `fetch` API

### Testing Browser Compatibility

1. **Open test-browser-compatibility.html**
2. **Check overall compatibility status**
3. **Review missing features**
4. **Update browser if critical features are missing**

## Deployment Issues

### GitHub Pages Deployment

**Issue: Site not updating after push**
```
Solutions:
1. Check GitHub Actions tab for workflow status
2. Verify workflow completed successfully
3. Clear browser cache and wait 5-10 minutes
4. Check if gh-pages branch was created/updated
```

**Issue: 404 Page Not Found**
```
Solutions:
1. Verify GitHub Pages is enabled in repository settings
2. Check that gh-pages branch exists
3. Ensure index.html is in root of gh-pages branch
4. Wait up to 10 minutes for DNS propagation
```

**Issue: Workflow failing**
```
Solutions:
1. Check GitHub Actions logs for specific errors
2. Verify repository has proper permissions
3. Check if GITHUB_TOKEN has required permissions
4. Ensure workflow file syntax is correct
```

### Custom Domain Issues

**Issue: Custom domain not working**
```
Solutions:
1. Add CNAME file with your domain name
2. Configure DNS records with your domain provider
3. Wait for DNS propagation (up to 24 hours)
4. Verify HTTPS certificate is issued
```

## Performance Problems

### Slow Loading

**Symptoms:**
- Page takes > 3 seconds to load
- Images load slowly
- Animations are choppy

**Solutions:**

1. **Optimize Images**
   ```
   - Compress images to < 500KB each
   - Use appropriate formats (SVG for simple graphics)
   - Consider WebP format for better compression
   ```

2. **Check Network**
   ```
   - Test on different networks
   - Use browser dev tools Network tab
   - Look for failed or slow requests
   ```

3. **Reduce Bundle Size**
   ```
   Current target: < 2MB total
   Check: All files combined should be under 2MB
   ```

### Animation Issues

**Symptoms:**
- Jerky or stuttering animations
- Spin animation doesn't complete
- Performance drops during animation

**Solutions:**

1. **Hardware Acceleration**
   ```
   Enable in browser settings:
   Chrome: Settings → Advanced → System → Use hardware acceleration
   ```

2. **Reduce Motion (Accessibility)**
   ```
   CSS handles prefers-reduced-motion automatically
   Users can enable in OS accessibility settings
   ```

3. **Browser Performance**
   ```
   - Close other tabs/applications
   - Update browser to latest version
   - Check available system memory
   ```

## Development Issues

### Local Server Problems

**Issue: Files not updating**
```
Solutions:
1. Hard refresh browser (Ctrl+Shift+R)
2. Disable browser cache in dev tools
3. Restart local server
4. Check file permissions
```

**Issue: CORS errors**
```
Solutions:
1. Use local server instead of file:// protocol
2. Serve from http://localhost instead of file://
3. Check browser security settings
```

### Code Editor Issues

**Issue: Syntax highlighting not working**
```
Solutions:
1. Install appropriate language extensions
2. Set file associations correctly
3. Check file encoding (should be UTF-8)
```

## Advanced Troubleshooting

### Debug Mode

Add debug logging to script.js:

```javascript
// Add at top of script.js for debugging
const DEBUG = true;
function debugLog(...args) {
    if (DEBUG) console.log('[DEBUG]', ...args);
}

// Use throughout code
debugLog('Roulette initialized', catManager.getAllCats().length, 'cats');
```

### Network Debugging

1. **Open browser dev tools**
2. **Go to Network tab**
3. **Reload page**
4. **Check for:**
   - Failed requests (red status codes)
   - Slow requests (> 1 second)
   - Large files (> 500KB)

### JavaScript Debugging

1. **Add breakpoints** in browser dev tools
2. **Step through code** to find issues
3. **Check variable values** at runtime
4. **Use console.log** for debugging

### CSS Debugging

1. **Inspect elements** in browser dev tools
2. **Check computed styles**
3. **Disable CSS rules** to isolate issues
4. **Test different screen sizes**

## Getting Help

### Before Asking for Help

1. **Run all diagnostic tests**
2. **Check browser console for errors**
3. **Try in different browsers**
4. **Clear cache and cookies**
5. **Test with minimal setup**

### Information to Include

When reporting issues, include:

- **Browser and version**
- **Operating system**
- **Error messages** (exact text)
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if visual issue)

### Resources

- **GitHub Issues**: Check existing issues for solutions
- **Browser Documentation**: MDN Web Docs for web standards
- **Validation Tools**: W3C validators for HTML/CSS
- **Performance Tools**: Browser dev tools for debugging

---

**Still having issues?** Create a GitHub issue with detailed information about your problem, including browser console errors and steps to reproduce.