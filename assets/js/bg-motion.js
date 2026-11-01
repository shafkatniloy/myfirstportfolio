/**
 * ============================================================================
 * INTERACTIVE MOUSE MOTION BACKGROUND ENGINE
 * Creates a fluid, theme-reactive ambient spotlight & celestial algorithmic mesh
 * that responds organically to cursor kinematics with inertial LERP physics.
 * ============================================================================
 */

(function () {
    'use strict';

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    document.addEventListener('DOMContentLoaded', function () {
        const container = document.getElementById('bgMotionContainer');
        const glowFollower = document.getElementById('mouseGlowFollower');
        const canvas = document.getElementById('bgMotionCanvas');

        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Viewport Dimensions
        let width = 0;
        let height = 0;
        let dpr = 1;

        // Mouse Physics & Coordinates (LERP)
        let mouseX = -1000;
        let mouseY = -1000;
        let targetMouseX = -1000;
        let targetMouseY = -1000;
        let isMouseActive = false;
        let mouseVelocity = 0;
        let prevTargetX = -1000;
        let prevTargetY = -1000;

        // Auto-orbit for idle or mobile touch devices
        let autoOrbitAngle = 0;
        let hasRealMouseMoved = false;

        // Animation Frame Handle
        let animFrameId = null;
        let isRunning = false;

        // Dynamic Theme Colors
        let primaryRgb = '105, 90, 166'; // fallback royal purple
        let isDarkMode = true;

        function updateThemeContext() {
            const computed = getComputedStyle(document.documentElement);
            const rgbVar = computed.getPropertyValue('--primary-rgb').trim();
            if (rgbVar) {
                primaryRgb = rgbVar;
            }
            isDarkMode = document.documentElement.getAttribute('data-theme') !== 'light';
        }

        updateThemeContext();

        // Listen for theme palette clicks or dark mode changes
        const observer = new MutationObserver(function () {
            updateThemeContext();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style'] });

        // Particles System Config (High-Density Galaxy Mesh)
        const particles = [];
        const isMobile = window.innerWidth <= 768;
        const MOUSE_RADIUS = isMobile ? 140 : 195;
        const CONNECT_DIST = isMobile ? 68 : 92;

        function getParticleCount() {
            const w = width || window.innerWidth;
            const h = height || window.innerHeight;
            const area = w * h;
            // Rich, vibrant cosmic field (~220-260 on desktop, ~80 on mobile)
            return Math.min(265, Math.max(75, Math.floor(area / 8200)));
        }

        class MotionParticle {
            constructor() {
                this.reset(true);
            }

            reset(initial) {
                this.x = initial ? Math.random() * (width || window.innerWidth) : (Math.random() > 0.5 ? 0 : width);
                this.y = initial ? Math.random() * (height || window.innerHeight) : Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.38;
                this.vy = (Math.random() - 0.5) * 0.38;

                // Multilevel depth sizing (ambient stars vs prominent focal nodes)
                const tier = Math.random();
                if (tier < 0.5) {
                    this.radius = Math.random() * 0.5 + 0.6; // Distant twinkling star
                    this.baseAlpha = Math.random() * 0.25 + 0.18;
                } else if (tier < 0.85) {
                    this.radius = Math.random() * 0.7 + 1.1; // Mid-layer constellation node
                    this.baseAlpha = Math.random() * 0.35 + 0.28;
                } else {
                    this.radius = Math.random() * 0.9 + 1.8; // Foreground focal node
                    this.baseAlpha = Math.random() * 0.45 + 0.42;
                }

                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulseVal = Math.random() * Math.PI * 2;
            }

            update() {
                // Natural organic drift
                this.x += this.vx;
                this.y += this.vy;

                // Subtle alpha breathing
                this.pulseVal += this.pulseSpeed;

                // Screen boundary wrapping
                if (this.x < -20) this.x = width + 20;
                if (this.x > width + 20) this.x = -20;
                if (this.y < -20) this.y = height + 20;
                if (this.y > height + 20) this.y = -20;

                // Interactive Mouse Proximity Reaction
                if (isMouseActive && mouseX > 0 && mouseY > 0) {
                    const dx = mouseX - this.x;
                    const dy = mouseY - this.y;

                    if (Math.abs(dx) < MOUSE_RADIUS && Math.abs(dy) < MOUSE_RADIUS) {
                        const distSq = dx * dx + dy * dy;
                        if (distSq < MOUSE_RADIUS * MOUSE_RADIUS && distSq > 0) {
                            const dist = Math.sqrt(distSq);
                            const force = (1 - dist / MOUSE_RADIUS) * 0.038;
                            this.x -= (dx / dist) * force * 15;
                            this.y -= (dy / dist) * force * 15;
                        }
                    }
                }
            }

            draw() {
                const alpha = this.baseAlpha + Math.sin(this.pulseVal) * 0.14;
                const finalAlpha = Math.max(0.06, Math.min(0.85, isDarkMode ? alpha : alpha * 0.65));

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${primaryRgb}, ${finalAlpha})`;
                ctx.fill();
            }
        }

        // Initialize particles
        function initParticles() {
            particles.length = 0;
            const targetCount = getParticleCount();
            for (let i = 0; i < targetCount; i++) {
                particles.push(new MotionParticle());
            }
        }

        // Resize Canvas with high-DPI scaling
        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';

            ctx.scale(dpr, dpr);

            if (particles.length === 0 || Math.abs(particles.length - getParticleCount()) > 20) {
                initParticles();
            }
        }

        resize();
        window.addEventListener('resize', resize, { passive: true });

        // Mouse Motion Listeners
        window.addEventListener('mousemove', function (e) {
            hasRealMouseMoved = true;
            isMouseActive = true;
            targetMouseX = e.clientX;
            targetMouseY = e.clientY;

            // Velocity tracking for subtle glow expansion
            if (prevTargetX > 0 && prevTargetY > 0) {
                const vx = targetMouseX - prevTargetX;
                const vy = targetMouseY - prevTargetY;
                mouseVelocity = Math.min(40, Math.sqrt(vx * vx + vy * vy));
            }
            prevTargetX = targetMouseX;
            prevTargetY = targetMouseY;

            if (glowFollower) {
                glowFollower.classList.add('active');
            }
        }, { passive: true });

        window.addEventListener('mouseenter', function () {
            isMouseActive = true;
            if (glowFollower) glowFollower.classList.add('active');
        });

        window.addEventListener('mouseleave', function () {
            isMouseActive = false;
            targetMouseX = -1000;
            targetMouseY = -1000;
            if (glowFollower) glowFollower.classList.remove('active');
        });

        // Main Animation Loop
        function renderLoop() {
            if (!isRunning) return;

            ctx.clearRect(0, 0, width, height);

            // Inertial LERP Physics for Mouse Position (Buttery Smooth Glide)
            if (hasRealMouseMoved && targetMouseX > -500) {
                const lerpFactor = 0.085;
                mouseX += (targetMouseX - mouseX) * lerpFactor;
                mouseY += (targetMouseY - mouseY) * lerpFactor;
            } else {
                // Gentle idle orbital motion if no mouse movement (e.g. touch screens or initial load)
                autoOrbitAngle += 0.008;
                const orbitCenterX = width * 0.5;
                const orbitCenterY = height * 0.45;
                const orbitRadiusX = width * 0.22;
                const orbitRadiusY = height * 0.18;
                mouseX = orbitCenterX + Math.cos(autoOrbitAngle) * orbitRadiusX;
                mouseY = orbitCenterY + Math.sin(autoOrbitAngle * 1.3) * orbitRadiusY;
                isMouseActive = true;
            }

            // Decay velocity gently
            mouseVelocity *= 0.92;

            // Update & Reposition Ambient Spotlight Glow Follower
            if (glowFollower && mouseX > -200 && mouseX < width + 200) {
                const scale = 1 + Math.min(0.2, mouseVelocity * 0.008);
                glowFollower.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${scale})`;
            }

            // Update & Draw Particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }

            // Draw Algorithmic Constellation Connections between nearby nodes (Fast-path optimized)
            const maxLineDist = CONNECT_DIST;
            const maxDistSq = maxLineDist * maxLineDist;
            const mouseRadiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

            for (let i = 0; i < particles.length; i++) {
                const pi = particles[i];

                for (let j = i + 1; j < particles.length; j++) {
                    const pj = particles[j];
                    const dx = pi.x - pj.x;
                    if (Math.abs(dx) > maxLineDist) continue;
                    const dy = pi.y - pj.y;
                    if (Math.abs(dy) > maxLineDist) continue;

                    const distSq = dx * dx + dy * dy;
                    if (distSq < maxDistSq) {
                        const dist = Math.sqrt(distSq);
                        const lineAlpha = (1 - dist / maxLineDist) * (isDarkMode ? 0.16 : 0.08);
                        ctx.beginPath();
                        ctx.moveTo(pi.x, pi.y);
                        ctx.lineTo(pj.x, pj.y);
                        ctx.strokeStyle = `rgba(${primaryRgb}, ${lineAlpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }

                // Draw filament connection from active cursor to nearby nodes
                if (isMouseActive && mouseX > 0 && mouseY > 0) {
                    const mdx = pi.x - mouseX;
                    if (Math.abs(mdx) < MOUSE_RADIUS) {
                        const mdy = pi.y - mouseY;
                        if (Math.abs(mdy) < MOUSE_RADIUS) {
                            const mdistSq = mdx * mdx + mdy * mdy;
                            if (mdistSq < mouseRadiusSq) {
                                const mdist = Math.sqrt(mdistSq);
                                const mLineAlpha = (1 - mdist / MOUSE_RADIUS) * (isDarkMode ? 0.32 : 0.16);
                                ctx.beginPath();
                                ctx.moveTo(pi.x, pi.y);
                                ctx.lineTo(mouseX, mouseY);
                                ctx.strokeStyle = `rgba(${primaryRgb}, ${mLineAlpha})`;
                                ctx.lineWidth = 1;
                                ctx.stroke();
                            }
                        }
                    }
                }
            }

            animFrameId = requestAnimationFrame(renderLoop);
        }

        // Start animation
        function start() {
            if (!isRunning) {
                isRunning = true;
                animFrameId = requestAnimationFrame(renderLoop);
            }
        }

        // Stop animation (save battery / CPU when tab is hidden)
        function stop() {
            if (isRunning) {
                isRunning = false;
                if (animFrameId) {
                    cancelAnimationFrame(animFrameId);
                    animFrameId = null;
                }
            }
        }

        // Page Visibility API Integration
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        });

        start();
    });

})();

