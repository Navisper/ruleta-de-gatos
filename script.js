// Cat Roulette - Core JavaScript Logic

// Cat images data structure with management
const catImages = [
    {
        id: 1,
        filename: "cat1.svg",
        alt: "Cute orange tabby cat sitting peacefully",
        weight: 1
    },
    {
        id: 2,
        filename: "cat2.svg", 
        alt: "Playful black and white kitten",
        weight: 1
    },
    {
        id: 3,
        filename: "cat3.svg",
        alt: "Fluffy Persian cat with blue eyes",
        weight: 1
    },
    {
        id: 4,
        filename: "cat4.svg",
        alt: "Sleepy gray cat curled up",
        weight: 1
    },
    {
        id: 5,
        filename: "cat5.svg",
        alt: "Energetic calico cat playing",
        weight: 1
    },
    {
        id: 6,
        filename: "cat6.svg",
        alt: "Majestic Maine Coon cat",
        weight: 1
    },
    {
        id: 7,
        filename: "cat7.svg",
        alt: "Adorable Siamese cat with bright eyes",
        weight: 1
    },
    {
        id: 8,
        filename: "cat8.svg",
        alt: "Curious Bengal cat exploring",
        weight: 1
    }
];

// Roulette state management
const rouletteState = {
    isSpinning: false,
    currentRotation: 0,
    selectedCat: null,
    spinDuration: 3000,
    lastSpinTime: 0
};

// Cat image management functions
class CatImageManager {
    constructor(images) {
        this.images = images;
        this.totalWeight = this.calculateTotalWeight();
    }

    calculateTotalWeight() {
        return this.images.reduce((sum, cat) => sum + cat.weight, 0);
    }

    // Random selection algorithm for fair distribution
    selectRandomCat() {
        const random = Math.random() * this.totalWeight;
        let currentWeight = 0;
        
        for (const cat of this.images) {
            currentWeight += cat.weight;
            if (random <= currentWeight) {
                return cat;
            }
        }
        
        // Fallback to last cat (should never reach here)
        return this.images[this.images.length - 1];
    }

    getCatById(id) {
        return this.images.find(cat => cat.id === id);
    }

    getAllCats() {
        return [...this.images];
    }

    updateCatWeight(id, newWeight) {
        const cat = this.getCatById(id);
        if (cat && newWeight > 0) {
            cat.weight = newWeight;
            this.totalWeight = this.calculateTotalWeight();
            return true;
        }
        return false;
    }
}

// Browser compatibility checks and fallbacks
function checkBrowserCompatibility() {
    const features = {
        promises: typeof Promise !== 'undefined',
        asyncAwait: (function() {
            try {
                return (function() {}).constructor('return (async function() {})();')().constructor === (async function() {}).constructor;
            } catch (e) {
                return false;
            }
        })(),
        classList: 'classList' in document.createElement('div'),
        addEventListener: 'addEventListener' in window,
        querySelector: 'querySelector' in document,
        cssTransitions: (function() {
            const el = document.createElement('div');
            return 'transition' in el.style || 'webkitTransition' in el.style || 'mozTransition' in el.style;
        })(),
        cssTransforms: (function() {
            const el = document.createElement('div');
            return 'transform' in el.style || 'webkitTransform' in el.style || 'mozTransform' in el.style;
        })(),
        localStorage: (function() {
            try {
                return 'localStorage' in window && window.localStorage !== null;
            } catch (e) {
                return false;
            }
        })(),
        console: typeof console !== 'undefined' && typeof console.log === 'function'
    };

    const unsupported = Object.keys(features).filter(feature => !features[feature]);
    
    if (unsupported.length > 0) {
        console.warn('Browser compatibility issues detected:', unsupported);
        
        // Set up fallbacks for missing features
        setupBrowserFallbacks(features);
        
        // Return false only for critical features
        const criticalFeatures = ['querySelector', 'addEventListener'];
        const criticalMissing = unsupported.filter(feature => criticalFeatures.includes(feature));
        
        return criticalMissing.length === 0;
    }
    
    return true;
}

