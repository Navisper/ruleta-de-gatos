# Cat Roulette 🎰🐱

[![Deploy Cat Roulette](https://github.com/USERNAME/REPOSITORY/actions/workflows/deploy.yml/badge.svg)](https://github.com/USERNAME/REPOSITORY/actions/workflows/deploy.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://USERNAME.github.io/REPOSITORY)
[![HTML5](https://img.shields.io/badge/HTML5-Valid-orange)](https://validator.w3.org/)
[![CSS3](https://img.shields.io/badge/CSS3-Valid-blue)](https://jigsaw.w3.org/css-validator/)

Interactive cat roulette wheel - spin to discover adorable cat images! This project demonstrates a complete CI/CD pipeline using GitHub Actions with automated deployment to GitHub Pages.

## 🚀 Live Demo

**[Visit Cat Roulette →](https://USERNAME.github.io/REPOSITORY)**

## ✨ Features

- 🎯 Interactive spinning roulette wheel
- 🐱 Collection of adorable cat images
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast loading and smooth animations
- ♿ Accessibility-friendly interface
- 🔄 Automated CI/CD deployment

## 🛠️ Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Custom Properties
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages
- **Validation**: W3C HTML Validator, ESLint, Stylelint

## 📦 Deployment Status

| Environment | Status | URL |
|-------------|--------|-----|
| Production | [![Deployment Status](https://img.shields.io/github/deployments/USERNAME/REPOSITORY/github-pages?label=deployment)](https://github.com/USERNAME/REPOSITORY/deployments) | [Live Site](https://USERNAME.github.io/REPOSITORY) |

### Build Information

- **Last Deployment**: ![GitHub last commit](https://img.shields.io/github/last-commit/USERNAME/REPOSITORY)
- **Build Time**: Typically under 3 minutes
- **Deployment Verification**: Automated smoke tests included

## 🔧 Development

### Prerequisites

- Modern web browser (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
- Git for version control
- Optional: Local web server for development

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/USERNAME/REPOSITORY.git
   cd REPOSITORY
   ```

2. **Serve the files locally** (recommended for development):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser:**
   - Visit `http://localhost:8000`
   - Or simply open `index.html` directly in your browser

### Testing

Run the included unit tests:

1. **Open test files in browser:**
   - `test-roulette.html` - Core functionality tests
   - `test-browser-compatibility.html` - Browser compatibility tests

2. **View test results:**
   - Tests run automatically when pages load
   - Check browser console for detailed results
   - Visual results displayed on the test pages

### Customization Options

#### Adding New Cat Images

1. Add image files to the `images/` directory (SVG, PNG, or JPG)
2. Update the `catImages` array in `script.js`:
   ```javascript
   const catImages = [
       // ... existing cats
       {
           id: 9,
           filename: "your-new-cat.svg",
           alt: "Description of your cat",
           weight: 1
       }
   ];
   ```

#### Customizing Colors and Styling

Edit CSS custom properties in `style.css`:
```css
:root {
  --primary-color: #ff6b6b;      /* Main accent color */
  --secondary-color: #4ecdc4;    /* Secondary accent */
  --accent-color: #45b7d1;       /* Additional accent */
  --background-color: #f8f9fa;   /* Page background */
  /* ... more variables */
}
```

#### Adjusting Spin Behavior

Modify roulette settings in `script.js`:
```javascript
const rouletteState = {
    spinDuration: 3000,  // Spin duration in milliseconds
    // ... other settings
};

// In RouletteRandomizer class:
static generateSpinRotation() {
    const minRotations = 3;  // Minimum full spins
    const maxRotations = 6;  // Maximum full spins
    // ...
}
```

#### Browser Compatibility Settings

Adjust compatibility checks in the `checkBrowserCompatibility()` function:
```javascript
const features = {
    // Add or modify feature checks
    newFeature: typeof SomeAPI !== 'undefined',
    // ...
};
```

### Project Structure

```
├── index.html          # Main HTML file
├── style.css           # Styling and responsive design
├── script.js           # Roulette logic and interactions
├── images/             # Cat image assets
│   ├── cat1.svg
│   ├── cat2.svg
│   └── ...
├── .github/
│   └── workflows/
│       └── deploy.yml  # CI/CD pipeline
└── README.md           # This file
```

## 🚀 CI/CD Pipeline

The project uses GitHub Actions for automated deployment:

### Workflow Features

- ✅ **HTML Validation**: W3C markup validator
- ✅ **CSS Linting**: Stylelint with standard rules
- ✅ **JavaScript Linting**: ESLint with recommended rules
- ✅ **Asset Optimization**: Image compression and minification
- ✅ **Automated Deployment**: Direct to GitHub Pages
- ✅ **Smoke Testing**: Post-deployment verification
- ✅ **Rollback Protection**: Preserves previous version on failure

### Deployment Triggers

- **Automatic**: Push to `main` branch
- **Manual**: Workflow dispatch from GitHub Actions tab

## 📊 Performance

- **Page Load Time**: < 3 seconds
- **Build Time**: < 2 minutes
- **Deployment Time**: < 1 minute
- **Total Bundle Size**: < 2MB (including all assets)

## 🔧 Troubleshooting

### Common Issues

#### Roulette Won't Spin
- **Check browser compatibility**: Open `test-browser-compatibility.html`
- **Verify JavaScript is enabled** in your browser
- **Check browser console** for error messages
- **Try refreshing the page** or clearing browser cache

#### Images Not Loading
- **Verify image files exist** in the `images/` directory
- **Check image file names** match those in `script.js`
- **Ensure proper file permissions** (if serving locally)
- **Check network connection** (images load from local files)

#### Deployment Issues
- **Verify GitHub Pages is enabled** in repository settings
- **Check workflow status** in GitHub Actions tab
- **Ensure `main` branch has latest changes**
- **Review build logs** for specific error messages

#### Performance Issues
- **Check browser developer tools** Network tab
- **Verify image file sizes** (should be < 500KB each)
- **Test on different devices/browsers**
- **Clear browser cache and reload**

### Browser Support

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 60+ | Full support |
| Firefox | 55+ | Full support |
| Safari | 12+ | Full support |
| Edge | 79+ | Full support |
| IE | Not supported | Use modern browser |

### Getting Help

1. **Check the browser console** for error messages
2. **Run compatibility tests** using included test files
3. **Review GitHub Issues** for similar problems
4. **Create a new issue** with detailed error information

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Test your changes** using the included test files
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with a clear description

### Coding Standards

- **HTML**: Valid HTML5, semantic markup
- **CSS**: Use CSS custom properties, mobile-first approach
- **JavaScript**: ES6+, no external dependencies
- **Images**: Optimized for web (< 500KB each)
- **Comments**: Document complex logic and functions

### Testing Requirements

- **Unit tests**: Add tests for new JavaScript functions
- **Browser testing**: Verify compatibility across browsers
- **Accessibility**: Ensure keyboard navigation works
- **Performance**: Keep bundle size under 2MB

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐱 About

Made with ❤️ for cat lovers everywhere. This project serves as a demonstration of modern web development practices with automated CI/CD pipelines.

---

**Note**: Replace `USERNAME` and `REPOSITORY` with your actual GitHub username and repository name to activate the badges and links.