/**
 * Deployment Status Monitor
 * Provides client-side deployment status and monitoring capabilities
 */

class DeploymentMonitor {
    constructor() {
        this.deploymentInfo = null;
        this.healthStatus = null;
        this.init();
    }

    async init() {
        try {
            await this.loadDeploymentInfo();
            await this.checkHealth();
            this.updateStatusDisplay();
            this.setupPeriodicHealthCheck();
        } catch (error) {
            console.warn('Deployment monitor initialization failed:', error);
        }
    }

    async loadDeploymentInfo() {
        try {
            const response = await fetch('./deployment-info.json');
            if (response.ok) {
                const deploymentData = await response.json();

                // Validate deployment data structure
                if (deploymentData && deploymentData.version) {
                    this.deploymentInfo = deploymentData;
                    console.log('Deployment Info:', this.deploymentInfo);
                } else {
                    console.warn('Invalid deployment info structure:', deploymentData);
                }
            } else {
                console.warn('Deployment info endpoint returned:', response.status);
                // For local development, create fallback info
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    this.deploymentInfo = {
                        version: '1.0.0-dev',
                        deployment_time: new Date().toISOString(),
                        branch: 'local',
                        commit_sha: 'local-development'
                    };
                }
            }
        } catch (error) {
            console.warn('Could not load deployment info:', error);
            // Fallback for local development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                this.deploymentInfo = {
                    version: '1.0.0-dev',
                    deployment_time: new Date().toISOString(),
                    branch: 'local',
                    commit_sha: 'local-development'
                };
            }
        }
    }

    async checkHealth() {
        try {
            const response = await fetch('./health.json');
            if (response.ok) {
                const healthData = await response.json();

                // Validate health data structure
                if (healthData && typeof healthData.status === 'string') {
                    this.healthStatus = healthData;
                    console.log('Health Status:', this.healthStatus);
                    return healthData.status === 'healthy';
                } else {
                    console.warn('Invalid health data structure:', healthData);
                    return false;
                }
            } else {
                console.warn('Health endpoint returned:', response.status);
                return false;
            }
        } catch (error) {
            console.warn('Health check failed:', error);
            // For local development, assume healthy if health endpoint is not available
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                this.healthStatus = { status: 'healthy', service: 'cat-roulette-local' };
                return true;
            }
            return false;
        }
    }

    setupPeriodicHealthCheck() {
        // Check health every 5 minutes
        setInterval(async () => {
            const isHealthy = await this.checkHealth();
            this.updateStatusDisplay();
            if (!isHealthy) {
                console.warn('Health check failed - service may be degraded');
                this.notifyHealthIssue();
            }
        }, 5 * 60 * 1000);
    }

    updateStatusDisplay() {
        const statusElement = document.getElementById('deploymentStatus');
        const versionElement = document.getElementById('deploymentVersion');
        const healthElement = document.getElementById('deploymentHealth');

        if (statusElement && this.deploymentInfo) {
            statusElement.style.display = 'block';

            if (versionElement) {
                versionElement.textContent = `v${this.deploymentInfo.version}`;
            }

            if (healthElement) {
                const isHealthy = this.healthStatus && this.healthStatus.status === 'healthy';
                healthElement.className = isHealthy ? 'health-indicator' : 'health-indicator unhealthy';
                healthElement.title = isHealthy ? 'Service is healthy' : 'Service health check failed';
            }
        }
    }

    notifyHealthIssue() {
        // Create a subtle notification for health issues
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ff6b6b;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 14px;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;
        notification.textContent = 'Service health check failed';

        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }

    getDeploymentInfo() {
        return this.deploymentInfo;
    }

    getHealthStatus() {
        return this.healthStatus;
    }

    // Validate health endpoint format for deployment verification
    validateHealthEndpoint() {
        if (!this.healthStatus) {
            return { valid: false, error: 'Health status not loaded' };
        }

        const required = ['status', 'service'];
        const missing = required.filter(field => !this.healthStatus[field]);

        if (missing.length > 0) {
            return { valid: false, error: `Missing required fields: ${missing.join(', ')}` };
        }

        if (this.healthStatus.status !== 'healthy') {
            return { valid: false, error: `Invalid status: ${this.healthStatus.status}` };
        }

        return { valid: true };
    }

    // Expose deployment info to console for debugging
    showDeploymentInfo() {
        if (this.deploymentInfo) {
            console.table({
                'Deployment Time': this.deploymentInfo.deployment_time,
                'Commit SHA': this.deploymentInfo.commit_sha,
                'Branch': this.deploymentInfo.branch,
                'Version': this.deploymentInfo.version,
                'Workflow Run': this.deploymentInfo.workflow_run_id
            });
        } else {
            console.log('Deployment info not available');
        }
    }
}

// Initialize deployment monitor when DOM is ready
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.deploymentMonitor = new DeploymentMonitor();

        // Add global functions for easy access in console
        window.showDeploymentInfo = () => {
            window.deploymentMonitor.showDeploymentInfo();
        };

        window.testHealthEndpoint = async () => {
            const isHealthy = await window.deploymentMonitor.checkHealth();
            const validation = window.deploymentMonitor.validateHealthEndpoint();

            console.log('Health Check Results:');
            console.log('- Is Healthy:', isHealthy);
            console.log('- Validation:', validation);
            console.log('- Health Data:', window.deploymentMonitor.getHealthStatus());

            return { isHealthy, validation };
        };
    });
}

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DeploymentMonitor;
}