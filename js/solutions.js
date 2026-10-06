/* =========================================================
   TIS EAST AFRICA
   Solutions Page
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SYSTEM DATA
    ====================================================== */

    const systems = {

        lighting: {
            number: "01",
            category: "Intelligent Lighting",

            title: `
                Light that changes
                <em>with the space.</em>
            `,

            description:
                "Create lighting scenes, automate everyday routines and control different areas of the property from switches, sensors or the TIS app.",

            capabilities: [
                "Scenes",
                "Dimming",
                "Scheduling",
                "Motion",
                "Remote control"
            ],

            image:
                "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=88"
        },


        climate: {
            number: "02",
            category: "Climate Control",

            title: `
                Comfort without
                <em>constant adjustment.</em>
            `,

            description:
                "Bring heating, cooling and temperature control into the same intelligent environment as the rest of the property.",

            capabilities: [
                "HVAC control",
                "Temperature",
                "Scheduling",
                "Scenes",
                "Remote control"
            ],

            image:
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=88"
        },


        security: {
            number: "03",
            category: "Security & Access",

            title: `
                Know what is happening.
                <em>Wherever you are.</em>
            `,

            description:
                "Connect security, access and monitoring with the wider automation system so your property can respond intelligently to people and events.",

            capabilities: [
                "CCTV",
                "Access control",
                "Smart locks",
                "Intercom",
                "Alarm integration"
            ],

            image:
                "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1800&q=88"
        },


        curtains: {
            number: "04",
            category: "Curtains & Shading",

            title: `
                Natural light,
                <em>automatically managed.</em>
            `,

            description:
                "Control motorised curtains and blinds through schedules, scenes, wall controls and the wider automation system.",

            capabilities: [
                "Curtains",
                "Blinds",
                "Scheduling",
                "Scenes",
                "Wall control"
            ],

            image:
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=88"
        },


        entertainment: {
            number: "05",
            category: "Entertainment",

            title: `
                Sound and entertainment,
                <em>throughout the space.</em>
            `,

            description:
                "Bring music, television and entertainment into one connected experience that can be controlled throughout the property.",

            capabilities: [
                "Multiroom audio",
                "TV distribution",
                "Streaming",
                "Speakers",
                "Unified control"
            ],

            image:
                "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1800&q=88"
        },


        energy: {
            number: "06",
            category: "Energy Management",

            title: `
                Understand how your
                <em>space uses energy.</em>
            `,

            description:
                "Monitor consumption and connect energy management with the wider automation system to make the property easier to understand and manage.",

            capabilities: [
                "Energy monitoring",
                "Consumption data",
                "Automation",
                "Solar integration",
                "System control"
            ],

            image:
                "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1800&q=88"
        },


        cinema: {
            number: "07",
            category: "Home Cinema",

            title: `
                Cinema designed
                <em>as one experience.</em>
            `,

            description:
                "Picture, sound, lighting and control work together to create a dedicated entertainment environment that feels effortless to use.",

            capabilities: [
                "Projection",
                "Surround sound",
                "Acoustics",
                "Lighting",
                "Automation"
            ],

            image:
                "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=88"
        }

    };



    /* =====================================================
       ELEMENTS
    ====================================================== */

    const options =
        Array.from(document.querySelectorAll(".system-option"));

    const display =
        document.getElementById("system-display");

    const image =
        document.getElementById("system-image");

    const number =
        document.getElementById("system-number");

    const category =
        document.getElementById("system-category");

    const title =
        document.getElementById("system-title");

    const description =
        document.getElementById("system-description");

    const capabilities =
        document.getElementById("system-capabilities");

    const nextButton =
        document.getElementById("next-system");


    const systemKeys = Object.keys(systems);

    let currentSystem = "lighting";

    let transitionTimer;



    /* =====================================================
       UPDATE CAPABILITIES
    ====================================================== */

    function updateCapabilities(items) {

        if (!capabilities) return;

        capabilities.innerHTML = "";

        items.forEach((item) => {

            const tag = document.createElement("span");

            tag.textContent = item;

            capabilities.appendChild(tag);

        });

    }



    /* =====================================================
       UPDATE SELECTOR
    ====================================================== */

    function updateSelector(systemKey) {

        options.forEach((option) => {

            const isActive =
                option.dataset.system === systemKey;


            option.classList.toggle(
                "active",
                isActive
            );


            option.setAttribute(
                "aria-selected",
                isActive ? "true" : "false"
            );


            option.tabIndex =
                isActive ? 0 : -1;

        });

    }



    /* =====================================================
       UPDATE CONTENT
    ====================================================== */

    function updateContent(systemKey) {

        const selected = systems[systemKey];

        if (!selected) return;


        if (number) {
            number.textContent =
                selected.number;
        }


        if (category) {
            category.textContent =
                selected.category;
        }


        if (title) {
            title.innerHTML =
                selected.title;
        }


        if (description) {
            description.textContent =
                selected.description;
        }


        if (image) {

            image.style.backgroundImage =
                `url("${selected.image}")`;


            image.setAttribute(
                "aria-label",
                selected.category
            );

        }


        updateCapabilities(
            selected.capabilities
        );

    }



    /* =====================================================
       CHANGE SYSTEM
    ====================================================== */

    function changeSystem(
        systemKey,
        updateURL = true
    ) {

        const selected = systems[systemKey];

        if (!selected) return;


        currentSystem = systemKey;


        updateSelector(systemKey);


        /*
         * Small transition between systems.
         * CSS will control the visual effect.
         */

        if (display) {

            clearTimeout(
                transitionTimer
            );


            display.classList.add(
                "is-changing"
            );


            transitionTimer =
                setTimeout(() => {

                    updateContent(
                        systemKey
                    );


                    requestAnimationFrame(() => {

                        display.classList.remove(
                            "is-changing"
                        );

                    });

                }, 180);

        }

        else {

            updateContent(
                systemKey
            );

        }


        /*
         * Keep URL hash updated.
         * Example:
         * solutions.html#climate
         */

        if (updateURL) {

            history.replaceState(
                null,
                "",
                `#${systemKey}`
            );

        }

    }



    /* =====================================================
       SELECTOR CLICK
    ====================================================== */

    options.forEach((option) => {

        option.addEventListener(
            "click",
            () => {

                const systemKey =
                    option.dataset.system;


                changeSystem(
                    systemKey
                );

            }
        );

    });



    /* =====================================================
       NEXT SYSTEM BUTTON
    ====================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                const currentIndex =
                    systemKeys.indexOf(
                        currentSystem
                    );


                const nextIndex =
                    (
                        currentIndex + 1
                    ) % systemKeys.length;


                const nextKey =
                    systemKeys[nextIndex];


                changeSystem(
                    nextKey
                );


                /*
                 * Keep active selector visible
                 * on mobile/tablet.
                 */

                const nextOption =
                    document.querySelector(
                        `.system-option[data-system="${nextKey}"]`
                    );


                if (nextOption) {

                    nextOption.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center"
                    });

                }

            }
        );

    }



    /* =====================================================
       KEYBOARD NAVIGATION
    ====================================================== */

    options.forEach(
        (option, index) => {

            option.addEventListener(
                "keydown",
                (event) => {

                    let targetIndex = null;


                    if (
                        event.key === "ArrowRight"
                    ) {

                        targetIndex =
                            (
                                index + 1
                            ) % options.length;

                    }


                    if (
                        event.key === "ArrowLeft"
                    ) {

                        targetIndex =
                            (
                                index - 1 +
                                options.length
                            ) % options.length;

                    }


                    if (
                        event.key === "Home"
                    ) {

                        targetIndex = 0;

                    }


                    if (
                        event.key === "End"
                    ) {

                        targetIndex =
                            options.length - 1;

                    }


                    if (
                        targetIndex === null
                    ) {
                        return;
                    }


                    event.preventDefault();


                    const target =
                        options[targetIndex];


                    target.focus();


                    changeSystem(
                        target.dataset.system
                    );

                }
            );

        }
    );



    /* =====================================================
       URL HASH
    ====================================================== */

    function getRequestedSystem() {

        return window.location.hash
            .replace("#", "")
            .trim()
            .toLowerCase();

    }



    /*
     * Allows direct links such as:
     *
     * solutions.html#cinema
     * solutions.html#security
     */

    const requestedSystem =
        getRequestedSystem();


    if (
        requestedSystem &&
        systems[requestedSystem]
    ) {

        currentSystem =
            requestedSystem;

        updateSelector(
            requestedSystem
        );

        updateContent(
            requestedSystem
        );

    }

    else {

        currentSystem =
            "lighting";

        updateSelector(
            "lighting"
        );

        updateContent(
            "lighting"
        );

    }



    /* =====================================================
       HANDLE HASH CHANGES
    ====================================================== */

    window.addEventListener(
        "hashchange",
        () => {

            const requested =
                getRequestedSystem();


            if (
                requested &&
                systems[requested]
            ) {

                changeSystem(
                    requested,
                    false
                );

            }

        }
    );



    /* =====================================================
       PRELOAD SYSTEM IMAGES
    ====================================================== */

    /*
     * Loads the other system images quietly
     * after the page starts so switching
     * systems feels faster.
     */

    window.addEventListener(
        "load",
        () => {

            systemKeys.forEach(
                (key) => {

                    if (
                        key === currentSystem
                    ) {
                        return;
                    }


                    const preload =
                        new Image();


                    preload.src =
                        systems[key].image;

                }
            );

        },
        { once: true }
    );

});