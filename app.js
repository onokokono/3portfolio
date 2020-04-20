$(document).ready(function () {
    function init() {

        const slides = document.querySelectorAll('.slide');
        const pages = document.querySelectorAll('.page');
        const backgrounds = [
            'radial-gradient(#8A645F, #202125)',
            'radial-gradient(#64716F, #1D344F)',
            'radial-gradient(#616161, #2B2925)'
        ];
        //*Tracker
        let currentPageIndex = 0;
        let scrollSlideIndex = 0;

        slides.forEach((slide, index) => {
            slide.addEventListener('click', function () {
                changeDots(this);
                nextSlide(index);
                scrollSlideIndex = currentPageIndex;
            });
        });

        function changeDots(dot) {
            slides.forEach(slide => {
                slide.classList.remove('active');
            })
            dot.classList.add('active');
        }
        function nextSlide(pageIndex) {
            //Current and next pages.
            const nextPage = pages[pageIndex];
            const currentPage = pages[currentPageIndex];
            //Select Objects to animate.
            const nextLeft = nextPage.querySelector('.hero .model-left');
            const nextRight = nextPage.querySelector('.hero .model-right');
            const currentLeft = currentPage.querySelector('.hero .model-left')
            const currentRight = currentPage.querySelector('.hero .model-right');
            const portfolio = document.querySelector('.portfolio');
            //Selects texts
            const nextText = nextPage.querySelector('.details');
            const currentText = currentPage.querySelector('.details');
            //Animate
            const tl = new TimelineMax({
                onStart: function () { $('.slide').css('pointer-events', 'none') },
                onComplete: function () { $('.slide').css('pointer-events', 'all') }
            });
            tl.fromTo(currentLeft, .3, { y: '-10%' }, { y: '-100%' })
                .fromTo(currentRight, .3, { y: '10%' }, { y: '-100%' }, '-=.2')
                .to(portfolio, .3, { backgroundImage: backgrounds[pageIndex] })
                .fromTo(currentPage, .3, { opacity: 1, pointerEvents: 'all' }, { opacity: 0, pointerEvents: 'none' })
                .fromTo(nextPage, .3, { opacity: 0, pointerEvents: 'none' }, { opacity: 1, pointerEvents: 'all' })
                .fromTo(nextLeft, .3, { y: '-100%' }, { y: '-10%' }, '-=0.6')
                .fromTo(nextRight, 0.3, { y: '-100%' }, { y: '10%' }, '-=.8')
                .fromTo(nextText, 0.3, { x: '-30' }, { x: '0' })
                .set(nextLeft, { clearProps: 'all' })
                .set(nextRight, { clearProps: 'all' });
            //Change currentPage
            currentPageIndex = pageIndex;
        }

        document.addEventListener('wheel', throttle(scrollChange, 1500));
        //Mobile's don't have wheel event so its touchmove on mobile
        document.addEventListener('touchmove', throttle(scrollChange, 1500));

        function switchDots(dotNumber) {
            const slides = $('.slide');
            slides.removeClass('active');
            slides.eq(dotNumber).addClass('active');

            //slides[dotMumber].classList.add('active')
            //$(...)[index]      // gives you the DOM element at index
            //$(...).get(index)  // gives you the DOM element at index
            //$(...).eq(index)   // gives you the jQuery object of element at index
        }

        function scrollChange(e) {
            if (e.deltaY > 0) { scrollSlideIndex += 1; }
            else { scrollSlideIndex -= 1; }

            if (scrollSlideIndex > 2) { scrollSlideIndex = 0 }
            if (scrollSlideIndex < 0) { scrollSlideIndex = 2 }

            nextSlide(scrollSlideIndex);
            switchDots(scrollSlideIndex);
        }

        function throttle(func, limit) {
            let inThrottle
            return function () {
                const args = arguments
                const context = this
                if (!inThrottle) {
                    func.apply(context, args)
                    inThrottle = true
                    setTimeout(() => inThrottle = false, limit)
                }
            }
        }

        const hamburger = document.querySelector('.menu');
        const hamburgerLines = document.querySelectorAll('.menu line');
        const navOpen = document.querySelector('.nav-open');
        const contract = document.querySelector('.contact');
        const social = document.querySelector('.social');
        const logo = document.querySelector('.logo');
        const tl = new TimelineMax({ paused: true, reversed: true });

        tl.to(navOpen, .5, { y: 0 })
            .fromTo(contract, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 })
            .fromTo(social, .5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=.5')
            .fromTo(logo, .2, { color: 'white' }, { color: 'black' }, '-=.5')
            .fromTo(hamburgerLines, .2, { stroke: 'white' }, { stroke: 'black' }, '-=.5')

        hamburger.addEventListener('click', () => {
            tl.reversed() ? tl.play() : tl.reverse();
        })
    }


    init();
})