// Set up fallbacks for missing browser features
function setupBrowserFallbacks(features) {
    try {
        // Console fallback
        if (!features.console) {
            window.console = {
                log: function() {},
                warn: function() {},
                error: function() {},
                info: function() {}
            };
        }

        // Promise fallback (basic implementation)
        if (!features.promises) {
            window.Promise = function(executor) {
                const self = this;
                self.state = 'pending';
                self.value = undefined;
                self.handlers = [];

                function resolve(result) {
                    if (self.state === 'pending') {
                        self.state = 'fulfilled';
                        self.value = result;
                        self.handlers.forEach(handle);
                        self.handlers = null;
                    }
                }

                function reject(error) {
                    if (self.state === 'pending') {
                        self.state = 'rejected';
                        self.value = error;
                        self.handlers.forEach(handle);
                        self.handlers = null;
                    }
                }

                function handle(handler) {
                    if (self.state === 'pending') {
                        self.handlers.push(handler);
                    } else {
                        if (self.state === 'fulfilled' && typeof handler.onFulfilled === 'function') {
                            handler.onFulfilled(self.value);
                        }
                        if (self.state === 'rejected' && typeof handler.onRejected === 'function') {
                            handler.onRejected(self.value);
                        }
                    }
                }

                this.then = function(onFulfilled, onRejected) {
                    return new Promise(function(resolve, reject) {
                        handle({
                            onFulfilled: function(result) {
                                try {
                                    if (typeof onFulfilled === 'function') {
                                        resolve(onFulfilled(result));
                                    } else {
                                        resolve(result);
                                    }
                                } catch (ex) {
                                    reject(ex);
                                }
                            },
                            onRejected: function(error) {
                                try {
                                    if (typeof onRejected === 'function') {
                                        resolve(onRejected(error));
                                    } else {
                                        reject(error);
                                    }
                                } catch (ex) {
                                    reject(ex);
                                }
                            }
                        });
                    });
                };

                this.catch = function(onRejected) {
                    return this.then(null, onRejected);
                };

                try {
                    executor(resolve, reject);
                } catch (error) {
                    reject(error);
                }
            };

            // Add Promise.resolve and Promise.reject
            Promise.resolve = function(value) {
                return new Promise(function(resolve) {
                    resolve(value);
                });
            };

            Promise.reject = function(reason) {
                return new Promise(function(resolve, reject) {
                    reject(reason);
                });
            };

            // Add Promise.allSettled fallback
            Promise.allSettled = function(promises) {
                return new Promise(function(resolve) {
                    const results = [];
                    let completed = 0;

                    if (promises.length === 0) {
                        resolve(results);
                        return;
                    }

                    promises.forEach(function(promise, index) {
                        Promise.resolve(promise)
                            .then(function(value) {
                                results[index] = { status: 'fulfilled', value: value };
                            })
                            .catch(function(reason) {
                                results[index] = { status: 'rejected', reason: reason };
                            })
                            .then(function() {
                                completed++;
                                if (completed === promises.length) {
                                    resolve(results);
                                }
                            });
                    });
                });
            };
        }

        // classList fallback
        if (!features.classList) {
            (function() {
                if (!Element.prototype.classList) {
                    Object.defineProperty(Element.prototype, 'classList', {
                        get: function() {
                            const self = this;
                            function update(fn) {
                                return function(value) {
                                    const classes = self.className.split(/\s+/);
                                    const index = classes.indexOf(value);
                                    fn(classes, index, value);
                                    self.className = classes.join(' ');
                                };
                            }

                            return {
                                add: update(function(classes, index, value) {
                                    if (index < 0) classes.push(value);
                                }),
                                remove: update(function(classes, index) {
                                    if (index >= 0) classes.splice(index, 1);
                                }),
                                toggle: update(function(classes, index, value) {
                                    if (index >= 0) classes.splice(index, 1);
                                    else classes.push(value);
                                }),
                                contains: function(value) {
                                    return self.className.split(/\s+/).indexOf(value) >= 0;
                                }
                            };
                        }
                    });
                }
            })();
        }

        console.log('Browser fallbacks initialized');
        
    } catch (error) {
        console.error('Error setting up browser fallbacks:', error);
    }
}

// Initialize cat manager and image preloader
const catManager = new CatImageManager(catImages);
const imagePreloader = new ImagePreloader(catImages);

// Random selection utilities
class RouletteRandomizer {
    // Generate random rotation angle (multiple full rotations + final position)
    static generateSpinRotation() {
        const minRotations = 3; // Minimum full rotations
        const maxRotations = 6; // Maximum full rotations
        const fullRotations = Math.random() * (maxRotations - minRotations) + minRotations;
        const finalAngle = Math.random() * 360; // Final stopping position
        
        return (fullRotations * 360) + finalAngle;
    }

    // Calculate which cat segment the wheel stops on
    static calculateSelectedCat(finalRotation, totalCats) {
        const segmentAngle = 360 / totalCats;
        const normalizedRotation = finalRotation % 360;
        // Adjust for pointer position (top of wheel)
        const adjustedRotation = (360 - normalizedRotation + (segmentAngle / 2)) % 360;
        const segmentIndex = Math.floor(adjustedRotation / segmentAngle);
        
        return segmentIndex;
    }

    // Fair distribution check - ensures each cat has equal probability
    static validateFairDistribution(cats) {
        const weights = cats.map(cat => cat.weight);
        const uniqueWeights = [...new Set(weights)];
        
        // For fair distribution, all weights should be equal
        return uniqueWeights.length === 1;
    }
}

// Core roulette logic initialization with enhanced feedback
async function initializeRoulette() {
    try {
        // Show initialization progress
        showUserFeedback('loading', 'Initializing cat roulette...', 0, true);
        
        // Validate fair distribution
        if (!RouletteRandomizer.validateFairDistribution(catManager.getAllCats())) {
            console.warn('Cat weights are not equal - distribution may not be fair');
            showUserFeedback('warning', 'Cat distribution may not be perfectly fair', 2000);
        }

        // Log initialization
        console.log('Cat Roulette initialized with', catManager.getAllCats().length, 'cats');
        console.log('Fair distribution:', RouletteRandomizer.validateFairDistribution(catManager.getAllCats()));

        // Start preloading images with progress feedback
        console.log('Starting image preloading...');
        showUserFeedback('loading', 'Loading cat images...', 0, true);
        
        // Track preloading progress
        const totalImages = catManager.getAllCats().length;
        let loadedCount = 0;
        
        // Set up progress tracking
        const originalPreloadImage = imagePreloader.preloadImage.bind(imagePreloader);
        imagePreloader.preloadImage = function(cat) {
            return originalPreloadImage(cat).then(
                (result) => {
                    loadedCount++;
                    const progress = (loadedCount / totalImages) * 100;
                    showUserFeedback('loading', `Loading images... ${loadedCount}/${totalImages}`, 0, true);
                    return result;
                },
                (error) => {
                    loadedCount++;
                    const progress = (loadedCount / totalImages) * 100;
                    showUserFeedback('loading', `Loading images... ${loadedCount}/${totalImages}`, 0, true);
                    throw error;
                }
            );
        };
        
        const preloadResults = await imagePreloader.preloadAllImages();
        
        // Restore original method
        imagePreloader.preloadImage = originalPreloadImage;
        
        // Log preloading results
        const stats = imagePreloader.getLoadingStats();
        console.log(`Image preloading complete: ${stats.loaded}/${stats.total} loaded, ${stats.failed} failed`);
        
        // Show completion feedback
        if (stats.failed > 0) {
            console.warn(`${stats.failed} images failed to preload - fallback images will be used`);
            showUserFeedback('warning', `${stats.loaded}/${stats.total} images loaded successfully`, 3000);
        } else {
            showUserFeedback('success', 'All cat images loaded successfully!', 2000);
        }

        return true;
    } catch (error) {
        console.error('Failed to initialize roulette:', error);
        showUserFeedback('error', 'Failed to initialize cat roulette', 5000);
        return false;
    }
}

