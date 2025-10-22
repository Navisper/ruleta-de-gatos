# Cat Roulette Setup Guide

This guide provides detailed instructions for setting up, customizing, and deploying the Cat Roulette project.

## Table of Contents

- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Customization](#customization)
- [Deployment](#deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Quick Start

### Option 1: Direct Browser Opening
1. Download or clone the repository
2. Open `index.html` in any modern web browser
3. Start spinning the cat roulette!

### Option 2: Local Server (Recommended)
```bash
# Clone the repository
git clone https://github.com/USERNAME/REPOSITORY.git
cd REPOSITORY

# Start a local server (choose one):
python -m http.server 8000        # Python 3
python -m SimpleHTTPServer 8000   # Python 2
npx serve .                       # Node.js
php -S localhost:8000             # PHP

# Open http://localhost:8000 in your browser
```

## Development Setup

### Prerequisites

- **Git**: For version control
- **Modern Browser**: Chrome 60+, Firefox 55+, Safari 12+, or Edge 79+
- **Text Editor**: VS Code, Sublime Text, or any code editor
- **Optional**: Local web server (Python, Node.js, or PHP)

### Project Structure

```
cat-roulette/
├── index.html                 # Main HTML file
├── style.css                  # All styling and responsive design
├── script.js                  # Core JavaScript functionality
├── deployment-status.js       # Deployment status tracking
├── images/                    # Cat image assets
│   ├── cat1.svg
│   ├── cat2.svg
│   ├── cat3.svg
│   ├── cat4.svg
│   ├── cat5.svg
│   ├── cat6.svg
│   ├── cat7.svg
│   └── cat8.svg
├── test-roulette.html         # Unit tests for JavaScript functions
├── test-browser-compatibility.html # Browser compatibility tests
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions CI/CD pipeline
├── README.md                  # Main documentation
├── SETUP.md                   # This setup guide
└── TROUBLESHOOTING.md         # Detailed troubleshooting guide
```

### Development Workflow

1. **Make changes** to HTML, CSS, or JavaScript files
2. **Test locally** by refreshing your browser
3. **Run unit tests** by opening test files in browser
4. **Commit changes** when satisfied with functionality
5. **Push to GitHub** to trigger automatic deployment

## Customization

### Adding New Cat Images

1. **Prepare your images:**
   - Format: SVG (preferred), PNG, or JPG
   - Size: Optimize for web (< 500KB each)
   - Dimensions: Square aspect ratio works best

2. **Add to images directory:**
   ```bash
   cp your-cat-image.svg images/cat9.svg
   ```

3. **Update the JavaScript array** in `script.js`:
   ```javascript
   const catImages = [
       // ... existing cats ...
       {
           id: 9,
           filename: "cat9.svg",
           alt: "Your cat description here",
           weight: 1  // Equal probability (1 = normal, 2 = double chance, etc.)
       }
   ];
   ```

### Customizing Colors and Theme

Edit CSS custom properties in `style.css`:

```css
:root {
  /* Primary colors */
  --primary-color: #ff6b6b;      /* Main accent (buttons, highlights) */
  --secondary-color: #4ecdc4;    /* Secondary accent (gradients) */
  --accent-color: #45b7d1;       /* Additional accent (links, focus) */
  
  /* Background colors */
  --background-color: #f8f9fa;   /* Page background */
  --white: #ffffff;              /* Card backgrounds */
  
  /* Text colors */
  --text-color: #2c3e50;         /* Main text */
  --text-light: #6c757d;         /* Secondary text */
  
  /* Spacing (adjust layout) */
  --spacing-sm: 1rem;            /* Small spacing */
  --spacing-md: 1.5rem;          /* Medium spacing */
  --spacing-lg: 2rem;            /* Large spacing */
  
  /* Typography */
  --font-size-base: 16px;        /* Base font size */
  --font-size-xl: 24px;          /* Large headings */
}
```

### Adjusting Roulette Behavior

Modify settings in `script.js`:

```javascript
// Spin duration and timing
const rouletteState = {
    spinDuration: 3000,    // How long the spin lasts (milliseconds)
    // ... other settings
};

// Spin rotation settings
class RouletteRandomizer {
    static generateSpinRotation() {
        const minRotations = 3;  // Minimum full spins (3 = 1080°)
        const maxRotations = 6;  // Maximum full spins (6 = 2160°)
        // ... rest of function
    }
}
```

### Customizing Responsive Breakpoints

Adjust breakpoints in `style.css`:

```css
/* Mobile styles (default) */
@media (max-width: 767px) { /* ... */ }

/* Tablet styles */
@media (min-width: 768px) and (max-width: 1023px) { /* ... */ }

/* Desktop styles */
@media (min-width: 1024px) { /* ... */ }
```

## Deployment

### GitHub Pages (Automatic)

1. **Fork or create repository** on GitHub
2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch (created automatically by workflow)

3. **Configure the workflow:**
   - Update `.github/workflows/deploy.yml` if needed
   - Ensure `GITHUB_TOKEN` has proper permissions

4. **Deploy:**
   - Push changes to `main` branch
   - GitHub Actions will automatically build and deploy
   - Site will be available at `https://USERNAME.github.io/REPOSITORY`

### Manual Deployment

For other hosting providers:

1. **Build the project** (optional optimization):
   ```bash
   # The project works as-is, but you can optimize:
   # - Minify CSS and JavaScript
   # - Compress images
   # - Combine files
   ```

2. **Upload files** to your web server:
   - Upload all files maintaining directory structure
   - Ensure `index.html` is in the root directory
   - Set proper file permissions (644 for files, 755 for directories)

### Environment Configuration

Update placeholders in files:

1. **README.md**: Replace `USERNAME` and `REPOSITORY` with actual values
2. **GitHub Actions**: Ensure proper repository permissions
3. **Custom domain** (optional): Add `CNAME` file with your domain

## Testing

### Running Unit Tests

1. **Open test files in browser:**
   ```bash
   # Core functionality tests
   open test-roulette.html
   
   # Browser compatibility tests
   open test-browser-compatibility.html
   ```

2. **View results:**
   - Tests run automatically when pages load
   - Results displayed on the page
   - Check browser console for detailed output

### Manual Testing Checklist

- [ ] Roulette spins smoothly
- [ ] Cat images load correctly
- [ ] Responsive design works on different screen sizes
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] No JavaScript errors in console
- [ ] Page loads in under 3 seconds
- [ ] Works in multiple browsers

### Performance Testing

1. **Open browser developer tools**
2. **Go to Network tab**
3. **Reload the page**
4. **Check metrics:**
   - Total load time < 3 seconds
   - Total size < 2MB
   - No failed requests

## Troubleshooting

For detailed troubleshooting information, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md).

### Quick Fixes

- **Roulette won't spin**: Check browser console for errors
- **Images not loading**: Verify file paths and names
- **Deployment failed**: Check GitHub Actions logs
- **Styling issues**: Clear browser cache and reload

## Support

- **Documentation**: Check README.md and this setup guide
- **Issues**: Create a GitHub issue with detailed information
- **Testing**: Use included test files to diagnose problems
- **Community**: Check existing GitHub issues for solutions

---

**Next Steps**: After setup, see [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for common issues and solutions.