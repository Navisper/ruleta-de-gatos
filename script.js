// Cat Roulette - Core JavaScript Logic

// Cat images data structure
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
        alt: "Playful teal cat with spots",
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

// Simplified Cat Image Manager
class CatImageManager {
    constructor(images) {
        this.images = images;
    }

    selectRandomCat() {
        const randomIndex = Math.floor(Math.random() * this.images.length);
        return this.images[randomIndex];
    }

    getAllCats() {
        return [...this.images];
    }

    getCatById(id) {
        return this.images.find(cat => cat.id === id);
    }
}

// Initialize cat manager
const catManager = new CatImageManager(catImages);

// Simple Wheel Spinner
class WheelSpinner {
    constructor(wheelElement, spinButton, resultContainer) {
        this.wheelElement = wheelElement;
        this.spinButton = spinButton;
        this.resultContainer = resultContainer;
        this.resultTitle = document.getElementById('resultTitle');
        this.resultImage = document.getElementById('resultImage');
        this.resultImageContainer = document.getElementById('resultImageContainer');
        this.resultMessage = document.getElementById('resultMessage');

        this.bindEvents();
        this.initializeWheel();
    }

    bindEvents() {
        this.spinButton.addEventListener('click', () => {
            this.spin();
        });
    }

    initializeWheel() {
        console.log('Initializing wheel...');
        // Create simple visual segments
        this.createWheelSegments();
    }

    // En la clase WheelSpinner, modifica el método createWheelSegments:

    createWheelSegments() {
        const cats = catManager.getAllCats();
        const segmentAngle = 360 / cats.length;

        // Clear existing segments
        const existingSegments = this.wheelElement.querySelectorAll('.wheel-segment');
        existingSegments.forEach(segment => segment.remove());

        // Create new segments
        cats.forEach((cat, index) => {
            const segment = document.createElement('div');
            segment.className = 'wheel-segment';
            segment.style.transform = `rotate(${index * segmentAngle}deg)`;
            segment.style.transformOrigin = 'center center';

            // Create image container
            const imageContainer = document.createElement('div');
            imageContainer.className = 'segment-image-container';

            // Create actual image element instead of placeholder
            const img = document.createElement('img');
            img.src = `images/${cat.filename}`;
            img.alt = cat.alt;
            img.onerror = () => {
                // Fallback if image fails to load
                img.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'segment-placeholder';
                placeholder.textContent = '🐱';
                imageContainer.appendChild(placeholder);
            };

            imageContainer.appendChild(img);
            segment.appendChild(imageContainer);

            this.wheelElement.appendChild(segment);
        });
    }

