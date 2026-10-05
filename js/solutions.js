/* =========================================================
   TIS EAST AFRICA
   Solutions Page
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const systems = {

        lighting: {
            number: "01",
            category: "Intelligent Lighting",
            title: "Light that changes <em>with the space.</em>",
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
                "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=88"
        },

        climate: {
            number: "02",
            category: "Climate Control",
            title: "Comfort without <em>constant adjustment.</em>",
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
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=88"
        },

        security: {
            number: "03",
            category: "Security & Access",
            title: "Know what is happening. <em>Wherever you are.</em>",
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
                "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=88"
        },

        curtains: {
            number: "04",
            category: "Curtains & Shading",
            title: "Natural light, <em>automatically managed.</em>",
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
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=88"
        },

        entertainment: {
            number: "05",
            category: "Entertainment",
            title: "Sound and entertainment, <em>throughout the space.</em>",
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
                "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1600&q=88"
        },

        energy: {
            number: "06",
            category: "Energy Management",
            title: "Understand how your <em>space uses energy.</em>",
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
                "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1600&q=88"
        },

        cinema: {
            number: "07",
            category: "Home Cinema",
            title: "Cinema designed <em>as one experience.</em>",
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
                "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=88"
        }

    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const options =
        document.querySelectorAll(".system-option");

    const image =
        document.getElementById("system-image");

    const imageLabel =
        document.getElementById("system-image-label");

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


    /* =====================================================
       CHANGE SYSTEM
    ===================================================== */

    function changeSystem(systemKey, updateURL = true) {

        const selected = systems[systemKey];

        if (!selected) return;


        /* Active selector */

        options.forEach(option => {

            option.classList.toggle(
                "active",
                option.dataset.system === systemKey
            );

        });


        /* System information */

        if (number) {
            number.textContent = selected.number;
        }

        if (category) {
            category.textContent = selected.category;
        }

        if (imageLabel) {
            imageLabel.textContent = selected.category;
        }

        if (title) {
            title.innerHTML = selected.title;
        }

        if (description) {
            description.textContent = selected.description;
        }


        /* Capabilities */

        if (capabilities) {

            capabilities.innerHTML = "";

            selected.capabilities.forEach(item => {

                const tag = document.createElement("span");

                tag.textContent = item;

                capabilities.appendChild(tag);

            });

        }


        /* Image */

        if (image) {

            image.style.backgroundImage = `
                linear-gradient(
                    180deg,
                    rgba(0, 0, 0, 0.03),
                    rgba(0, 0, 0, 0.22)
                ),
                url("${selected.image}")
            `;

        }


        /* URL */

        if (updateURL) {

            history.replaceState(
                null,
                "",
                `#${systemKey}`
            );

        }

    }


    /* =====================================================
       SELECTOR CLICKS
    ===================================================== */

    options.forEach(option => {

        option.addEventListener("click", () => {

            changeSystem(
                option.dataset.system
            );

        });

    });


    /* =====================================================
       OPEN CORRECT SYSTEM FROM URL
    ===================================================== */

    const requestedSystem =
        window.location.hash.replace("#", "");

    if (systems[requestedSystem]) {

        changeSystem(
            requestedSystem,
            false
        );

    } else {

        changeSystem(
            "lighting",
            false
        );

    }

});