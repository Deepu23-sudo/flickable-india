/* =========================================================
   FLICKABLE INDIA
   PREMIUM MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader =
        document.getElementById("preloader");

    if (preloader) {

        window.addEventListener("load", function () {

            setTimeout(function () {

                preloader.classList.add("hide");

            }, 500);

        });

    }


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header =
        document.getElementById("header");


    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader
    );

    updateHeader();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const closeMenu =
        document.getElementById("closeMenu");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (menuBtn && mobileMenu) {

        menuBtn.addEventListener(
            "click",
            function () {

                mobileMenu.classList.add("open");

                document.body.classList.add(
                    "menu-open"
                );

            }
        );

    }


    if (closeMenu && mobileMenu) {

        closeMenu.addEventListener(
            "click",
            function () {

                mobileMenu.classList.remove("open");

                document.body.classList.remove(
                    "menu-open"
                );

            }
        );

    }


    document
        .querySelectorAll(".mobile-links a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (mobileMenu) {

                        mobileMenu.classList.remove(
                            "open"
                        );

                    }

                    document.body.classList.remove(
                        "menu-open"
                    );

                }
            );

        });


    /* =====================================================
       HERO SLIDER
       AUTO CHANGE EVERY 5 SECONDS
    ===================================================== */

    const heroSlides =
        document.querySelectorAll(".hero-slide");

    const heroDots =
        document.querySelectorAll(".hero-dot");

    const heroNext =
        document.getElementById("heroNext");

    const heroPrev =
        document.getElementById("heroPrev");

    const hero =
        document.querySelector(".hero");


    let currentSlide = 0;

    let heroTimer = null;


    if (heroSlides.length > 0) {


        function showHeroSlide(index) {

            if (index >= heroSlides.length) {

                index = 0;

            }

            if (index < 0) {

                index =
                    heroSlides.length - 1;

            }


            currentSlide = index;


            heroSlides.forEach(
                function (slide) {

                    slide.classList.remove(
                        "active"
                    );

                }
            );


            heroDots.forEach(
                function (dot) {

                    dot.classList.remove(
                        "active"
                    );

                }
            );


            heroSlides[currentSlide]
                .classList.add("active");


            if (heroDots[currentSlide]) {

                heroDots[currentSlide]
                    .classList.add("active");

            }

        }


        function startHeroTimer() {

            clearInterval(heroTimer);


            heroTimer = setInterval(
                function () {

                    showHeroSlide(
                        currentSlide + 1
                    );

                },
                5000
            );

        }


        function restartHeroTimer() {

            clearInterval(heroTimer);

            startHeroTimer();

        }


        /* Next */

        if (heroNext) {

            heroNext.addEventListener(
                "click",
                function () {

                    showHeroSlide(
                        currentSlide + 1
                    );

                    restartHeroTimer();

                }
            );

        }


        /* Previous */

        if (heroPrev) {

            heroPrev.addEventListener(
                "click",
                function () {

                    showHeroSlide(
                        currentSlide - 1
                    );

                    restartHeroTimer();

                }
            );

        }


        /* Dots */

        heroDots.forEach(
            function (dot, index) {

                dot.addEventListener(
                    "click",
                    function () {

                        showHeroSlide(index);

                        restartHeroTimer();

                    }
                );

            }
        );


        /* Initial */

        showHeroSlide(0);

        startHeroTimer();


        /* =================================================
           HERO SWIPE
        ================================================= */

        let touchStartX = 0;

        let touchEndX = 0;


        if (hero) {

            hero.addEventListener(
                "touchstart",
                function (event) {

                    touchStartX =
                        event.changedTouches[0]
                            .screenX;

                },
                { passive: true }
            );


            hero.addEventListener(
                "touchend",
                function (event) {

                    touchEndX =
                        event.changedTouches[0]
                            .screenX;


                    const distance =
                        touchEndX - touchStartX;


                    if (distance < -50) {

                        showHeroSlide(
                            currentSlide + 1
                        );

                        restartHeroTimer();

                    }


                    if (distance > 50) {

                        showHeroSlide(
                            currentSlide - 1
                        );

                        restartHeroTimer();

                    }

                },
                { passive: true }
            );

        }

    }


    /* =====================================================
       1. ANIMATED CUSTOM CURSOR
    ===================================================== */

    if (
        window.innerWidth > 768 &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        const cursor =
            document.createElement("div");

        cursor.className =
            "custom-cursor";


        const cursorDot =
            document.createElement("div");

        cursorDot.className =
            "custom-cursor-dot";


        document.body.appendChild(cursor);

        document.body.appendChild(cursorDot);


        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;


        let ringX = mouseX;

        let ringY = mouseY;


        document.addEventListener(
            "mousemove",
            function (event) {

                mouseX = event.clientX;

                mouseY = event.clientY;


                cursorDot.style.left =
                    mouseX + "px";

                cursorDot.style.top =
                    mouseY + "px";

            }
        );


        function animateCursor() {

            ringX +=
                (mouseX - ringX) * 0.15;

            ringY +=
                (mouseY - ringY) * 0.15;


            cursor.style.left =
                ringX + "px";

            cursor.style.top =
                ringY + "px";


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        document
            .querySelectorAll(
                "a, button, input, textarea, select"
            )
            .forEach(function (element) {


                element.addEventListener(
                    "mouseenter",
                    function () {

                        cursor.classList.add(
                            "hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    function () {

                        cursor.classList.remove(
                            "hover"
                        );

                    }
                );

            });


        document.addEventListener(
            "mousedown",
            function () {

                cursor.classList.add("click");

            }
        );


        document.addEventListener(
            "mouseup",
            function () {

                cursor.classList.remove("click");

            }
        );

    }


    /* =====================================================
       2. MAGNETIC BUTTONS
    ===================================================== */

    if (window.innerWidth > 768) {

        const magneticButtons =
            document.querySelectorAll(
                ".primary-btn, .outline-btn, .watch-btn, .social-follow, .episode-link"
            );


        magneticButtons.forEach(
            function (button) {

                button.classList.add("magnetic");


                button.addEventListener(
                    "mousemove",
                    function (event) {

                        const rect =
                            button.getBoundingClientRect();


                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;


                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;


                        const moveX =
                            x * 0.18;


                        const moveY =
                            y * 0.18;


                        button.style.transform =
                            "translate(" +
                            moveX +
                            "px, " +
                            moveY +
                            "px)";

                    }
                );


                button.addEventListener(
                    "mouseleave",
                    function () {

                        button.style.transform =
                            "translate(0, 0)";

                    }
                );

            }
        );

    }


    /* =====================================================
       3. SCROLL REVEAL
    ===================================================== */


    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-content, " +
            ".about-card, " +
            ".vision-card, " +
            ".host-image-wrapper, " +
            ".host-content, " +
            ".service-card, " +
            ".episode-card, " +
            ".featured-image, " +
            ".featured-content, " +
            ".team-card, " +
            ".social-card, " +
            ".gallery-coming, " +
            ".contact-info, " +
            ".contact-card"
        );


    revealElements.forEach(
        function (element, index) {

            element.classList.add("reveal");

            element.style.transitionDelay =
                (index % 4) * 0.08 + "s";

        }
    );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList.add(
                                        "active"
                                    );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(element);

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(
            function (section) {

                const sectionTop =
                    section.offsetTop - 180;


                const sectionHeight =
                    section.offsetHeight;


                if (
                    window.scrollY >=
                    sectionTop &&

                    window.scrollY <
                    sectionTop +
                    sectionHeight
                ) {

                    currentSection =
                        section.getAttribute(
                            "id"
                        );

                }

            }
        );


        navLinks.forEach(
            function (link) {

                link.classList.remove(
                    "active"
                );


                if (
                    link.getAttribute("href") ===
                    "#" + currentSection
                ) {

                    link.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateBackToTop
        );


        updateBackToTop();


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            function (anchor) {

                anchor.addEventListener(
                    "click",
                    function (event) {

                        const targetId =
                            this.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        let target;


                        try {

                            target =
                                document.querySelector(
                                    targetId
                                );

                        } catch (error) {

                            return;

                        }


                        if (!target) return;


                        event.preventDefault();


                        const headerElement =
                            document.getElementById(
                                "header"
                            );


                        const headerHeight =
                            headerElement
                                ? headerElement
                                    .offsetHeight
                                : 0;


                        const targetPosition =
                            target.offsetTop -
                            headerHeight;


                        window.scrollTo({

                            top: Math.max(
                                0,
                                targetPosition
                            ),

                            behavior: "smooth"

                        });


                        if (mobileMenu) {

                            mobileMenu.classList.remove(
                                "open"
                            );

                        }

                        document.body.classList.remove(
                            "menu-open"
                        );

                    }
                );

            }
        );


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(
            function (image) {

                image.addEventListener(
                    "error",
                    function () {

                        console.warn(
                            "Image not found:",
                            image.getAttribute(
                                "src"
                            )
                        );

                        image.classList.add(
                            "image-error"
                        );

                    }
                );


                image.addEventListener(
                    "load",
                    function () {

                        image.classList.add(
                            "image-loaded"
                        );

                    }
                );

            }
        );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById(
            "currentYear"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mobileMenu
            ) {

                mobileMenu.classList.remove(
                    "open"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       VISIBILITY CHANGE
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (!heroSlides.length) {
                return;
            }


            if (document.hidden) {

                clearInterval(heroTimer);

            } else {

                if (typeof startHeroTimer === "function") {
                    startHeroTimer();
                }

            }

        }
    );


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c FLICKABLE INDIA ",
        "background:#ff006e;color:white;font-size:16px;font-weight:bold;padding:8px 15px;border-radius:5px;"
    );

    console.log(
        "%c Premium Website Loaded ✓ ",
        "color:#ff006e;font-size:13px;font-weight:bold;"
    );

});
/* =========================================================
   CINEMATIC WEBSITE ANIMATION CONTROLLER
========================================================= */