// Image preloader for better performance
class ImagePreloader {
    constructor(images) {
        this.images = images;
        this.loadedImages = new Map();
        this.failedImages = new Set();
        this.loadingPromises = new Map();
    }

    // Preload all cat images
    preloadAllImages() {
        const loadPromises = this.images.map(cat => this.preloadImage(cat));
        return Promise.allSettled(loadPromises);
    }

    // Preload a single image
    preloadImage(cat) {
        // Return existing promise if already loading
        if (this.loadingPromises.has(cat.id)) {
            return this.loadingPromises.get(cat.id);
        }

        const promise = new Promise((resolve, reject) => {
            // Check if already loaded or failed
            if (this.loadedImages.has(cat.id)) {
                resolve(this.loadedImages.get(cat.id));
                return;
            }
            if (this.failedImages.has(cat.id)) {
                reject(new Error(`Image previously failed to load: ${cat.filename}`));
                return;
            }

            const img = new Image();
            
            img.onload = () => {
                this.loadedImages.set(cat.id, img);
                this.loadingPromises.delete(cat.id);
                console.log(`Preloaded image: ${cat.filename}`);
                resolve(img);
            };
            
            img.onerror = () => {
                this.failedImages.add(cat.id);
                this.loadingPromises.delete(cat.id);
                console.warn(`Failed to preload image: ${cat.filename}`);
                reject(new Error(`Failed to preload image: ${cat.filename}`));
            };
            
            // Set timeout for preloading (10 seconds)
            setTimeout(() => {
                if (!img.complete) {
                    this.failedImages.add(cat.id);
                    this.loadingPromises.delete(cat.id);
                    reject(new Error(`Image preload timeout: ${cat.filename}`));
                }
            }, 10000);
            
            img.src = `images/${cat.filename}`;
        });

        this.loadingPromises.set(cat.id, promise);
        return promise;
    }

    // Check if image is preloaded
    isImageLoaded(catId) {
        return this.loadedImages.has(catId);
    }

    // Get preloaded image
    getLoadedImage(catId) {
        return this.loadedImages.get(catId);
    }

    // Check if image failed to load
    isImageFailed(catId) {
        return this.failedImages.has(catId);
    }

    // Get loading statistics
    getLoadingStats() {
        return {
            total: this.images.length,
            loaded: this.loadedImages.size,
            failed: this.failedImages.size,
            loading: this.loadingPromises.size
        };
    }
}

// Export for potential testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        catImages,
        CatImageManager,
        RouletteRandomizer,
        rouletteState,
        ImagePreloader
    };
}

// Wheel spinning mechanics and animation
class WheelSpinner {
    constructor(wheelElement, spinButton, resultContainer) {
        this.wheelElement = wheelElement;
        this.spinButton = spinButton;
        this.resultContainer = resultContainer;
        this.resultTitle = document.getElementById('resultTitle');
        this.resultImage = document.getElementById('resultImage');
        this.resultMessage = document.getElementById('resultMessage');
        this.resultImageContainer = document.getElementById('resultImageContainer');
        this.spinTimeoutId = null;
    }

