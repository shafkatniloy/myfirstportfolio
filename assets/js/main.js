$(document).ready(function () {
    // -------------------------------------------------------------
    // THEME & COLOR PALETTE CONTROLLER
    // -------------------------------------------------------------
    const savedTheme = localStorage.getItem('portfolio-theme');
    const savedColor = localStorage.getItem('portfolio-color') || 'purple';
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply initial dark/light theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    // Apply initial color accent
    applyColor(savedColor);

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);

        const $icons = $('#themeToggleBtn i, #floatingThemeToggleBtn i');
        if (theme === 'dark') {
            $icons.removeClass('fa-moon').addClass('fa-sun');
            $('#themeToggleBtn, #floatingThemeToggleBtn').attr('title', 'Switch to Light Mode');
        } else {
            $icons.removeClass('fa-sun').addClass('fa-moon');
            $('#themeToggleBtn, #floatingThemeToggleBtn').attr('title', 'Switch to Dark Mode');
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
    }

    function applyColor(color) {
        document.documentElement.setAttribute('data-color', color);
        localStorage.setItem('portfolio-color', color);

        // Update active class on all swatches
        $('.color-swatch').removeClass('active');
        $(`.color-swatch[data-color="${color}"]`).addClass('active');
    }

    // Toggle button events
    $('#themeToggleBtn, #floatingThemeToggleBtn').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
    });

    // Palette dropdown toggles
    $('#paletteToggleBtn').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#paletteDropdown').toggleClass('show');
        $('#floatingPaletteDropdown').removeClass('show');
    });

    $('#floatingPaletteToggleBtn').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#floatingPaletteDropdown').toggleClass('show');
        $('#paletteDropdown').removeClass('show');
    });

    // Color swatch selection
    $('.color-swatch').on('click', function (e) {
        e.stopPropagation();
        const selectedColor = $(this).data('color');
        applyColor(selectedColor);
        $('.glass-palette-dropdown').removeClass('show');
    });

    // Close palette on click outside
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.palette-dropdown-wrapper').length) {
            $('.glass-palette-dropdown').removeClass('show');
        }
    });

    // -------------------------------------------------------------
    // NAVIGATION & SMOOTH SCROLL
    // -------------------------------------------------------------
    $(".custom-navbar .link, a.link, a[href^='#']").on('click', function (event) {
        if (this.hash !== "" && $(this.hash).length) {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top - 30
            }, 700, function () {
                window.location.hash = hash;
            });

            // Close mobile menu if open
            $('#nav-toggle').removeClass('is-active');
            $('ul.nav').removeClass('show');
        }
    });

    // Back to top button visibility
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }
    });

    $('#backToTop').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });
});

// Navbar hamburger toggle
$('#nav-toggle').click(function () {
    $(this).toggleClass('is-active');
    $('ul.nav').toggleClass('show');
});

