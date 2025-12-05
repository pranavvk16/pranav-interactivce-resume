
(function () {
    // Configuration
    const CONFIG = {
        particleCount: 300, // "Lot of points" as requested
        connectionDistance: 120, // Distance to connect cursor to point
        mouseForceRadius: 150, // Radius where mouse affects particles
        baseColor: 'rgba(255, 255, 255, 0.6)',
        lineColor: '255, 255, 255', // RGB values for rgba string interpolation
        zIndex: 9999, // High z-index but with pointer-events: none
    };

    class NeuralCursor {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.particles = [];
            this.mouse = { x: -1000, y: -1000 };

            this.init();
        }

        init() {
            // Setup Canvas
            this.canvas.id = 'neural-canvas';
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.pointerEvents = 'none'; // Click-through
            this.canvas.style.zIndex = CONFIG.zIndex;
            // distinct visual style
            this.canvas.style.mixBlendMode = 'screen';
            document.body.appendChild(this.canvas);

            // Events
            window.addEventListener('resize', this.resize.bind(this));
            window.addEventListener('mousemove', this.mouseMove.bind(this));

            this.resize();
            this.createParticles();
            this.animate();
        }

        resize() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            // Re-create particles on resize to maintain density
            this.createParticles();
        }

        mouseMove(e) {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        }

        createParticles() {
            this.particles = [];
            // Adjust count based on screen size roughly, but keep it high
            const count = window.innerWidth < 768 ? CONFIG.particleCount / 2 : CONFIG.particleCount;

            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    vx: (Math.random() - 0.5) * 0.4, // Subtle floating movement
                    vy: (Math.random() - 0.5) * 0.4,
                    size: Math.random() * 1.5 + 0.5 // Random dots sizes
                });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.width, this.height);

            this.particles.forEach((p, index) => {
                // Update Position
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > this.width) p.vx *= -1;
                if (p.y < 0 || p.y > this.height) p.vy *= -1;

                // Draw Particle
                this.ctx.beginPath();
                this.ctx.fillStyle = CONFIG.baseColor;
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();

                // Connect to Mouse
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONFIG.connectionDistance) {
                    const opacity = 1 - (dist / CONFIG.connectionDistance);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(${CONFIG.lineColor}, ${opacity})`;
                    this.ctx.lineWidth = 1; // Delicate lines
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.stroke();
                }
            });

            requestAnimationFrame(this.animate.bind(this));
        }
    }

    // Initialize on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new NeuralCursor());
    } else {
        new NeuralCursor();
    }
})();
