/*!
=========================================================
* Meyawo Landing page
=========================================================

* Copyright: 2019 DevCRUD (https://devcrud.com)
* Licensed: (https://devcrud.com/licenses)
* Coded by www.devcrud.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// smooth scroll
$(document).ready(function () {
    $(".navbar .nav-link").on('click', function (event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function () {
                window.location.hash = hash;
            });
        }
    });
});

// navbar toggle
$('#nav-toggle').click(function () {
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});

// About Me Slideshow
$(document).ready(function () {
    const images = [
        'assets/imgs/m4.jpg',
        'assets/imgs/m1.jpg',
        'assets/imgs/m3.png'
    ];

    let currentIndex = 0;
    const $aboutImg = $('#aboutImage');
    const $dots = $('.dot');

    function updateDots(index) {
        $dots.removeClass('active');
        $dots.eq(index).addClass('active');
    }

    if ($aboutImg.length) {
        setInterval(function () {
            $aboutImg.addClass('fade-out');

            setTimeout(function () {
                currentIndex = (currentIndex + 1) % images.length;
                $aboutImg.attr('src', images[currentIndex]);
                updateDots(currentIndex);
                $aboutImg.removeClass('fade-out');
            }, 500); // Wait for fade out transition
        }, 3000); // Change every 3 seconds
    }
});