    async spin() {
        if (rouletteState.isSpinning) return;

        rouletteState.isSpinning = true;
        this.updateSpinningState(true);

        // Generate random rotation
        const minRotations = 3;
        const maxRotations = 6;
        const fullRotations = Math.random() * (maxRotations - minRotations) + minRotations;
        const finalAngle = Math.random() * 360;
        const spinRotation = (fullRotations * 360) + finalAngle;

        // Apply animation
        this.wheelElement.style.transition = `transform ${rouletteState.spinDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        this.wheelElement.style.transform = `rotate(${spinRotation}deg)`;

        // Calculate selected cat
        setTimeout(() => {
            this.handleSpinComplete(spinRotation);
        }, rouletteState.spinDuration);
    }

    handleSpinComplete(finalRotation) {
        rouletteState.isSpinning = false;
        this.updateSpinningState(false);

        // Calculate selected cat
        const cats = catManager.getAllCats();
        const segmentAngle = 360 / cats.length;
        const normalizedRotation = finalRotation % 360;
        const adjustedRotation = (360 - normalizedRotation + (segmentAngle / 2)) % 360;
        const segmentIndex = Math.floor(adjustedRotation / segmentAngle);

        const selectedCat = cats[segmentIndex] || cats[0];
        rouletteState.selectedCat = selectedCat;

        this.displayResult(selectedCat);
        this.highlightSelectedSegment(segmentIndex);
    }

    updateSpinningState(isSpinning) {
        if (isSpinning) {
            this.spinButton.disabled = true;
            this.spinButton.textContent = 'SPINNING...';
            this.spinButton.classList.add('spinning');

            this.resultTitle.textContent = 'Spinning...';
            this.resultMessage.textContent = 'The wheel is spinning! 🎰';
            this.resultImage.style.display = 'none';
        } else {
            this.spinButton.disabled = false;
            this.spinButton.textContent = 'SPIN';
            this.spinButton.classList.remove('spinning');
        }
    }

    displayResult(cat) {
        console.log(`Displaying result for cat: ${cat.filename}`);
        
        this.resultTitle.textContent = 'You got:';
        this.resultMessage.textContent = `🐱 ${cat.alt}`;

        // Mostrar estado de carga
        this.resultImageContainer.classList.add('loading');
        this.resultImage.style.display = 'none';

        // Cargar la imagen del gato con un pequeño delay para asegurar que la UI se actualice
        setTimeout(() => {
            this.loadCatImage(cat);
        }, 100);

        // Animación de revelación
        this.resultContainer.classList.add('result-revealed');
        setTimeout(() => {
            this.resultContainer.classList.remove('result-revealed');
        }, 1000);
    }

    loadCatImage(cat) {
        const imagePath = `images/${cat.filename}`;
        console.log(`Attempting to load cat image: ${imagePath}`);
        
        // Crear una nueva imagen para probar la carga
        const testImage = new Image();
        
        testImage.onload = () => {
            console.log(`Successfully loaded image: ${imagePath}`);
            // Si la imagen carga correctamente, mostrarla
            this.resultImage.src = imagePath;
            this.resultImage.alt = cat.alt;
            this.resultImage.style.display = 'block';
            this.resultImageContainer.classList.remove('loading');
        };
        
        testImage.onerror = () => {
            console.warn(`Direct image load failed for: ${imagePath}, trying fetch...`);
            // Si falla, intentar con fetch para SVG
            fetch(imagePath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    console.log(`Fetch successful for: ${imagePath}`);
                    return response.text();
                })
                .then(svgText => {
                    console.log(`SVG content loaded, creating blob URL...`);
                    // Convertir SVG text a data URL
                    const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
                    const svgUrl = URL.createObjectURL(svgBlob);

                    this.resultImage.src = svgUrl;
                    this.resultImage.alt = cat.alt;
                    this.resultImage.style.display = 'block';
                    this.resultImageContainer.classList.remove('loading');
                    
                    console.log(`SVG displayed successfully via blob URL`);
                })
                .catch(fetchError => {
                    console.error(`Error loading SVG via fetch: ${fetchError.message}`);
                    this.createFallbackImage(cat);
                    this.resultImageContainer.classList.remove('loading');
                });
        };
        
        // Intentar cargar la imagen
        testImage.src = imagePath;
    }

    createFallbackImage(cat) {
        console.log(`Creating fallback image for: ${cat.alt}`);
        
        // SVG de fallback más detallado
        const svgContent = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#f8f9fa" stroke="#dee2e6" stroke-width="2" rx="8"/>
            <text x="50%" y="30%" text-anchor="middle" font-family="Arial" font-size="32" fill="#6c757d">🐱</text>
            <text x="50%" y="55%" text-anchor="middle" font-family="Arial" font-size="14" fill="#6c757d">${cat.alt}</text>
            <text x="50%" y="75%" text-anchor="middle" font-family="Arial" font-size="12" fill="#adb5bd">Image: ${cat.filename}</text>
            <text x="50%" y="90%" text-anchor="middle" font-family="Arial" font-size="10" fill="#adb5bd">File not found or failed to load</text>
        </svg>
    `;

        try {
            const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
            const svgUrl = URL.createObjectURL(svgBlob);

            this.resultImage.src = svgUrl;
            this.resultImage.alt = `Fallback for ${cat.alt}`;
            this.resultImage.style.display = 'block';
            this.resultImage.style.width = '100%';
            this.resultImage.style.maxWidth = '300px';
            this.resultImage.style.height = 'auto';
            
            console.log('Fallback image created successfully');
        } catch (error) {
            console.error('Error creating fallback image:', error);
            // Último recurso: mostrar solo texto
            this.resultImage.style.display = 'none';
            this.resultMessage.textContent = `🐱 ${cat.alt} (Image not available)`;
        }
    }

    highlightSelectedSegment(segmentIndex) {
        // Clear previous highlights
        const segments = this.wheelElement.querySelectorAll('.wheel-segment');
        segments.forEach(segment => segment.classList.remove('highlighted'));

        // Highlight selected segment
        if (segments[segmentIndex]) {
            segments[segmentIndex].classList.add('highlighted');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded, initializing roulette...');

    const wheelElement = document.getElementById('rouletteWheel');
    const spinButton = document.getElementById('spinButton');
    const resultContainer = document.getElementById('resultContainer');

    if (!wheelElement || !spinButton || !resultContainer) {
        console.error('Required DOM elements not found');
        return;
    }

    // Initialize the wheel spinner
    const spinner = new WheelSpinner(wheelElement, spinButton, resultContainer);
    console.log('Roulette initialized successfully!');

    // Make spinner available globally for debugging
    window.rouletteSpinner = spinner;
});