(function () {

    /* PAGE READY */

    window.addEventListener("load", function () {

        document.body.classList.add("page-ready");

    });


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        if (documentHeight <= 0) return;

        const progress =
            (scrollTop / documentHeight) * 100;

        document.body.style.setProperty(
            "--scroll-progress",
            progress + "%"
        );

    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* =====================================================
       STATS ENTRANCE + COUNT UP
    ===================================================== */

    const stats =
        document.querySelectorAll(".stat-item");


    if ("IntersectionObserver" in window) {

        const statsObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const stat =
                                entry.target;


                            stat.classList.add(
                                "stats-visible"
                            );


                            const number =
                                stat.querySelector(
                                    "strong"
                                );


                            if (number &&
                                !number.dataset.counted
                            ) {

                                number.dataset.counted =
                                    "true";


                                const original =
                                    number.textContent.trim();


                                const match =
                                    original.match(
                                        /^(\d+)(.*)$/
                                    );


                                if (match) {

                                    const target =
                                        parseInt(
                                            match[1],
                                            10
                                        );

                                    const suffix =
                                        match[2];


                                    let value = 0;

                                    const duration =
                                        1000;

                                    const start =
                                        performance.now();


                                    function countUp(
                                        timestamp
                                    ) {

                                        const progress =
                                            Math.min(
                                                (timestamp -
                                                    start) /
                                                duration,
                                                1
                                            );


                                        const eased =
                                            1 -
                                            Math.pow(
                                                1 -
                                                progress,
                                                3
                                            );


                                        value =
                                            Math.floor(
                                                target *
                                                eased
                                            );


                                        number.textContent =
                                            value +
                                            suffix;


                                        if (
                                            progress < 1
                                        ) {

                                            requestAnimationFrame(
                                                countUp
                                            );

                                        } else {

                                            number.textContent =
                                                original;

                                        }

                                    }


                                    requestAnimationFrame(
                                        countUp
                                    );

                                }

                            }


                            statsObserver.unobserve(
                                stat
                            );

                        }
                    );

                },
                {
                    threshold: .35
                }
            );


        stats.forEach(
            function (stat, index) {

                stat.style.animationDelay =
                    (index * .12) + "s";

                statsObserver.observe(stat);

            }
        );

    }


    /* =====================================================
       CARD STAGGER DELAYS
    ===================================================== */

    const cardGroups = [

        ".service-card",
        ".episode-card",
        ".team-card",
        ".social-card",
        ".vision-card"

    ];


    cardGroups.forEach(
        function (selector) {

            document
                .querySelectorAll(selector)
                .forEach(
                    function (card, index) {

                        card.style.setProperty(
                            "--card-delay",
                            (index * .08) + "s"
                        );

                    }
                );

        }
    );


    /* =====================================================
       MOUSE PARALLAX ON HERO
    ===================================================== */

    const hero =
        document.querySelector(".hero");


    if (
        hero &&
        window.innerWidth > 768 &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        const heroContent =
            hero.querySelector(
                ".hero-content"
            );


        hero.addEventListener(
            "mousemove",
            function (event) {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;


                if (heroContent) {

                    heroContent.style.transform =
                        "translate(" +
                        x * 8 +
                        "px, " +
                        y * 8 +
                        "px)";

                }

            }
        );


        hero.addEventListener(
            "mouseleave",
            function () {

                if (heroContent) {

                    heroContent.style.transform =
                        "translate(0,0)";

                }

            }
        );

    }


    /* =====================================================
       CURSOR TRAIL DOTS
    ===================================================== */

    if (
        window.innerWidth > 768 &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        const trail = [];

        const trailCount = 8;


        for (
            let i = 0;
            i < trailCount;
            i++
        ) {

            const dot =
                document.createElement("span");


            dot.style.position =
                "fixed";

            dot.style.width =
                "4px";

            dot.style.height =
                "4px";

            dot.style.borderRadius =
                "50%";

            dot.style.background =
                "rgba(255,0,110," +
                (0.35 -
                    i * 0.035) +
                ")";

            dot.style.pointerEvents =
                "none";

            dot.style.zIndex =
                "999990";

            dot.style.transform =
                "translate(-50%,-50%)";

            dot.style.transition =
                "opacity .3s ease";


            document.body.appendChild(dot);

            trail.push({
                element: dot,
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            });

        }


        let trailMouseX =
            window.innerWidth / 2;

        let trailMouseY =
            window.innerHeight / 2;


        document.addEventListener(
            "mousemove",
            function (event) {

                trailMouseX =
                    event.clientX;

                trailMouseY =
                    event.clientY;

            }
        );


        function animateTrail() {

            let previousX =
                trailMouseX;

            let previousY =
                trailMouseY;


            trail.forEach(
                function (item, index) {

                    const speed =
                        index === 0
                            ? .25
                            : .16;


                    item.x +=
                        (previousX -
                            item.x) *
                        speed;


                    item.y +=
                        (previousY -
                            item.y) *
                        speed;


                    item.element.style.left =
                        item.x + "px";


                    item.element.style.top =
                        item.y + "px";


                    previousX =
                        item.x;

                    previousY =
                        item.y;

                }
            );


            requestAnimationFrame(
                animateTrail
            );

        }


        animateTrail();

    }

})();
/* =========================================================
   THIN CURSOR TRAIL
========================================================= */