    // Smooth rotation animation with JavaScript
    spin() {
        try {
            if (rouletteState.isSpinning) {
                return; // Prevent multiple spins
            }

            // Validate required elements
            if (!this.wheelElement || !this.spinButton) {
                throw new Error('Required DOM elements not found');
            }

            // Set spinning state
            rouletteState.isSpinning = true;
            rouletteState.lastSpinTime = Date.now();
            
            // Update UI to show spinning state
            this.updateSpinningState(true);

            // Generate random rotation with error handling
            let spinRotation, finalRotation, selectedIndex, selectedCat;
            
            try {
                spinRotation = RouletteRandomizer.generateSpinRotation();
                finalRotation = rouletteState.currentRotation + spinRotation;
                
                // Validate rotation values
                if (!isFinite(spinRotation) || !isFinite(finalRotation)) {
                    throw new Error('Invalid rotation values generated');
                }
            } catch (error) {
                console.error('Error generating rotation:', error);
                // Fallback to simple rotation
                spinRotation = 1800 + (Math.random() * 1800); // 5-10 rotations
                finalRotation = rouletteState.currentRotation + spinRotation;
            }
            
            // Apply CSS animation with error handling
            try {
                this.wheelElement.style.transition = `transform ${rouletteState.spinDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
                this.wheelElement.style.transform = `rotate(${finalRotation}deg)`;
            } catch (error) {
                console.error('Error applying wheel animation:', error);
                // Fallback to instant rotation
                this.wheelElement.style.transition = 'none';
                this.wheelElement.style.transform = `rotate(${finalRotation}deg)`;
            }
            
            // Update current rotation for next spin
            rouletteState.currentRotation = finalRotation % 360;

            // Calculate selected cat with error handling
            try {
                selectedIndex = RouletteRandomizer.calculateSelectedCat(finalRotation, catManager.getAllCats().length);
                selectedCat = catManager.getAllCats()[selectedIndex];
                
                if (!selectedCat) {
                    throw new Error('No cat selected');
                }
            } catch (error) {
                console.error('Error selecting cat:', error);
                // Fallback to random cat selection
                const allCats = catManager.getAllCats();
                selectedIndex = Math.floor(Math.random() * allCats.length);
                selectedCat = allCats[selectedIndex] || allCats[0];
            }
            
            rouletteState.selectedCat = selectedCat;

            // Handle spin completion with timeout cleanup
            this.spinTimeoutId = setTimeout(() => {
                try {
                    this.handleSpinComplete(selectedCat);
                } catch (error) {
                    this.handleSpinError(error);
                }
            }, rouletteState.spinDuration);

        } catch (error) {
            console.error('Critical error in spin method:', error);
            this.handleSpinError(error);
        }
    }

    // Handle spin completion and result display
    handleSpinComplete(selectedCat) {
        try {
            // Clear timeout if it exists
            if (this.spinTimeoutId) {
                clearTimeout(this.spinTimeoutId);
                this.spinTimeoutId = null;
            }

            rouletteState.isSpinning = false;
            this.updateSpinningState(false);
            
            // Validate selected cat
            if (!selectedCat || !selectedCat.id) {
                throw new Error('Invalid cat data received');
            }
            
            this.displayResult(selectedCat);
            
            // Log result for debugging
            console.log('Spin complete! Selected cat:', selectedCat);
            
        } catch (error) {
            console.error('Error in handleSpinComplete:', error);
            this.handleSpinError(error);
        }
    }

    // Update UI for spinning state with enhanced feedback
    updateSpinningState(isSpinning) {
        try {
            if (isSpinning) {
                // Update button state
                this.spinButton.disabled = true;
                this.spinButton.textContent = 'SPINNING...';
                this.spinButton.classList.add('spinning');
                
                // Update result display during spin
                if (this.resultTitle) {
                    this.resultTitle.textContent = 'Spinning...';
                }
                if (this.resultMessage) {
                    this.resultMessage.textContent = 'The wheel is spinning! 🎰';
                }
                if (this.resultImage) {
                    this.resultImage.style.display = 'none';
                }
                
                // Add loading state to image container
                if (this.resultImageContainer) {
                    this.resultImageContainer.classList.add('loading');
                }
                
                // Show progress indicator
                this.showProgressIndicator(true);
                
                // Add status indicator
                this.updateStatusIndicator('loading', 'Spinning wheel...');
                
            } else {
                // Reset button state
                this.spinButton.disabled = false;
                this.spinButton.textContent = 'SPIN';
                this.spinButton.classList.remove('spinning');
                
                // Remove loading state from image container
                if (this.resultImageContainer) {
                    this.resultImageContainer.classList.remove('loading');
                }
                
                // Hide progress indicator
                this.showProgressIndicator(false);
            }
        } catch (error) {
            console.error('Error updating spinning state:', error);
            // Fallback to basic state update
            this.fallbackUIReset();
        }
    }

    // Display result with user feedback
    displayResult(cat) {
        try {
            // Validate DOM elements
            if (!this.resultTitle || !this.resultMessage || !this.resultContainer) {
                throw new Error('Result display elements not found');
            }

            // Update result title with error handling
            try {
                this.resultTitle.textContent = 'You got:';
            } catch (error) {
                console.error('Error updating result title:', error);
                // Continue without title update
            }
            
            // Load and display result image with comprehensive error handling
            this.loadCatImage(cat)
                .then(() => {
                    try {
                        // Update result message with cat info
                        this.resultMessage.textContent = `🐱 ${cat.alt || 'A wonderful cat'}`;
                        
                        // Add success animation class with error handling
                        try {
                            this.resultContainer.classList.add('result-revealed');
                            
                            // Remove animation class after animation completes
                            setTimeout(() => {
                                try {
                                    this.resultContainer.classList.remove('result-revealed');
                                } catch (error) {
                                    console.error('Error removing animation class:', error);
                                }
                            }, 1000);
                        } catch (error) {
                            console.error('Error adding animation class:', error);
                            // Continue without animation
                        }

                        // Provide user feedback
                        this.showUserFeedback('success', 'Meow! You found a wonderful cat! 🎉');
                        
                    } catch (error) {
                        console.error('Error in success callback:', error);
                        // Still show basic success message
                        this.showUserFeedback('success', 'Cat found! 🐱');
                    }
                })
                .catch((error) => {
                    console.error('Failed to load cat image:', error);
                    this.handleImageLoadError(cat);
                });
                
        } catch (error) {
            console.error('Critical error in displayResult:', error);
            // Fallback display
            this.showFallbackResult(cat);
        }
    }

    // Load cat image with comprehensive error handling
    loadCatImage(cat) {
        return new Promise((resolve, reject) => {
            try {
                // Validate input
                if (!cat || !cat.filename) {
                    reject(new Error('Invalid cat data provided'));
                    return;
                }

                // Validate result image element
                if (!this.resultImage) {
                    reject(new Error('Result image element not found'));
                    return;
                }

                // Check if image is preloaded
                if (imagePreloader && imagePreloader.isImageLoaded(cat.id)) {
                    try {
                        // Use preloaded image
                        this.resultImage.src = `images/${cat.filename}`;
                        this.resultImage.alt = cat.alt || 'Cat image';
                        this.resultImage.style.display = 'block';
                        resolve();
                        return;
                    } catch (error) {
                        console.error('Error using preloaded image:', error);
                        // Continue to on-demand loading
                    }
                }

                // Check if image previously failed
                if (imagePreloader && imagePreloader.isImageFailed(cat.id)) {
                    reject(new Error(`Image previously failed to load: ${cat.filename}`));
                    return;
                }

                // Try to load image on demand with enhanced error handling
                const img = new Image();
                let timeoutId;
                let isResolved = false;

                const cleanup = () => {
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                        timeoutId = null;
                    }
                    img.onload = null;
                    img.onerror = null;
                    img.onabort = null;
                };

                const resolveOnce = () => {
                    if (!isResolved) {
                        isResolved = true;
                        cleanup();
                        try {
                            // Image loaded successfully
                            this.resultImage.src = `images/${cat.filename}`;
                            this.resultImage.alt = cat.alt || 'Cat image';
                            this.resultImage.style.display = 'block';
                            resolve();
                        } catch (error) {
                            reject(new Error(`Error displaying image: ${error.message}`));
                        }
                    }
                };

                const rejectOnce = (error) => {
                    if (!isResolved) {
                        isResolved = true;
                        cleanup();
                        reject(error);
                    }
                };

                img.onload = resolveOnce;
                
                img.onerror = () => {
                    rejectOnce(new Error(`Failed to load image: ${cat.filename}`));
                };

                img.onabort = () => {
                    rejectOnce(new Error(`Image loading aborted: ${cat.filename}`));
                };
                
                // Set timeout for image loading (5 seconds)
                timeoutId = setTimeout(() => {
                    if (!img.complete && !isResolved) {
                        rejectOnce(new Error(`Image load timeout: ${cat.filename}`));
                    }
                }, 5000);
                
                // Start loading the image with error handling
                try {
                    img.src = `images/${cat.filename}`;
                } catch (error) {
                    rejectOnce(new Error(`Error setting image source: ${error.message}`));
                }

            } catch (error) {
                reject(new Error(`Critical error in loadCatImage: ${error.message}`));
            }
        });
    }

    // Handle image load errors with fallback and retry
    handleImageLoadError(cat, retryCount = 0) {
        const maxRetries = 2;
        
        // Try to retry loading the image
        if (retryCount < maxRetries) {
            console.log(`Retrying image load for ${cat.filename} (attempt ${retryCount + 1})`);
            setTimeout(() => {
                this.loadCatImage(cat)
                    .then(() => {
                        // Success on retry
                        this.resultMessage.textContent = `🐱 ${cat.alt}`;
                        this.showUserFeedback('success', 'Meow! Image loaded successfully! 🎉');
                    })
                    .catch(() => {
                        // Failed again, try once more or show fallback
                        this.handleImageLoadError(cat, retryCount + 1);
                    });
            }, 1000 * (retryCount + 1)); // Exponential backoff
            return;
        }

        // All retries failed, show fallback
        this.createFallbackImage(cat);
        
        // Update result message with error info
        this.resultMessage.textContent = `🐱 ${cat.alt} (Image not available)`;
        
        // Show error feedback to user
        this.showUserFeedback('error', 'Image failed to load, but here\'s your cat! 😸');
        
        // Still show success animation
        this.resultContainer.classList.add('result-revealed');
        setTimeout(() => {
            this.resultContainer.classList.remove('result-revealed');
        }, 1000);
    }

    // Create fallback placeholder image
    createFallbackImage(cat) {
        // Create SVG placeholder
        const svgPlaceholder = `
            <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="200" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2"/>
                <text x="150" y="80" text-anchor="middle" font-family="Arial" font-size="16" fill="#6c757d">🐱</text>
                <text x="150" y="110" text-anchor="middle" font-family="Arial" font-size="14" fill="#6c757d">Cat Image</text>
                <text x="150" y="130" text-anchor="middle" font-family="Arial" font-size="14" fill="#6c757d">Not Available</text>
                <text x="150" y="160" text-anchor="middle" font-family="Arial" font-size="12" fill="#adb5bd">${cat.alt}</text>
            </svg>
        `;
        
        // Convert SVG to data URL
        const svgDataUrl = 'data:image/svg+xml;base64,' + btoa(svgPlaceholder);
        
        // Set placeholder image
        this.resultImage.src = svgDataUrl;
        this.resultImage.alt = `Placeholder for ${cat.alt}`;
        this.resultImage.style.display = 'block';
    }

    // Show enhanced user feedback messages
    showUserFeedback(type, message, duration = 3000, persistent = false) {
        try {
            // Create or update feedback element
            let feedbackElement = document.getElementById('userFeedback');
            if (!feedbackElement) {
                feedbackElement = document.createElement('div');
                feedbackElement.id = 'userFeedback';
                feedbackElement.className = 'user-feedback';
                if (this.resultContainer) {
                    this.resultContainer.appendChild(feedbackElement);
                } else {
                    document.body.appendChild(feedbackElement);
                }
            }

            // Clear any existing timeout
            if (feedbackElement.hideTimeout) {
                clearTimeout(feedbackElement.hideTimeout);
                feedbackElement.hideTimeout = null;
            }

            // Update content and styling
            feedbackElement.textContent = message;
            feedbackElement.className = `user-feedback ${type}`;
            feedbackElement.style.display = 'block';

            // Add appropriate icon based on type
            const icons = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️',
                loading: '⏳'
            };

            if (icons[type]) {
                feedbackElement.textContent = `${icons[type]} ${message}`;
            }

            // Update status indicator
            this.updateStatusIndicator(type, message);

            // Auto-hide feedback unless persistent
            if (!persistent && duration > 0) {
                feedbackElement.hideTimeout = setTimeout(() => {
                    try {
                        feedbackElement.style.display = 'none';
                        feedbackElement.hideTimeout = null;
                    } catch (error) {
                        console.error('Error hiding feedback:', error);
                    }
                }, duration);
            }

        } catch (error) {
            console.error('Error showing user feedback:', error);
            // Fallback to console message
            console.log(`${type.toUpperCase()}: ${message}`);
        }
    }

    // Show progress indicator
    showProgressIndicator(show, progress = null) {
        try {
            let progressElement = document.getElementById('progressIndicator');
            
            if (show && !progressElement) {
                // Create progress indicator
                progressElement = document.createElement('div');
                progressElement.id = 'progressIndicator';
                progressElement.className = 'progress-indicator';
                
                const progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                progressElement.appendChild(progressBar);
                
                if (this.resultContainer) {
                    this.resultContainer.appendChild(progressElement);
                }
            }

            if (progressElement) {
                if (show) {
                    progressElement.classList.add('active');
                    const progressBar = progressElement.querySelector('.progress-bar');
                    
                    if (progress !== null && progressBar) {
                        // Show specific progress
                        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
                        progressBar.classList.remove('indeterminate');
                    } else if (progressBar) {
                        // Show indeterminate progress
                        progressBar.classList.add('indeterminate');
                    }
                } else {
                    progressElement.classList.remove('active');
                }
            }
        } catch (error) {
            console.error('Error showing progress indicator:', error);
        }
    }

    // Update status indicator
    updateStatusIndicator(status, message) {
        try {
            let statusElement = document.getElementById('statusIndicator');
            
            if (!statusElement) {
                statusElement = document.createElement('div');
                statusElement.id = 'statusIndicator';
                statusElement.className = 'status-indicator';
                
                const statusDot = document.createElement('div');
                statusDot.className = 'status-dot';
                statusElement.appendChild(statusDot);
                
                const statusText = document.createElement('span');
                statusText.className = 'status-text';
                statusElement.appendChild(statusText);
                
                if (this.resultContainer) {
                    this.resultContainer.appendChild(statusElement);
                }
            }

            const statusDot = statusElement.querySelector('.status-dot');
            const statusText = statusElement.querySelector('.status-text');

            if (statusDot && statusText) {
                // Update dot appearance
                statusDot.className = `status-dot ${status}`;
                
                // Update text
                statusText.textContent = message || '';
                
                // Show/hide based on status
                if (status === 'loading') {
                    statusElement.style.display = 'flex';
                } else {
                    // Hide after a delay for non-loading states
                    setTimeout(() => {
                        if (statusElement && status !== 'loading') {
                            statusElement.style.display = 'none';
                        }
                    }, 2000);
                }
            }
        } catch (error) {
            console.error('Error updating status indicator:', error);
        }
    }

    // Handle errors during spinning
    handleSpinError(error) {
        try {
            console.error('Spin error:', error);
            
            // Clear any pending timeouts
            if (this.spinTimeoutId) {
                clearTimeout(this.spinTimeoutId);
                this.spinTimeoutId = null;
            }
            
            // Reset spinning state
            rouletteState.isSpinning = false;
            
            // Update UI state with error handling
            try {
                this.updateSpinningState(false);
            } catch (uiError) {
                console.error('Error updating UI state:', uiError);
                // Fallback UI reset
                this.fallbackUIReset();
            }
            
            // Determine error message based on error type
            let errorMessage = 'Oops! Something went wrong. Please try again.';
            
            if (error.message.includes('DOM elements')) {
                errorMessage = 'Page elements are missing. Please refresh the page.';
            } else if (error.message.includes('rotation')) {
                errorMessage = 'Animation error occurred. Please try spinning again.';
            } else if (error.message.includes('cat')) {
                errorMessage = 'Cat selection failed. Please try again.';
            } else if (!navigator.onLine) {
                errorMessage = 'No internet connection. Please check your connection and try again.';
            }
            
            this.showUserFeedback('error', errorMessage);
            
        } catch (criticalError) {
            console.error('Critical error in error handler:', criticalError);
            // Last resort fallback
            this.criticalErrorFallback();
        }
    }

    // Fallback UI reset when normal methods fail
    fallbackUIReset() {
        try {
            if (this.spinButton) {
                this.spinButton.disabled = false;
                this.spinButton.textContent = 'SPIN';
                this.spinButton.className = this.spinButton.className.replace(/\s*spinning\s*/g, '');
            }
        } catch (error) {
            console.error('Fallback UI reset failed:', error);
        }
    }

    // Critical error fallback when all else fails
    criticalErrorFallback() {
        try {
            const resultMessage = document.getElementById('resultMessage');
            if (resultMessage) {
                resultMessage.textContent = 'A critical error occurred. Please refresh the page.';
                resultMessage.style.color = '#e74c3c';
            }
        } catch (error) {
            console.error('Critical error fallback failed:', error);
        }
    }

    // Fallback result display when normal display fails
    showFallbackResult(cat) {
        try {
            if (this.resultTitle) {
                this.resultTitle.textContent = 'Result:';
            }
            if (this.resultMessage) {
                this.resultMessage.textContent = `🐱 ${cat?.alt || 'A cat was selected'}`;
            }
            this.showUserFeedback('info', 'Result displayed with limited functionality.');
        } catch (error) {
            console.error('Fallback result display failed:', error);
        }
    }
}

// Event handling and state management
class RouletteEventHandler {
    constructor() {
        this.wheelElement = document.getElementById('rouletteWheel');
        this.spinButton = document.getElementById('spinButton');
        this.resultContainer = document.getElementById('resultContainer');
        
        if (!this.wheelElement || !this.spinButton || !this.resultContainer) {
            console.error('Required DOM elements not found');
            return;
        }

        this.spinner = new WheelSpinner(this.wheelElement, this.spinButton, this.resultContainer);
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Spin button click handler
        this.spinButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.handleSpinButtonClick();
        });

        // Keyboard accessibility
        this.spinButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                this.handleSpinButtonClick();
            }
        });

        // Prevent double-click issues
        this.spinButton.addEventListener('dblclick', (event) => {
            event.preventDefault();
        });
    }

    handleSpinButtonClick() {
        try {
            // Prevent rapid clicking
            const timeSinceLastSpin = Date.now() - rouletteState.lastSpinTime;
            if (timeSinceLastSpin < 500) { // 500ms cooldown
                return;
            }

            this.spinner.spin();
        } catch (error) {
            this.spinner.handleSpinError(error);
        }
    }
}

// Initialize the roulette when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    let initializationAttempts = 0;
    const maxInitAttempts = 3;

    async function attemptInitialization() {
        try {
            initializationAttempts++;
            console.log(`Initialization attempt ${initializationAttempts}/${maxInitAttempts}`);

            // Check browser compatibility first
            if (!checkBrowserCompatibility()) {
                throw new Error('Browser not supported - please use a modern browser');
            }

            // Validate critical DOM elements exist
            const requiredElements = ['resultMessage', 'spinButton', 'rouletteWheel', 'resultContainer'];
            const missingElements = requiredElements.filter(id => !document.getElementById(id));
            
            if (missingElements.length > 0) {
                throw new Error(`Critical DOM elements missing: ${missingElements.join(', ')}`);
            }

            // Show loading state with error handling
            const resultMessage = document.getElementById('resultMessage');
            const spinButton = document.getElementById('spinButton');
            
            try {
                if (resultMessage) {
                    resultMessage.textContent = 'Loading cat images... 🐱';
                    resultMessage.style.color = ''; // Reset any error styling
                }
                if (spinButton) {
                    spinButton.disabled = true;
                    spinButton.textContent = 'LOADING...';
                    spinButton.style.background = ''; // Reset any error styling
                }
            } catch (uiError) {
                console.warn('Error updating loading UI:', uiError);
                // Continue initialization even if UI update fails
            }

            // Check network connectivity
            if (!navigator.onLine) {
                console.warn('No network connection detected - some features may not work');
            }

            // Initialize core roulette logic with timeout
            const initPromise = initializeRoulette();
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Initialization timeout')), 15000);
            });

            const initSuccess = await Promise.race([initPromise, timeoutPromise]);
            
            if (!initSuccess) {
                throw new Error('Roulette initialization failed');
            }
            
            // Initialize event handling with error handling
            let eventHandler;
            try {
                eventHandler = new RouletteEventHandler();
                if (!eventHandler || !eventHandler.spinner) {
                    throw new Error('Event handler initialization failed');
                }
            } catch (handlerError) {
                console.error('Error initializing event handler:', handlerError);
                throw new Error('Failed to set up user interface');
            }
            
            // Update UI to ready state with error handling
            try {
                if (resultMessage) {
                    resultMessage.textContent = 'Click the spin button to discover a cat!';
                }
                if (spinButton) {
                    spinButton.disabled = false;
                    spinButton.textContent = 'SPIN';
                }
            } catch (uiError) {
                console.warn('Error updating ready UI:', uiError);
                // Continue even if UI update fails
            }
            
            console.log('Cat Roulette fully initialized and ready to spin!');
            
            // Add network status listeners with enhanced feedback
            try {
                // Create network status indicator
                createNetworkStatusIndicator();
                
                window.addEventListener('online', () => {
                    console.log('Network connection restored');
                    showNetworkStatus('online', 'Connection restored');
                    
                    try {
                        // Retry failed image loads if any
                        if (imagePreloader) {
                            const stats = imagePreloader.getLoadingStats();
                            if (stats.failed > 0) {
                                console.log('Retrying failed image loads...');
                                showUserFeedback('info', 'Retrying failed image loads...', 2000);
                                
                                imagePreloader.preloadAllImages()
                                    .then(() => {
                                        const newStats = imagePreloader.getLoadingStats();
                                        if (newStats.failed < stats.failed) {
                                            showUserFeedback('success', 'Some images recovered!', 2000);
                                        }
                                    })
                                    .catch(error => {
                                        console.warn('Error retrying image loads:', error);
                                    });
                            }
                        }
                    } catch (retryError) {
                        console.warn('Error handling network restoration:', retryError);
                    }
                });
                
                window.addEventListener('offline', () => {
                    console.warn('Network connection lost - some features may not work');
                    showNetworkStatus('offline', 'No internet connection');
                    showUserFeedback('warning', 'Connection lost - some features may not work', 5000);
                });

                // Check initial network status
                if (!navigator.onLine) {
                    showNetworkStatus('offline', 'No internet connection');
                }
                
            } catch (listenerError) {
                console.warn('Error setting up network listeners:', listenerError);
            }

            return true; // Success

        } catch (error) {
            console.error(`Initialization attempt ${initializationAttempts} failed:`, error);
            
            // If we haven't reached max attempts and it's not a critical error, try again
            if (initializationAttempts < maxInitAttempts && !isCriticalError(error)) {
                console.log(`Retrying initialization in ${initializationAttempts * 1000}ms...`);
                await new Promise(resolve => setTimeout(resolve, initializationAttempts * 1000));
                return attemptInitialization();
            }
            
            // All attempts failed or critical error, show error to user
            showInitializationError(error);
            return false;
        }
    }

    function isCriticalError(error) {
        const criticalErrors = [
            'Browser not supported',
            'Critical DOM elements missing',
            'Event handler initialization failed'
        ];
        return criticalErrors.some(critical => error.message.includes(critical));
    }

    function showInitializationError(error) {
        try {
            const resultMessage = document.getElementById('resultMessage');
            const spinButton = document.getElementById('spinButton');
            
            let errorMsg = 'Sorry, there was an error loading the roulette. Please refresh the page.';
            let technicalMsg = '';

            if (error.message.includes('Browser not supported')) {
                errorMsg = 'Your browser is not supported. Please use a modern browser like Chrome, Firefox, or Safari.';
            } else if (error.message.includes('DOM elements missing')) {
                errorMsg = 'Page structure is incomplete. Please refresh the page.';
                technicalMsg = 'Missing elements detected';
            } else if (error.message.includes('timeout')) {
                errorMsg = 'Loading took too long. Please check your connection and refresh the page.';
            } else if (!navigator.onLine) {
                errorMsg = 'No internet connection. Please check your connection and refresh the page.';
            } else if (error.message.includes('Event handler')) {
                errorMsg = 'User interface failed to load. Please refresh the page.';
            }

            if (resultMessage) {
                resultMessage.textContent = errorMsg;
                resultMessage.style.color = '#e74c3c';
                if (technicalMsg) {
                    resultMessage.title = technicalMsg; // Show technical details on hover
                }
            }
            
            if (spinButton) {
                spinButton.disabled = true;
                spinButton.textContent = 'ERROR';
                spinButton.style.background = '#e74c3c';
                spinButton.style.cursor = 'not-allowed';
            }

            // Add retry button if it's not a critical error
            if (!isCriticalError(error)) {
                addRetryButton();
            }

        } catch (displayError) {
            console.error('Error displaying initialization error:', displayError);
            // Last resort: try to show something to the user
            try {
                document.body.innerHTML = '<div style="text-align: center; padding: 50px; color: #e74c3c;">Failed to load Cat Roulette. Please refresh the page.</div>';
            } catch (lastResortError) {
                console.error('Last resort error display failed:', lastResortError);
            }
        }
    }

    function addRetryButton() {
        try {
            const resultContainer = document.getElementById('resultContainer');
            if (resultContainer && !document.getElementById('retryButton')) {
                const retryButton = document.createElement('button');
                retryButton.id = 'retryButton';
                retryButton.textContent = 'Try Again';
                retryButton.style.cssText = `
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                `;
                
                retryButton.addEventListener('click', () => {
                    location.reload();
                });
                
                resultContainer.appendChild(retryButton);
            }
        } catch (error) {
            console.error('Error adding retry button:', error);
        }
    }

    // Start initialization
    await attemptInitialization();
});

// Network status indicator functions
function createNetworkStatusIndicator() {
    try {
        if (!document.getElementById('networkStatus')) {
            const networkStatus = document.createElement('div');
            networkStatus.id = 'networkStatus';
            networkStatus.className = 'network-status';
            document.body.appendChild(networkStatus);
        }
    } catch (error) {
        console.error('Error creating network status indicator:', error);
    }
}

function showNetworkStatus(status, message) {
    try {
        const networkStatus = document.getElementById('networkStatus');
        if (networkStatus) {
            networkStatus.textContent = message;
            networkStatus.className = `network-status ${status}`;
            
            // Auto-hide online status after 3 seconds
            if (status === 'online') {
                setTimeout(() => {
                    networkStatus.style.display = 'none';
                }, 3000);
            }
        }
    } catch (error) {
        console.error('Error showing network status:', error);
    }
}

// Enhanced user feedback function (global)
function showUserFeedback(type, message, duration = 3000, persistent = false) {
    try {
        // Find the first available result container or create a temporary one
        let container = document.getElementById('resultContainer');
        if (!container) {
            container = document.body;
        }

        // Create or update feedback element
        let feedbackElement = document.getElementById('globalUserFeedback');
        if (!feedbackElement) {
            feedbackElement = document.createElement('div');
            feedbackElement.id = 'globalUserFeedback';
            feedbackElement.className = 'user-feedback';
            container.appendChild(feedbackElement);
        }

        // Clear any existing timeout
        if (feedbackElement.hideTimeout) {
            clearTimeout(feedbackElement.hideTimeout);
            feedbackElement.hideTimeout = null;
        }

        // Update content and styling
        feedbackElement.textContent = message;
        feedbackElement.className = `user-feedback ${type}`;
        feedbackElement.style.display = 'block';

        // Add appropriate icon based on type
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            loading: '⏳'
        };

        if (icons[type]) {
            feedbackElement.textContent = `${icons[type]} ${message}`;
        }

        // Auto-hide feedback unless persistent
        if (!persistent && duration > 0) {
            feedbackElement.hideTimeout = setTimeout(() => {
                try {
                    feedbackElement.style.display = 'none';
                    feedbackElement.hideTimeout = null;
                } catch (error) {
                    console.error('Error hiding global feedback:', error);
                }
            }, duration);
        }

    } catch (error) {
        console.error('Error showing global user feedback:', error);
        // Fallback to console message
        console.log(`${type.toUpperCase()}: ${message}`);
    }
}