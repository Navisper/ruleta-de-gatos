# Cat Roulette API Documentation

This document describes the JavaScript classes, functions, and APIs used in the Cat Roulette project.

## Table of Contents

- [Core Classes](#core-classes)
- [Utility Classes](#utility-classes)
- [Global Functions](#global-functions)
- [Data Structures](#data-structures)
- [Configuration](#configuration)
- [Events](#events)

## Core Classes

### CatImageManager

Manages the collection of cat images and handles selection logic.

#### Constructor
```javascript
new CatImageManager(images)
```

**Parameters:**
- `images` (Array): Array of cat image objects

**Example:**
```javascript
const manager = new CatImageManager([
    { id: 1, filename: "cat1.svg", alt: "Cute cat", weight: 1 }
]);
```

#### Methods

##### `calculateTotalWeight()`
Calculates the total weight of all cat images for probability distribution.

**Returns:** `number` - Total weight of all cats

##### `selectRandomCat()`
Selects a random cat based on weighted probability distribution.

**Returns:** `Object` - Selected cat object

##### `getCatById(id)`
Retrieves a cat by its ID.

**Parameters:**
- `id` (number): Cat ID to search for

**Returns:** `Object|undefined` - Cat object or undefined if not found

##### `getAllCats()`
Returns a copy of all cat images.

**Returns:** `Array` - Copy of the images array

##### `updateCatWeight(id, newWeight)`
Updates the weight of a specific cat.

**Parameters:**
- `id` (number): Cat ID to update
- `newWeight` (number): New weight value (must be > 0)

**Returns:** `boolean` - True if update successful, false otherwise

### ImagePreloader

Handles preloading of cat images for better performance.

#### Constructor
```javascript
new ImagePreloader(images)
```

**Parameters:**
- `images` (Array): Array of cat image objects

#### Methods

##### `preloadAllImages()`
Preloads all cat images asynchronously.

**Returns:** `Promise<Array>` - Promise that resolves with loading results

##### `preloadImage(cat)`
Preloads a single cat image.

**Parameters:**
- `cat` (Object): Cat object with filename property

**Returns:** `Promise<Image>` - Promise that resolves with loaded image

##### `isImageLoaded(catId)`
Checks if an image has been successfully preloaded.

**Parameters:**
- `catId` (number): Cat ID to check

**Returns:** `boolean` - True if image is loaded

##### `isImageFailed(catId)`
Checks if an image failed to load.

**Parameters:**
- `catId` (number): Cat ID to check

**Returns:** `boolean` - True if image failed to load

##### `getLoadingStats()`
Returns statistics about image loading progress.

**Returns:** `Object` - Loading statistics
```javascript
{
    total: number,    // Total number of images
    loaded: number,   // Successfully loaded images
    failed: number,   // Failed to load images
    loading: number   // Currently loading images
}
```

### WheelSpinner

Handles the roulette wheel spinning mechanics and animations.

#### Constructor
```javascript
new WheelSpinner(wheelElement, spinButton, resultContainer)
```

**Parameters:**
- `wheelElement` (HTMLElement): The roulette wheel DOM element
- `spinButton` (HTMLElement): The spin button DOM element
- `resultContainer` (HTMLElement): The result display container

#### Methods

##### `spin()`
Initiates the roulette wheel spin animation.

**Returns:** `void`

**Throws:** Error if required DOM elements are missing or invalid

##### `handleSpinComplete(selectedCat)`
Handles the completion of a spin animation.

**Parameters:**
- `selectedCat` (Object): The selected cat object

##### `displayResult(cat)`
Displays the selected cat result to the user.

**Parameters:**
- `cat` (Object): Cat object to display

##### `loadCatImage(cat)`
Loads and displays a cat image.

**Parameters:**
- `cat` (Object): Cat object with image information

**Returns:** `Promise<void>` - Promise that resolves when image is loaded

##### `showUserFeedback(type, message, duration, persistent)`
Shows user feedback messages.

**Parameters:**
- `type` (string): Feedback type ('success', 'error', 'warning', 'info', 'loading')
- `message` (string): Message to display
- `duration` (number): Display duration in milliseconds (default: 3000)
- `persistent` (boolean): Whether message should persist (default: false)

## Utility Classes

### RouletteRandomizer

Static utility class for randomization and probability calculations.

#### Static Methods

##### `generateSpinRotation()`
Generates a random rotation angle for the roulette wheel.

**Returns:** `number` - Rotation angle in degrees (includes multiple full rotations)

##### `calculateSelectedCat(finalRotation, totalCats)`
Calculates which cat segment the wheel stops on.

**Parameters:**
- `finalRotation` (number): Final rotation angle in degrees
- `totalCats` (number): Total number of cats on the wheel

**Returns:** `number` - Index of selected cat (0-based)

##### `validateFairDistribution(cats)`
Validates if all cats have equal probability weights.

**Parameters:**
- `cats` (Array): Array of cat objects with weight properties

**Returns:** `boolean` - True if all weights are equal

### RouletteEventHandler

Manages event listeners and user interactions.

#### Constructor
```javascript
new RouletteEventHandler()
```

Automatically finds required DOM elements and sets up event listeners.

#### Methods

##### `initializeEventListeners()`
Sets up all necessary event listeners for user interaction.

##### `handleSpinButtonClick()`
Handles spin button click events with cooldown protection.

## Global Functions

### Browser Compatibility

##### `checkBrowserCompatibility()`
Checks if the current browser supports all required features.

**Returns:** `boolean` - True if browser is compatible

##### `setupBrowserFallbacks(features)`
Sets up fallback implementations for missing browser features.

**Parameters:**
- `features` (Object): Object containing feature support flags

### Initialization

##### `initializeRoulette()`
Initializes the entire roulette system.

**Returns:** `Promise<boolean>` - Promise that resolves with initialization success

### User Feedback

##### `showUserFeedback(type, message, duration, persistent)`
Global function to show user feedback messages.

**Parameters:**
- `type` (string): Message type
- `message` (string): Message text
- `duration` (number): Display duration (optional)
- `persistent` (boolean): Whether to persist message (optional)

##### `showNetworkStatus(status, message)`
Shows network connectivity status to the user.

**Parameters:**
- `status` (string): 'online' or 'offline'
- `message` (string): Status message

### Network Status

##### `createNetworkStatusIndicator()`
Creates the network status indicator element.

## Data Structures

### Cat Object
```javascript
{
    id: number,           // Unique identifier
    filename: string,     // Image filename (in images/ directory)
    alt: string,         // Alt text for accessibility
    weight: number       // Probability weight (1 = normal, 2 = double chance)
}
```

### Roulette State
```javascript
{
    isSpinning: boolean,     // Whether wheel is currently spinning
    currentRotation: number, // Current rotation angle in degrees
    selectedCat: Object,     // Currently selected cat (null if none)
    spinDuration: number,    // Duration of spin animation in ms
    lastSpinTime: number     // Timestamp of last spin (for cooldown)
}
```

### Loading Stats
```javascript
{
    total: number,    // Total number of images
    loaded: number,   // Successfully loaded images
    failed: number,   // Failed to load images
    loading: number   // Currently loading images
}
```

## Configuration

### Default Settings

```javascript
// Roulette behavior
const rouletteState = {
    spinDuration: 3000,  // 3 seconds
    lastSpinTime: 0
};

// Spin rotation settings
const minRotations = 3;  // Minimum 3 full rotations
const maxRotations = 6;  // Maximum 6 full rotations

// Image loading timeouts
const imageLoadTimeout = 5000;   // 5 seconds for individual images
const preloadTimeout = 10000;    // 10 seconds for preloading

// User feedback durations
const defaultFeedbackDuration = 3000;  // 3 seconds
const errorFeedbackDuration = 5000;    // 5 seconds for errors
```

### Customizable Options

#### CSS Custom Properties
```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
    --spin-duration: 3s;
    /* ... more variables */
}
```

#### JavaScript Configuration
```javascript
// Modify these values to customize behavior
rouletteState.spinDuration = 4000;  // 4 second spins
RouletteRandomizer.minRotations = 5; // More rotations
```

## Events

### Custom Events

The roulette system dispatches custom events that you can listen for:

```javascript
// Spin started
document.addEventListener('roulette:spinStart', (event) => {
    console.log('Spin started');
});

// Spin completed
document.addEventListener('roulette:spinComplete', (event) => {
    console.log('Selected cat:', event.detail.cat);
});

// Image loaded
document.addEventListener('roulette:imageLoaded', (event) => {
    console.log('Image loaded:', event.detail.filename);
});

// Error occurred
document.addEventListener('roulette:error', (event) => {
    console.error('Roulette error:', event.detail.error);
});
```

### Standard DOM Events

The system also uses standard DOM events:

- `click` - Spin button interactions
- `keydown` - Keyboard accessibility
- `load` - Image loading
- `error` - Image loading failures
- `online`/`offline` - Network status changes

## Error Handling

### Error Types

1. **Initialization Errors**
   - Missing DOM elements
   - Browser compatibility issues
   - Network connectivity problems

2. **Runtime Errors**
   - Image loading failures
   - Animation errors
   - User interaction errors

3. **Configuration Errors**
   - Invalid cat data
   - Missing image files
   - Incorrect file paths

### Error Recovery

The system includes comprehensive error recovery:

- **Fallback images** for failed image loads
- **Graceful degradation** for unsupported browsers
- **Retry mechanisms** for network issues
- **User feedback** for all error conditions

## Usage Examples

### Basic Usage
```javascript
// Initialize with custom cats
const customCats = [
    { id: 1, filename: "my-cat.jpg", alt: "My cat", weight: 1 }
];
const manager = new CatImageManager(customCats);

// Preload images
const preloader = new ImagePreloader(customCats);
await preloader.preloadAllImages();

// Set up roulette
const eventHandler = new RouletteEventHandler();
```

### Advanced Customization
```javascript
// Custom weight distribution
manager.updateCatWeight(1, 3); // Triple chance for cat 1

// Custom feedback
showUserFeedback('success', 'Custom message!', 5000, true);

// Monitor loading progress
const stats = preloader.getLoadingStats();
console.log(`${stats.loaded}/${stats.total} images loaded`);
```

---

**Note:** This API is designed to be simple and extensible. All functions include comprehensive error handling and fallback mechanisms for robust operation across different browsers and environments.