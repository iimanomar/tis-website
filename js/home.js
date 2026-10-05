/* =========================================================
   TIS EAST AFRICA — HOME
   Application Selector
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       APPLICATION CONTENT
    ===================================================== */

    const applications = {

        residential: {
            number: "01",
            title: "Residential",
            description:
                "Lighting, climate, security and entertainment working quietly together — designed around the way you live.",

            features: [
                {
                    name: "Lighting",
                    key: "lighting",
                    image:
                        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Climate",
                    key: "climate",
                    image:
                        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Security",
                    key: "security",
                    image:
                        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Entertainment",
                    key: "entertainment",
                    image:
                        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90"
                }
            ]
        },


        hospitality: {
            number: "02",
            title: "Hospitality",
            description:
                "Connected guest environments that bring comfort, intuitive control and operational efficiency together.",

            features: [
                {
                    name: "Guest Rooms",
                    key: "guest-rooms",
                    image:
                        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Lighting",
                    key: "lighting",
                    image:
                        "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Climate",
                    key: "climate",
                    image:
                        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Access",
                    key: "access",
                    image:
                        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1800&q=90"
                }
            ]
        },


        commercial: {
            number: "03",
            title: "Commercial",
            description:
                "Integrated building systems that create efficient, responsive and comfortable spaces for people and businesses.",

            features: [
                {
                    name: "Lighting",
                    key: "lighting",
                    image:
                        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Climate",
                    key: "climate",
                    image:
                        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Security",
                    key: "security",
                    image:
                        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Energy",
                    key: "energy",
                    image:
                        "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1800&q=90"
                }
            ]
        },


        cinema: {
            number: "04",
            title: "Home Cinema",
            description:
                "Picture, sound, lighting and control designed together to create one seamless cinematic experience.",

            features: [
                {
                    name: "Cinema",
                    key: "cinema",
                    image:
                        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Audio",
                    key: "audio",
                    image:
                        "https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Lighting",
                    key: "lighting",
                    image:
                        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1800&q=90"
                },
                {
                    name: "Control",
                    key: "control",
                    image:
                        "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1800&q=90"
                }
            ]
        }

    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const selector = document.querySelector(".application-selector");
    const options = document.querySelectorAll(".application-option");

    const intro = document.querySelector(".application-intro");
    const number = document.querySelector("#application-number");
    const title = document.querySelector("#application-title");
    const description = document.querySelector("#application-description");

    const grid = document.querySelector(".application-grid");
    const cards = document.querySelectorAll(".application-card");


    if (
        !selector ||
        !intro ||
        !number ||
        !title ||
        !description ||
        !grid ||
        !cards.length
    ) {
        return;
    }


    /* =====================================================
       UPDATE APPLICATION
    ===================================================== */

    function changeApplication(applicationKey) {

        const application = applications[applicationKey];

        if (!application) {
            return;
        }


        /* -----------------------------------------
           Update active selector option
        ----------------------------------------- */

        options.forEach((option) => {

            const isActive =
                option.dataset.application === applicationKey;

            option.classList.toggle("active", isActive);

        });


        /* -----------------------------------------
           Begin fade
        ----------------------------------------- */

        intro.classList.add("is-changing");
        grid.classList.add("is-changing");


        window.setTimeout(() => {

            /* -------------------------------------
               Update heading content
            ------------------------------------- */

            number.textContent = application.number;
            title.textContent = application.title;
            description.textContent = application.description;


            /* -------------------------------------
               Update all four cards
            ------------------------------------- */

            cards.forEach((card, index) => {

                const feature = application.features[index];

                if (!feature) {
                    return;
                }

                const cardNumber =
                    card.querySelector(".application-card-content > span");

                const cardTitle =
                    card.querySelector(".application-card-content h4");

                const cardImage =
                    card.querySelector(".application-card-image");


                if (cardNumber) {
                    cardNumber.textContent =
                        String(index + 1).padStart(2, "0");
                }


                if (cardTitle) {
                    cardTitle.textContent = feature.name;
                }


                if (cardImage) {

                    cardImage.style.backgroundImage =
                        `url("${feature.image}")`;

                }


                card.dataset.feature = feature.key;
                
            });


            /* -------------------------------------
               Finish fade
            ------------------------------------- */

            intro.classList.remove("is-changing");
            grid.classList.remove("is-changing");

        }, 220);

    }


    /* =====================================================
       SELECTOR EVENTS
    ===================================================== */

    options.forEach((option) => {

        option.addEventListener("click", () => {

            const applicationKey =
                option.dataset.application;

            if (option.classList.contains("active")) {
                return;
            }

            changeApplication(applicationKey);

        });

    });


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    changeApplication("residential");

});