(function () {

    if (
        window.innerWidth <= 768 ||
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    /* Cursor dot */

    const dot =
        document.createElement("div");

    dot.className = "cursor-dot";

    document.body.appendChild(dot);


    /* Trail line */

    const line =
        document.createElement("div");

    line.className = "cursor-line";

    document.body.appendChild(line);


    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;


    /* Mouse movement */

    document.addEventListener(
        "mousemove",
        function (event) {

            mouseX = event.clientX;
            mouseY = event.clientY;

        }
    );


    function animateCursor() {

        /* Smooth follow */

        currentX +=
            (mouseX - currentX) * 0.22;

        currentY +=
            (mouseY - currentY) * 0.22;


        /* Cursor dot */

        dot.style.left =
            currentX + "px";

        dot.style.top =
            currentY + "px";


        /* Distance */

        const dx =
            mouseX - currentX;

        const dy =
            mouseY - currentY;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        /* Angle */

        const angle =
            Math.atan2(dy, dx) *
            (180 / Math.PI);


        /* Thin line */

        line.style.left =
            currentX + "px";

        line.style.top =
            currentY + "px";

        line.style.width =
            Math.min(distance, 80) + "px";

        line.style.transform =
            "rotate(" +
            angle +
            "deg)";


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    /* Hide when leaving window */

    document.addEventListener(
        "mouseleave",
        function () {

            dot.style.opacity = "0";
            line.style.opacity = "0";

        }
    );


    document.addEventListener(
        "mouseenter",
        function () {

            dot.style.opacity = "1";
            line.style.opacity = "0.8";

        }
    );

})();
/* =========================================================
   GALLERY IMAGE VIEWER
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const items =
        document.querySelectorAll(".gallery-item");

    const lightbox =
        document.getElementById("galleryLightbox");

    const viewer =
        document.getElementById("galleryViewer");

    const closeBtn =
        document.getElementById("galleryClose");

    const prevBtn =
        document.getElementById("galleryPrev");

    const nextBtn =
        document.getElementById("galleryNext");


    let current = 0;


    /* OPEN IMAGE */

    function openImage(index) {

        current = index;

        const image =
            items[current].querySelector("img");


        viewer.innerHTML = "";


        const largeImage =
            document.createElement("img");


        largeImage.src =
            image.getAttribute("src");


        largeImage.alt =
            image.alt;


        viewer.appendChild(largeImage);


        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    /* CLOSE */

    function closeImage() {

        lightbox.classList.remove("active");

        viewer.innerHTML = "";

        document.body.style.overflow = "";
    }


    /* NEXT */

    function nextImage() {

        current++;

        if (current >= items.length) {
            current = 0;
        }

        openImage(current);
    }


    /* PREVIOUS */

    function previousImage() {

        current--;

        if (current < 0) {
            current = items.length - 1;
        }

        openImage(current);
    }


    /* CLICK PHOTO */

    items.forEach(function (item, index) {

        item.addEventListener("click", function () {

            openImage(index);

        });

    });


    /* BUTTONS */

    closeBtn.addEventListener(
        "click",
        closeImage
    );


    nextBtn.addEventListener(
        "click",
        nextImage
    );


    prevBtn.addEventListener(
        "click",
        previousImage
    );


    /* CLICK OUTSIDE */

    lightbox.addEventListener(
        "click",
        function (event) {

            if (event.target === lightbox) {

                closeImage();

            }

        }
    );


    /* KEYBOARD */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {
                closeImage();
            }


            if (event.key === "ArrowRight") {
                nextImage();
            }


            if (event.key === "ArrowLeft") {
                previousImage();
            }

        }
    );

});
/* =========================================================
   WELCOME ROLE POPUP
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const popup =
        document.getElementById("rolePopup");

    const closeButton =
        document.getElementById("rolePopupClose");

    const options =
        document.querySelectorAll(".role-option");


    /* =====================================================
       OPEN POPUP
    ===================================================== */

    function openRolePopup() {

        setTimeout(function () {

            popup.classList.add("active");

            document.body.classList.add(
                "role-popup-open"
            );

        }, 500);

    }


    /* =====================================================
       CLOSE POPUP
    ===================================================== */

    function closeRolePopup() {

        popup.classList.add("closing");

        popup.classList.remove("active");


        setTimeout(function () {

            popup.classList.remove("closing");

            document.body.classList.remove(
                "role-popup-open"
            );

        }, 500);

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    closeButton.addEventListener(
        "click",
        closeRolePopup
    );


    /* =====================================================
       BACKDROP CLICK
    ===================================================== */

    const backdrop =
        popup.querySelector(
            ".role-popup-backdrop"
        );


    backdrop.addEventListener(
        "click",
        closeRolePopup
    );


    /* =====================================================
       ROLE OPTIONS
    ===================================================== */

    options.forEach(function (option) {

        option.addEventListener(
            "click",
            function () {

                const role =
                    option.getAttribute(
                        "data-role"
                    );


                /* -----------------------------------------
                   GUEST
                ----------------------------------------- */

                if (role === "guest") {

                    closeRolePopup();


                    /*
                     * Yahan apna Guest page/section
                     * ka link laga sakte ho.
                     *
                     * Example:
                     *
                     * window.location.href =
                     * "guest.html";
                     */

                }


                /* -----------------------------------------
                   SUBSCRIBER
                ----------------------------------------- */

                if (role === "subscriber") {

                    closeRolePopup();


                    /*
                     * Yahan apna Subscriber page/section
                     * ka link laga sakte ho.
                     *
                     * Example:
                     *
                     * window.location.href =
                     * "subscribe.html";
                     */

                }

            }
        );

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                popup.classList.contains("active")
            ) {

                closeRolePopup();

            }

        }
    );


    /* =====================================================
       START POPUP
    ===================================================== */

    openRolePopup();

});/* =========================================================
   GUEST APPLICATION - FORMSPREE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("guestForm");
    const submitButton = document.getElementById("guestSubmit");

    if (!form) return;

    form.addEventListener("submit", function () {

        const buttonText =
            submitButton.querySelector("span");

        buttonText.textContent = "SUBMITTING...";

        submitButton.disabled = true;

    });

});
/* =========================================================
   ROLE POPUP — SUBSCRIBER / GUEST ACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const rolePopup = document.getElementById("rolePopup");
    const roleOptions = document.querySelectorAll(".role-option");
    const guestForm = document.getElementById("guest-application");

    roleOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            const selectedRole = this.getAttribute("data-role");


            /* =========================================
               SUBSCRIBER
               → YouTube Channel
            ========================================= */

            if (selectedRole === "subscriber") {

                window.open(
                    "https://www.youtube.com/@Flickable_india",
                    "_blank"
                );

            }


            /* =========================================
               GUEST
               → Guest Application Form
            ========================================= */

            if (selectedRole === "guest") {

                // Close popup
                if (rolePopup) {
                    rolePopup.classList.remove("active");
                }

                // Scroll to guest form
                if (guestForm) {

                    setTimeout(function () {

                        guestForm.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }, 200);

                }

            }

        });

    });

});

