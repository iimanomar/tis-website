/* =========================================================
   TIS EAST AFRICA
   Main Interaction Script
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;
    const menuButton = document.querySelector(".menu-button");


    /* =====================================================
       FLOATING SITE NAVIGATION
    ===================================================== */

    const floatingNav = document.createElement("div");

    floatingNav.className = "floating-nav";

    floatingNav.innerHTML = `
        <a
            href="index.html"
            class="floating-brand"
            aria-label="Return to TIS East Africa home"
        >
            <img src="../images/TIS-Logo.png" alt="TIS">

            <span>
                CONTROL<br>
                EVERYTHING
            </span>
        </a>

        <div class="floating-line"></div>

        <button
            class="floating-menu-button"
            aria-label="Open navigation"
            aria-expanded="false"
        >
            <span></span>
            <span></span>
        </button>
    `;

    body.appendChild(floatingNav);
    /* =====================================================
   GLOBAL TRY TIS EXPERIENCE TRIGGER
===================================================== */

    const tisDemoTrigger = document.createElement("button");

    tisDemoTrigger.className = "tis-demo-trigger";
    tisDemoTrigger.type = "button";

    tisDemoTrigger.setAttribute(
        "aria-label",
        "Try the TIS interactive experience"
    );

    tisDemoTrigger.innerHTML = `
    <span class="tis-demo-trigger-label">
        <span>Interactive demo</span>
        <strong>Try TIS</strong>
    </span>

    <span
        class="tis-demo-trigger-phone"
        aria-hidden="true"
    >
        <span class="tis-demo-trigger-screen">
            <strong>TIS</strong>
        </span>
    </span>
`;

    body.appendChild(tisDemoTrigger);


    /* =====================================================
       FULL SCREEN MENU
    ===================================================== */

    const menu = document.createElement("div");

    menu.className = "site-menu";

    menu.innerHTML = `

        <div class="menu-background"></div>

        <div class="menu-top">

            <a
                href="index.html"
                class="menu-logo"
                aria-label="TIS East Africa home"
            >
                <img src="../images/TIS-Logo.png" alt="TIS">
            </a>

            <button
                class="menu-close"
                aria-label="Close navigation"
            >
                <span></span>
                <span></span>
            </button>

        </div>


        <div class="menu-content">

            <div class="menu-label">
                Explore
            </div>


            <nav class="menu-links">

    <a href="solutions.html">
        <span>01</span>
        <strong>Solutions</strong>
        <i>↗</i>
    </a>

    <a href="products.html">
        <span>02</span>
        <strong>Products</strong>
        <i>↗</i>
    </a>

    <a href="projects.html">
        <span>03</span>
        <strong>Projects</strong>
        <i>↗</i>
    </a>

    <a href="partner.html">
        <span>04</span>
        <strong>Partners</strong>
        <i>↗</i>
    </a>

    <a href="about.html">
        <span>05</span>
        <strong>About</strong>
        <i>↗</i>
    </a>

</nav>


            <div class="menu-contact">

                <p>
                    Have a project in mind?
                </p>

                <a href="contact.html">
                    Start a project
                    <span>↗</span>
                </a>

            </div>

        </div>


        <div class="menu-footer">

            <div>
                Nairobi · Kenya
            </div>

            <div class="menu-socials">
                <a href="#">Instagram</a>
                <a href="#">Facebook</a>
            </div>

        </div>

    `;

    body.appendChild(menu);


    const floatingMenuButton =
        document.querySelector(".floating-menu-button");

    const menuClose =
        document.querySelector(".menu-close");


    /* =====================================================
       MENU FUNCTIONS
    ===================================================== */

    function openMenu() {

        body.classList.add("menu-open");

        if (floatingMenuButton) {
            floatingMenuButton.setAttribute(
                "aria-expanded",
                "true"
            );
        }

    }


    function closeMenu() {

        body.classList.remove("menu-open");

        if (floatingMenuButton) {
            floatingMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    }


    if (menuButton) {
        menuButton.addEventListener(
            "click",
            openMenu
        );
    }


    if (floatingMenuButton) {
        floatingMenuButton.addEventListener(
            "click",
            openMenu
        );
    }


    if (menuClose) {
        menuClose.addEventListener(
            "click",
            closeMenu
        );
    }


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    /* =====================================================
       CLOSE MENU WHEN LINK IS CLICKED
    ===================================================== */

    const menuLinks =
        menu.querySelectorAll("a");

    menuLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /* =====================================================
       FLOATING NAV SCROLL BEHAVIOUR
    ===================================================== */

    let lastScrollY = window.scrollY;


    function updateFloatingNavigation() {

        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        /*
            Hide floating navigation on the hero.
            Reveal after leaving the hero.
        */

        if (scrollY > viewportHeight * 0.72) {

            floatingNav.classList.add("visible");

        } else {

            floatingNav.classList.remove("visible");

        }


        /*
            Fade slightly when scrolling downward.
            Restore when user slows / scrolls upward.
        */

        if (
            scrollY > lastScrollY &&
            scrollY > viewportHeight
        ) {

            floatingNav.classList.add("quiet");

        } else {

            floatingNav.classList.remove("quiet");

        }


        lastScrollY = Math.max(scrollY, 0);

    }


    window.addEventListener(
        "scroll",
        updateFloatingNavigation,
        { passive: true }
    );

    updateFloatingNavigation();


    /* =====================================================
       FLOATING NAV COLOUR AWARENESS

       Detect whether the nav is currently over a light
       section and swap its appearance automatically.
    ===================================================== */

    const lightSections =
        document.querySelectorAll(".section-light");


    function updateFloatingTheme() {

        const sampleY = 100;

        let overLightSection = false;

        lightSections.forEach(section => {

            const rect =
                section.getBoundingClientRect();

            if (
                rect.top <= sampleY &&
                rect.bottom >= sampleY
            ) {

                overLightSection = true;

            }

        });


        floatingNav.classList.toggle(
            "on-light",
            overLightSection
        );

    }


    window.addEventListener(
        "scroll",
        updateFloatingTheme,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        updateFloatingTheme
    );

    updateFloatingTheme();


    /* =====================================================
       REVEAL ELEMENTS ON SCROLL
    ===================================================== */

    const revealTargets =
        document.querySelectorAll(
            ".section-number, .intro-title, .intro-copy, " +
            ".experience-heading h2, .solution-item, " +
            ".projects-header, .project-card, " +
            ".visit-content, .partner-cta-content"
        );


    revealTargets.forEach(element => {
        element.classList.add("reveal");
    });


    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "revealed"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }

        );


    revealTargets.forEach(element => {
        revealObserver.observe(element);
    });


});
/* =========================================================
   MOBILE-SAFE EXTERNAL ARROWS
   Replaces ↗ text so iOS cannot render it as an emoji
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("i, span").forEach((element) => {

        if (element.textContent.trim() === "↗") {

            element.textContent = "";
            element.classList.add("css-arrow");

        }

    });

});