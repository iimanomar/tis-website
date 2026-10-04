/* =========================================================
   TIS EAST AFRICA
   Main Interaction Script
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body = document.body;
    const header = document.querySelector(".site-header");
    const menuButton = document.querySelector(".menu-button");

    const systemButtons = document.querySelectorAll(".system");
    const systemTitle = document.getElementById("system-title");
    const systemDescription = document.getElementById("system-description");
    const systemStatus = document.querySelector(".system-status");
    const experienceBackground = document.querySelector(".experience-background");


    /* =====================================================
       INTERACTIVE TIS EXPERIENCE
    ===================================================== */

    const systems = {

        lighting: {
            number: "01",
            title: "Lighting",
            description:
                "Set the atmosphere without thinking about it. One touch transforms the entire space.",
            filter: "brightness(0.78) saturate(1.05)"
        },

        climate: {
            number: "02",
            title: "Climate",
            description:
                "Comfort that adjusts around you. Control temperature and climate throughout your space.",
            filter: "brightness(0.92) saturate(0.85) hue-rotate(8deg)"
        },

        curtains: {
            number: "03",
            title: "Curtains",
            description:
                "Natural light, privacy and atmosphere move with you throughout the day.",
            filter: "brightness(0.58) contrast(1.08)"
        },

        security: {
            number: "04",
            title: "Security",
            description:
                "See, control and protect your space from one intelligent system — wherever you are.",
            filter: "brightness(0.65) saturate(0.7) contrast(1.15)"
        },

        entertainment: {
            number: "05",
            title: "Entertainment",
            description:
                "Music, television and home cinema become part of the architecture — not an afterthought.",
            filter: "brightness(0.68) saturate(1.15)"
        },

        energy: {
            number: "06",
            title: "Energy",
            description:
                "Understand how your space consumes energy and manage it more intelligently.",
            filter: "brightness(0.8) saturate(0.75)"
        }

    };


    systemButtons.forEach(button => {

        button.addEventListener("click", () => {

            const systemName = button.dataset.system;
            const selectedSystem = systems[systemName];

            if (!selectedSystem) return;

            systemButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            if (systemTitle) {
                systemTitle.textContent = selectedSystem.title;
            }

            if (systemDescription) {
                systemDescription.textContent = selectedSystem.description;
            }

            if (systemStatus) {
                systemStatus.textContent =
                    `SYSTEM / ${selectedSystem.number}`;
            }

            /* Keep original architectural image untouched */
            if (experienceBackground) {
                experienceBackground.style.filter = "";
            }

        });

    });


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

                <a href="index.html#projects">
                    <span>02</span>
                    <strong>Projects</strong>
                    <i>↗</i>
                </a>

                <a href="index.html#experience">
                    <span>03</span>
                    <strong>Experience</strong>
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
                <a href="#">LinkedIn</a>
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