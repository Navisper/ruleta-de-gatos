/**
 * Deployment Status Monitor
 * Provides client-side deployment status and monitoring capabilities
 */

/**
 * Simple Version Display para página estática
 */
class SimpleVersionDisplay {
    constructor() {
        this.version = '1.0.0';
        this.init();
    }

    async init() {
        try {
            // Solo carga la info de versión si existe
            const response = await fetch('./deployment-info.json');
            if (response.ok) {
                const data = await response.json();
                if (data && data.version) {
                    this.version = data.version;
                }
            }
        } catch (error) {
            // No importa si falla, usamos versión por defecto
            console.log('Usando versión por defecto');
        }
        
        this.updateDisplay();
    }

    updateDisplay() {
        const versionElement = document.getElementById('deploymentVersion');
        if (versionElement) {
            versionElement.textContent = `v${this.version}`;
        }
    }
}

// Inicialización simple
document.addEventListener('DOMContentLoaded', () => {
    window.versionDisplay = new SimpleVersionDisplay();
});