/* =========================================================
   RESPONSIVE EFFECT GUARD
   Desktop-only cursor/magnetic effects should never interfere
   with touch/mobile layouts after a resize.
========================================================= */
(function () {
    let lastMobileState = window.innerWidth <= 768;

    function syncResponsiveState() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile !== lastMobileState) {
            lastMobileState = isMobile;

            document.body.classList.toggle(
                "responsive-mobile",
                isMobile
            );

            /* Reset transforms left by magnetic/desktop effects. */
            if (isMobile) {
                document
                    .querySelectorAll(".magnetic")
                    .forEach(function (element) {
                        element.style.transform = "";
                    });
            }
        }
    }

    window.addEventListener("resize", syncResponsiveState, {
        passive: true
    });

    syncResponsiveState();
})();

/* =========================================================
   GALLERY LIGHTBOX
   IMAGES + VIDEOS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const galleryItems = document.querySelectorAll(".gallery-item");

    const lightbox = document.getElementById("galleryLightbox");
    const viewer = document.getElementById("galleryViewer");

    const closeBtn = document.getElementById("galleryClose");
    const prevBtn = document.getElementById("galleryPrev");
    const nextBtn = document.getElementById("galleryNext");

    let currentIndex = 0;


    /* =========================================
       OPEN ITEM
    ========================================= */

    function openGallery(index) {

        currentIndex = index;

        const item = galleryItems[currentIndex];

        if (!item) return;

        viewer.innerHTML = "";


        /* IMAGE */

        const image = item.querySelector("img");

        if (image) {

            const img = document.createElement("img");

            img.src = image.src;
            img.alt = image.alt || "Flickable India Gallery";

            viewer.appendChild(img);

        }


        /* VIDEO */

        const video = item.querySelector("video");

        if (video) {

            const videoPlayer = document.createElement("video");

            videoPlayer.src = video.currentSrc || video.src;

            videoPlayer.controls = true;
            videoPlayer.autoplay = true;
            videoPlayer.playsInline = true;

            viewer.appendChild(videoPlayer);

            videoPlayer.play().catch(() => {});

        }


        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    /* =========================================
       CLOSE
    ========================================= */

    function closeGallery() {

        const activeVideo = viewer.querySelector("video");

        if (activeVideo) {
            activeVideo.pause();
        }

        viewer.innerHTML = "";

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    /* =========================================
       NEXT
    ========================================= */

    function nextGallery() {

        currentIndex++;

        if (currentIndex >= galleryItems.length) {
            currentIndex = 0;
        }

        openGallery(currentIndex);

    }


    /* =========================================
       PREVIOUS
    ========================================= */

    function previousGallery() {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = galleryItems.length - 1;
        }

        openGallery(currentIndex);

    }


    /* =========================================
       ITEM CLICK
    ========================================= */

    galleryItems.forEach(function (item, index) {

        item.addEventListener("click", function () {

            openGallery(index);

        });

    });


    /* =========================================
       BUTTONS
    ========================================= */

    closeBtn.addEventListener("click", closeGallery);

    nextBtn.addEventListener("click", nextGallery);

    prevBtn.addEventListener("click", previousGallery);


    /* =========================================
       CLICK OUTSIDE
    ========================================= */

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeGallery();
        }

    });


    /* =========================================
       KEYBOARD
    ========================================= */

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("active")) return;


        if (event.key === "Escape") {
            closeGallery();
        }


        if (event.key === "ArrowRight") {
            nextGallery();
        }


        if (event.key === "ArrowLeft") {
            previousGallery();
        }

    });

});