// -------------------------------------------------------------
// ABOUT ME SLIDESHOW
// -------------------------------------------------------------
$(document).ready(function () {
    const images = [
        'assets/imgs/m4.jpg',
        'assets/imgs/m1.jpg',
        'assets/imgs/m3.png',
        'assets/imgs/m5.png'
    ];

    let currentIndex = 0;
    const $aboutImg = $('#aboutImage');
    const $dots = $('.dot');
    let timer = null;

    function showSlide(index) {
        $aboutImg.addClass('fade-out');
        setTimeout(function () {
            currentIndex = index;
            $aboutImg.attr('src', images[currentIndex]);
            $dots.removeClass('active');
            $dots.eq(currentIndex).addClass('active');
            $aboutImg.removeClass('fade-out');
        }, 300);
    }

    function startTimer() {
        timer = setInterval(function () {
            const nextIndex = (currentIndex + 1) % images.length;
            showSlide(nextIndex);
        }, 4000);
    }

    if ($aboutImg.length) {
        startTimer();

        // Clickable dots for manual navigation
        $dots.on('click', function () {
            clearInterval(timer);
            const index = $(this).index();
            showSlide(index);
            startTimer();
        });
    }

    // -------------------------------------------------------------
    // CONTACT FORM AJAX SUBMISSION & ERROR HANDLING
    // -------------------------------------------------------------
    function escapeHtml(str) {
        return $('<div>').text(str || '').html();
    }

    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        const $form = $(this);
        const $btn = $('#contactSubmitBtn');
        const $status = $('#contactStatus');

        const name = $('#senderName').val().trim();
        const email = $('#senderEmail').val().trim();
        const subject = $('#messageSubject').val().trim();
        const message = $('#messageContent').val().trim();
        const honey = $('input[name="_honey"]').val();

        if (!name || !email || !subject || !message) {
            $status.html(`
                <div class="glass-alert alert-warning">
                    <i class="fas fa-exclamation-circle text-warning mr-2"></i>
                    Please fill out all required fields before submitting.
                </div>
            `).slideDown();
            return;
        }

        // Detect if user is running locally via file:// protocol
        if (window.location.protocol === 'file:') {
            const mailtoUrl = `mailto:shafkatniloy119@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Hi Safkat,\n\n' + message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
            $status.html(`
                <div class="glass-alert alert-warning">
                    <i class="fas fa-info-circle text-warning mr-2"></i>
                    <strong>Viewing as local file:</strong> Browser security blocks direct web form API requests from <code>file:///</code> URLs. Run the project through a local web server (e.g. VS Code Live Server) or test on the live Netlify site.
                    <div class="mt-2">
                        <a href="${mailtoUrl}" class="btn btn-sm btn-primary rounded">
                            <i class="fas fa-paper-plane mr-1"></i> Send Directly via Email App
                        </a>
                    </div>
                </div>
            `).slideDown();
            return;
        }

        // Loading state
        $btn.prop('disabled', true);
        $btn.find('.btn-text').addClass('d-none');
        $btn.find('.btn-loading').removeClass('d-none');
        $status.slideUp();

        const payload = {
            name: name,
            email: email,
            _subject: `Portfolio Message from ${name}: ${subject}`,
            subject: subject,
            message: message,
            _honey: honey,
            _template: 'table'
        };

        fetch('https://formsubmit.co/ajax/shafkatniloy119@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.success === 'true' || data.success === true) {
                $status.html(`
                    <div class="glass-alert alert-success">
                        <i class="fas fa-check-circle text-success mr-2"></i>
                        <strong>Thank you, ${escapeHtml(name)}!</strong> Your message has been sent successfully. Safkat will get back to you at <em>${escapeHtml(email)}</em> as soon as possible.
                    </div>
                `).slideDown();
                $form[0].reset();
            } else {
                throw new Error(data.message || 'Submission was not completed.');
            }
        })
        .catch(function (err) {
            const mailtoUrl = `mailto:shafkatniloy119@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Hi Safkat,\n\n' + message + '\n\nFrom: ' + name + ' (' + email + ')')}`;
            $status.html(`
                <div class="glass-alert alert-warning">
                    <i class="fas fa-exclamation-triangle text-warning mr-2"></i>
                    <strong>Notice:</strong> ${escapeHtml(err.message || 'Unable to deliver message automatically right now.')}
                    <div class="mt-2">
                        <a href="${mailtoUrl}" class="btn btn-sm btn-primary rounded">
                            <i class="fas fa-envelope mr-1"></i> Click to Send via Your Email Client
                        </a>
                    </div>
                </div>
            `).slideDown();
        })
        .finally(function () {
            $btn.prop('disabled', false);
            $btn.find('.btn-text').removeClass('d-none');
            $btn.find('.btn-loading').addClass('d-none');
        });
    });

    // =============================================================
    // TRUE REFRACTIVE 3D LIQUID GLASS NORMAL-MAP ENGINE
    // (liquid-glass-ui skill architecture)
    // =============================================================
    function buildLiquidLensMap(width = 360, height = 68, bezelThickness = 22, targetId = 'liquid-lens-map') {
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(Math.round(width), 20);
        canvas.height = Math.max(Math.round(height), 20);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const imgData = ctx.createImageData(canvas.width, canvas.height);
        const data = imgData.data;

        const radius = canvas.height / 2;

        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                // Find distance to nearest inner pill spine point
                const spineX = Math.max(radius, Math.min(canvas.width - radius, x));
                const spineY = radius;

                const dx = x - spineX;
                const dy = y - spineY;
                const distFromSpine = Math.sqrt(dx * dx + dy * dy);

                // How close are we to the outer edge? (0 = inner flat zone, 1 = outer rim)
                const bezelStart = Math.max(0, radius - bezelThickness);
                let t = Math.max(0, Math.min(1, (distFromSpine - bezelStart) / bezelThickness));

                // Smooth cubic curve for realistic convex water lens curvature
                const curve = t * t * (3 - 2 * t);

                // Normal vector pointing outward
                const nx = distFromSpine > 0 ? dx / distFromSpine : 0;
                const ny = distFromSpine > 0 ? dy / distFromSpine : 0;

                // 128 is zero displacement. Push outward near edges:
                const r = Math.round(128 + nx * curve * 127);
                const g = Math.round(128 + ny * curve * 127);

                const idx = (y * canvas.width + x) * 4;
                data[idx] = r;     // X displacement (R channel)
                data[idx + 1] = g; // Y displacement (G channel)
                data[idx + 2] = 128;
                data[idx + 3] = 255;
            }
        }

        ctx.putImageData(imgData, 0, 0);
        const feImage = document.getElementById(targetId);
        if (feImage) {
            feImage.setAttribute('href', canvas.toDataURL('image/png'));
        }
    }

    function initLiquidGlassLenses() {
        const nav = document.querySelector('.custom-navbar');
        const navW = nav ? Math.round(nav.offsetWidth) : 800;
        const navH = nav ? Math.round(nav.offsetHeight) : 56;

        buildLiquidLensMap(Math.min(navW, 1140), Math.max(navH, 48), 20, 'liquid-lens-map');
        buildLiquidLensMap(120, 48, 16, 'liquid-lens-bar-map');
        buildLiquidLensMap(48, 48, 22, 'liquid-lens-orb-map');
    }

    // Initialize lenses on load and update on window resize
    initLiquidGlassLenses();
    let liquidResizeTimer;
    $(window).on('resize', function () {
        clearTimeout(liquidResizeTimer);
        liquidResizeTimer = setTimeout(initLiquidGlassLenses, 150);
    });
});
