/* =========================================================
   TIS EAST AFRICA — INTERACTIVE EXPERIENCE
   Full clean rebuild
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const clamp = (value, min, max) =>
        Math.min(Math.max(value, min), max);


    /* =====================================================
       ROOM DATA
    ===================================================== */

    const rooms = {

        living: {
            name: "Living Room",
            image:
                "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90",
            position: "center",
            temperature: 22,
            defaultLights: {
                ceiling: 72,
                chandelier: 55,
                wall: 40
            },
            curtains: 100
        },

        master: {
            name: "Master Bedroom",
            image:
                "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=90",
            position: "center",
            temperature: 21,
            defaultLights: {
                ceiling: 46,
                chandelier: 22,
                wall: 32
            },
            curtains: 70
        },

        kitchen: {
            name: "Kitchen",
            image:
                "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1800&q=90",
            position: "center",
            temperature: 22,
            defaultLights: {
                ceiling: 88,
                chandelier: 60,
                wall: 65
            },
            curtains: 100
        },

        cinema: {
            name: "Home Cinema",
            image:
                "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=90",
            position: "center",
            temperature: 21,
            defaultLights: {
                ceiling: 8,
                chandelier: 0,
                wall: 14
            },
            curtains: 0
        },

        garden: {
            name: "Garden",
            image:
                "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=90",
            position: "center",
            temperature: 23,
            defaultLights: {
                ceiling: 50,
                chandelier: 0,
                wall: 45
            },
            curtains: 100
        }

    };


    /* =====================================================
       MOOD DATA
    ===================================================== */

    const moods = {

        welcome: {
            name: "Welcome Home",
            shortName: "Welcome",
            lights: {
                ceiling: 72,
                chandelier: 55,
                wall: 40
            },
            curtains: 100,
            temperature: 22,
            security: "off",
            music: false,
            tv: false,
            projector: false
        },

        morning: {
            name: "Good Morning",
            shortName: "Morning",
            lights: {
                ceiling: 90,
                chandelier: 35,
                wall: 30
            },
            curtains: 100,
            temperature: 22,
            security: "off",
            music: true,
            tv: false,
            projector: false
        },

        movie: {
            name: "Movie Night",
            shortName: "Movie",
            lights: {
                ceiling: 4,
                chandelier: 0,
                wall: 10
            },
            curtains: 0,
            temperature: 21,
            security: "home",
            music: false,
            tv: true,
            projector: true
        },

        dinner: {
            name: "Dinner",
            shortName: "Dinner",
            lights: {
                ceiling: 32,
                chandelier: 76,
                wall: 48
            },
            curtains: 35,
            temperature: 22,
            security: "off",
            music: true,
            tv: false,
            projector: false
        },

        sleep: {
            name: "Good Night",
            shortName: "Night",
            lights: {
                ceiling: 0,
                chandelier: 0,
                wall: 4
            },
            curtains: 0,
            temperature: 20,
            security: "home",
            music: false,
            tv: false,
            projector: false
        },

        away: {
            name: "Away",
            shortName: "Away",
            lights: {
                ceiling: 0,
                chandelier: 0,
                wall: 0
            },
            curtains: 0,
            temperature: 24,
            security: "away",
            music: false,
            tv: false,
            projector: false
        }

    };


    /* =====================================================
       STATE
    ===================================================== */

    const state = {

        room: "living",

        lights: {
            ceiling: 72,
            chandelier: 55,
            wall: 40
        },

        lastLightValues: {
            ceiling: 72,
            chandelier: 55,
            wall: 40
        },

        climate: {
            temperature: 22,
            power: true,
            fan: "2"
        },

        curtains: 100,
        sheers: 100,

        music: {
            playing: false,
            volume: 35,
            track: "Nothing playing"
        },

        appliances: {
            tv: false,
            floor: false,
            socket: true,
            projector: false
        },

        mood: "welcome",

        security: "off"

    };


    /* =====================================================
       IMPORTANT ELEMENTS
    ===================================================== */

    const demoRoom = $("#demo-room");
    const demoRoomImage = $(".demo-room-image");
    const demoRoomLight = $("#demo-room-light");
    const demoRoomNight = $("#demo-room-night");

    const curtainLeft = $(".demo-curtain-left");
    const curtainRight = $(".demo-curtain-right");

    const demoRoomName = $("#demo-room-name");
    const demoRoomTemperature = $("#demo-room-temperature");

    const roomControlPhoto = $("#room-control-photo");
    const roomControlName = $("#room-control-name");

    const appTime = $("#app-time");
    const dashboardTime = $("#dashboard-time");

    const lightNames = [
        "ceiling",
        "chandelier",
        "wall"
    ];


    /* =====================================================
       RANGE PAINT
    ===================================================== */

    function paintRange(input) {

        if (!input) return;

        const min = Number(input.min || 0);
        const max = Number(input.max || 100);
        const value = Number(input.value);

        const percentage =
            ((value - min) / (max - min)) * 100;

        input.style.background =
            `linear-gradient(
                90deg,
                var(--red) 0%,
                var(--red) ${percentage}%,
                rgba(255,255,255,.13) ${percentage}%,
                rgba(255,255,255,.13) 100%
            )`;
    }


    /* =====================================================
       CLOCK
    ===================================================== */

    function updateClock() {

        const now = new Date();

        const time = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

        if (appTime) {
            appTime.textContent = time;
        }

        if (dashboardTime) {
            dashboardTime.textContent = time;
        }
    }

    updateClock();

    window.setInterval(updateClock, 30000);


    /* =====================================================
       APP NAVIGATION
    ===================================================== */

    function openView(viewName) {

        $$(".app-view").forEach(view => {

            view.classList.toggle(
                "active",
                view.dataset.view === viewName
            );

            if (
                view.dataset.view === viewName
            ) {
                view.scrollTop = 0;
            }

        });


        $("[data-view].active");


        $$("[data-bottom-view]").forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.bottomView === viewName
            );

        });
    }


    $$("[data-open-view]").forEach(button => {

        button.addEventListener("click", () => {

            openView(
                button.dataset.openView
            );

        });

    });


    $$("[data-bottom-view]").forEach(button => {

        button.addEventListener("click", () => {

            openView(
                button.dataset.bottomView
            );

        });

    });


    $$("[data-back]").forEach(button => {

        button.addEventListener("click", () => {

            openView(
                button.dataset.back
            );

        });

    });


    const homeButton =
        $("#app-home-button");

    if (homeButton) {

        homeButton.addEventListener(
            "click",
            () => openView("home")
        );
    }


    /* =====================================================
       SYSTEM NAVIGATION
    ===================================================== */

    function openSystem(systemName) {

        $$(".room-system-tab").forEach(tab => {

            tab.classList.toggle(
                "active",
                tab.dataset.system === systemName
            );

        });


        $$("[data-system-panel]").forEach(panel => {

            panel.classList.toggle(
                "active",
                panel.dataset.systemPanel === systemName
            );

        });
    }


    $$("[data-system]").forEach(button => {

        button.addEventListener("click", () => {

            openSystem(
                button.dataset.system
            );

        });

    });


    $$("[data-open-system]").forEach(button => {

        button.addEventListener("click", () => {

            openView("room");

            openSystem(
                button.dataset.openSystem
            );

        });

    });


    /* =====================================================
       ROOM SWITCHING
    ===================================================== */

    function setRoomImage(roomKey, animate = true) {

        const room = rooms[roomKey];

        if (!room) return;


        if (roomControlPhoto) {

            roomControlPhoto.style.backgroundImage =
                `url("${room.image}")`;

            roomControlPhoto.style.backgroundPosition =
                room.position;
        }


        if (!demoRoomImage) return;


        const applyImage = () => {

            demoRoomImage.style.backgroundImage =
                `url("${room.image}")`;

            demoRoomImage.style.backgroundPosition =
                room.position;

            demoRoomImage.style.opacity = "1";

            demoRoomImage.style.transform =
                "scale(1.01)";
        };


        if (!animate) {

            applyImage();

            return;
        }


        demoRoomImage.style.opacity = "0.22";

        demoRoomImage.style.transform =
            "scale(1.035)";


        window.setTimeout(
            applyImage,
            180
        );
    }


    function openRoom(roomKey) {

        const room = rooms[roomKey];

        if (!room) return;


        state.room = roomKey;


        if (demoRoomName) {
            demoRoomName.textContent =
                room.name;
        }


        if (roomControlName) {
            roomControlName.textContent =
                room.name;
        }


        if (demoRoomTemperature) {

            demoRoomTemperature.textContent =
                `${state.climate.temperature}°C`;
        }


        setRoomImage(roomKey);


        /*
         * Give every room a believable starting
         * personality when selected.
         */

        state.lights = {
            ...room.defaultLights
        };


        lightNames.forEach(name => {

            if (state.lights[name] > 0) {

                state.lastLightValues[name] =
                    state.lights[name];
            }

        });


        state.curtains =
            room.curtains;


        updateLighting();
        updateCurtains();


        openView("room");
        openSystem("lights");
    }


    $$("[data-open-room]").forEach(button => {

        button.addEventListener("click", () => {

            openRoom(
                button.dataset.openRoom
            );

        });

    });


    /* =====================================================
       LIGHTING
    ===================================================== */

    function updateLighting() {

        let total = 0;


        lightNames.forEach(name => {

            const value =
                Number(state.lights[name]);

            total += value;


            const switchButton =
                $(`[data-light-switch="${name}"]`);

            const slider =
                $(`[data-light-slider="${name}"]`);

            const status =
                $(`#${name}-status`);


            if (switchButton) {

                switchButton.classList.toggle(
                    "active",
                    value > 0
                );
            }


            if (slider) {

                slider.value = value;

                paintRange(slider);
            }


            if (status) {

                status.textContent =
                    value > 0
                        ? `On · ${Math.round(value)}%`
                        : "Off";
            }

        });


        const average =
            total / lightNames.length;

        const brightness =
            average / 100;


        /*
         * THIS is what makes the architecture
         * visibly react to the phone.
         */

        if (demoRoomImage) {

            const imageBrightness =
                0.38 +
                brightness * 0.72;

            const saturation =
                0.72 +
                brightness * 0.30;

            const warmth =
                0.97 +
                brightness * 0.05;


            demoRoomImage.style.filter =
                `brightness(${imageBrightness})
                 saturate(${saturation})
                 sepia(${Math.max(
                    0,
                    (warmth - 0.97) * 1.6
                )})`;
        }


        /*
         * Warm architectural light.
         */

        if (demoRoomLight) {

            demoRoomLight.style.opacity =
                String(
                    0.02 +
                    brightness * 0.46
                );
        }


        /*
         * Blue-black night layer.
         */

        if (demoRoomNight) {

            demoRoomNight.style.opacity =
                String(
                    Math.max(
                        0,
                        0.68 -
                        brightness * 0.68
                    )
                );
        }


        /*
         * Cinema gets naturally moodier.
         */

        if (
            demoRoomNight &&
            state.room === "cinema"
        ) {

            demoRoomNight.style.opacity =
                String(
                    Math.max(
                        0.12,
                        0.76 -
                        brightness * 0.58
                    )
                );
        }


        const allLightsButton =
            $("#all-lights-toggle");


        if (allLightsButton) {

            const anyOn =
                lightNames.some(
                    name =>
                        state.lights[name] > 0
                );

            allLightsButton.textContent =
                anyOn
                    ? "All off"
                    : "All on";
        }
    }


    $$("[data-light-slider]").forEach(slider => {

        slider.addEventListener("input", () => {

            const name =
                slider.dataset.lightSlider;

            const value =
                Number(slider.value);


            state.lights[name] =
                value;


            if (value > 0) {

                state.lastLightValues[name] =
                    value;
            }


            state.mood = null;

            updateLighting();
            updateMoodUI();

        });

    });


    $$("[data-light-switch]").forEach(button => {

        button.addEventListener("click", () => {

            const name =
                button.dataset.lightSwitch;


            if (state.lights[name] > 0) {

                state.lastLightValues[name] =
                    state.lights[name];

                state.lights[name] = 0;

            } else {

                state.lights[name] =
                    state.lastLightValues[name] || 60;
            }


            state.mood = null;

            updateLighting();
            updateMoodUI();

        });

    });


    const allLightsToggle =
        $("#all-lights-toggle");


    if (allLightsToggle) {

        allLightsToggle.addEventListener(
            "click",
            () => {

                const anyOn =
                    lightNames.some(
                        name =>
                            state.lights[name] > 0
                    );


                lightNames.forEach(name => {

                    if (anyOn) {

                        if (
                            state.lights[name] > 0
                        ) {

                            state.lastLightValues[name] =
                                state.lights[name];
                        }

                        state.lights[name] = 0;

                    } else {

                        state.lights[name] =
                            state.lastLightValues[name] ||
                            rooms[state.room]
                                .defaultLights[name] ||
                            60;
                    }

                });


                state.mood = null;

                updateLighting();
                updateMoodUI();
            }
        );
    }


    /* =====================================================
       CURTAINS
       0   = closed
       100 = open
    ===================================================== */

    function updateCurtains() {

        const open =
            clamp(
                Number(state.curtains),
                0,
                100
            );


        const travel =
            94 * (open / 100);


        if (curtainLeft) {

            curtainLeft.style.opacity =
                open >= 99
                    ? "0"
                    : "1";

            curtainLeft.style.transform =
                `translateX(-${travel}%)`;
        }


        if (curtainRight) {

            curtainRight.style.opacity =
                open >= 99
                    ? "0"
                    : "1";

            curtainRight.style.transform =
                `translateX(${travel}%)`;
        }


        if (demoRoom) {

            demoRoom.classList.toggle(
                "curtains-closed",
                open <= 5
            );
        }


        const position =
            $("#curtain-position");

        const stateLabel =
            $("#curtain-state");

        const slider =
            $("#curtain-slider");


        if (position) {

            position.textContent =
                `${Math.round(open)}%`;
        }


        if (stateLabel) {

            if (open >= 95) {
                stateLabel.textContent =
                    "Open";
            } else if (open <= 5) {
                stateLabel.textContent =
                    "Closed";
            } else {
                stateLabel.textContent =
                    "Partially open";
            }
        }


        if (slider) {

            slider.value = open;

            paintRange(slider);
        }
    }


    const curtainSlider =
        $("#curtain-slider");


    if (curtainSlider) {

        curtainSlider.addEventListener(
            "input",
            () => {

                state.curtains =
                    Number(
                        curtainSlider.value
                    );

                state.mood = null;

                updateCurtains();
                updateMoodUI();
            }
        );
    }


    const curtainOpen =
        $("#curtain-open");

    const curtainClose =
        $("#curtain-close");

    const curtainStop =
        $("#curtain-stop");


    if (curtainOpen) {

        curtainOpen.addEventListener(
            "click",
            () => {

                state.curtains = 100;

                state.mood = null;

                updateCurtains();
                updateMoodUI();
            }
        );
    }


    if (curtainClose) {

        curtainClose.addEventListener(
            "click",
            () => {

                state.curtains = 0;

                state.mood = null;

                updateCurtains();
                updateMoodUI();
            }
        );
    }


    if (curtainStop) {

        curtainStop.addEventListener(
            "click",
            () => {

                /*
                 * A real motor would stop at its
                 * current position. Since the slider
                 * already represents that position,
                 * this intentionally leaves it there.
                 */

                curtainStop.animate(
                    [
                        { transform: "scale(1)" },
                        { transform: "scale(.92)" },
                        { transform: "scale(1)" }
                    ],
                    {
                        duration: 220,
                        easing: "ease-out"
                    }
                );
            }
        );
    }


    /* =====================================================
       SHEERS
    ===================================================== */

    function updateSheers() {

        const slider =
            $("#sheer-slider");

        const position =
            $("#sheer-position");


        if (slider) {

            slider.value =
                state.sheers;

            paintRange(slider);
        }


        if (position) {

            position.textContent =
                `${Math.round(
                    state.sheers
                )}%`;
        }
    }


    const sheerSlider =
        $("#sheer-slider");


    if (sheerSlider) {

        sheerSlider.addEventListener(
            "input",
            () => {

                state.sheers =
                    Number(
                        sheerSlider.value
                    );

                updateSheers();
            }
        );
    }


    /* =====================================================
       CLIMATE
    ===================================================== */

    function updateClimate() {

        const display =
            $("#climate-temperature");

        const powerButton =
            $("#climate-power");


        if (display) {

            display.textContent =
                `${state.climate.temperature}°`;
        }


        if (demoRoomTemperature) {

            demoRoomTemperature.textContent =
                `${state.climate.temperature}°C`;
        }


        if (powerButton) {

            powerButton.classList.toggle(
                "active",
                state.climate.power
            );

            powerButton.textContent =
                state.climate.power
                    ? "On"
                    : "Off";
        }


        $$("[data-fan]").forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.fan ===
                state.climate.fan
            );

        });
    }


    const climateDown =
        $("#climate-down");

    const climateUp =
        $("#climate-up");

    const climatePower =
        $("#climate-power");


    if (climateDown) {

        climateDown.addEventListener(
            "click",
            () => {

                state.climate.temperature =
                    clamp(
                        state.climate.temperature - 1,
                        16,
                        30
                    );

                updateClimate();
            }
        );
    }


    if (climateUp) {

        climateUp.addEventListener(
            "click",
            () => {

                state.climate.temperature =
                    clamp(
                        state.climate.temperature + 1,
                        16,
                        30
                    );

                updateClimate();
            }
        );
    }


    if (climatePower) {

        climatePower.addEventListener(
            "click",
            () => {

                state.climate.power =
                    !state.climate.power;

                updateClimate();
            }
        );
    }


    $$("[data-fan]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                state.climate.fan =
                    button.dataset.fan;

                updateClimate();
            }
        );

    });


    /* =====================================================
    MUSIC — REAL AUDIO
 ===================================================== */

    const demoAudio = new Audio("../audio/tis-demo-music.mp3");

    demoAudio.preload = "auto";
    demoAudio.loop = true;
    demoAudio.volume = state.music.volume / 100;


    function updateMusic() {

        const track =
            $("#music-track");

        const play =
            $("#music-play");

        const volume =
            $("#volume-slider");

        const volumeValue =
            $("#volume-value");


        if (track) {

            track.textContent =
                state.music.playing
                    ? "Digital Clouds"
                    : "Nothing playing";

        }


        if (play) {

            play.classList.toggle(
                "playing",
                state.music.playing
            );

            play.setAttribute(
                "aria-label",
                state.music.playing
                    ? "Pause music"
                    : "Play music"
            );

        }


        if (volume) {

            volume.value =
                state.music.volume;

            paintRange(volume);

        }


        if (volumeValue) {

            volumeValue.textContent =
                `${state.music.volume}%`;

        }


        demoAudio.volume =
            state.music.volume / 100;

    }


    const musicPlay =
        $("#music-play");


    if (musicPlay) {

        musicPlay.innerHTML =
            '<span class="music-play-icon"></span>';

        musicPlay.addEventListener(
            "click",
            async () => {

                if (demoAudio.paused) {

                    try {

                        await demoAudio.play();

                        state.music.playing = true;

                    } catch (error) {

                        console.error(
                            "Music could not play:",
                            error
                        );

                        state.music.playing = false;

                    }

                } else {

                    demoAudio.pause();

                    state.music.playing = false;

                }

                updateMusic();

            }
        );

    }


    const volumeSlider =
        $("#volume-slider");


    if (volumeSlider) {

        volumeSlider.addEventListener(
            "input",
            () => {

                state.music.volume =
                    Number(
                        volumeSlider.value
                    );

                demoAudio.volume =
                    state.music.volume / 100;

                updateMusic();

            }
        );

    }


    demoAudio.addEventListener(
        "play",
        () => {

            state.music.playing = true;
            updateMusic();

        }
    );


    demoAudio.addEventListener(
        "pause",
        () => {

            state.music.playing = false;
            updateMusic();

        }
    );


    demoAudio.addEventListener(
        "error",
        () => {

            state.music.playing = false;
            updateMusic();

            console.error(
                "TIS demo music file could not be loaded."
            );

        }
    );
    
    /* =====================================================
       APPLIANCES
    ===================================================== */

    function updateAppliances() {

        Object.entries(
            state.appliances
        ).forEach(
            ([name, active]) => {

                $$(
                    `[data-appliance="${name}"]`
                ).forEach(button => {

                    button.classList.toggle(
                        "active",
                        active
                    );

                });


                const status =
                    $(`#${name}-status`);


                if (status) {

                    status.textContent =
                        active
                            ? "On"
                            : "Off";
                }

            }
        );


        /*
         * Entertainment subtly changes the room.
         * This gives Movie Night a little screen glow
         * without needing extra HTML.
         */

        if (demoRoomLight) {

            const entertainmentOn =
                state.appliances.tv ||
                state.appliances.projector;

            if (
                entertainmentOn &&
                state.room === "cinema"
            ) {

                demoRoomLight.style.background =
                    `radial-gradient(
                        circle at 55% 42%,
                        rgba(120,160,255,.36),
                        transparent 34%
                    ),
                    radial-gradient(
                        circle at 58% 24%,
                        rgba(255,220,155,.28),
                        transparent 40%
                    )`;

            } else {

                demoRoomLight.style.background = "";
            }
        }
    }


    $$("[data-appliance]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const appliance =
                    button.dataset.appliance;


                if (
                    !Object.prototype.hasOwnProperty.call(
                        state.appliances,
                        appliance
                    )
                ) {
                    return;
                }


                state.appliances[appliance] =
                    !state.appliances[appliance];


                updateAppliances();
                updateLighting();
            }
        );

    });


    /* =====================================================
       SECURITY
    ===================================================== */

    function updateSecurity() {

        const labels = {

            off: {
                heading: "Disarmed",
                main: "System disarmed",
                dashboard: "Disarmed"
            },

            home: {
                heading: "Armed Home",
                main: "Perimeter protected",
                dashboard: "Armed Home"
            },

            away: {
                heading: "Armed Away",
                main: "Property secured",
                dashboard: "Armed Away"
            }

        };


        const current =
            labels[state.security];


        const heading =
            $("#security-heading-state");

        const main =
            $("#security-main-state");

        const dashboard =
            $("#dashboard-security");


        if (heading) {

            heading.textContent =
                current.heading;
        }


        if (main) {

            main.textContent =
                current.main;
        }


        if (dashboard) {

            dashboard.textContent =
                current.dashboard;
        }


        $$("[data-security-mode]").forEach(
            button => {

                button.classList.toggle(
                    "active",
                    button.dataset.securityMode ===
                    state.security
                );

            }
        );
    }


    $$("[data-security-mode]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                state.security =
                    button.dataset.securityMode;

                state.mood = null;

                updateSecurity();
                updateMoodUI();
            }
        );

    });


    /* =====================================================
       MOODS
    ===================================================== */

    function updateMoodUI() {

        $$("[data-mood]").forEach(button => {

            button.classList.toggle(
                "active",
                Boolean(state.mood) &&
                button.dataset.mood ===
                state.mood
            );

        });


        const dashboard =
            $("#dashboard-mood");


        if (dashboard) {

            dashboard.textContent =
                state.mood
                    ? moods[state.mood].shortName
                    : "Manual";
        }


        /*
         * This element was removed from your latest
         * room overlay. Keeping this optional means
         * the JS works either way.
         */

        const demoMood =
            $("#demo-active-mood");


        if (demoMood) {

            demoMood.textContent =
                state.mood
                    ? moods[state.mood].name
                    : "Manual Control";
        }
    }


    function activateMood(moodKey) {

        const mood =
            moods[moodKey];

        if (!mood) return;


        state.mood =
            moodKey;


        state.lights = {
            ...mood.lights
        };


        lightNames.forEach(name => {

            if (
                state.lights[name] > 0
            ) {

                state.lastLightValues[name] =
                    state.lights[name];
            }

        });


        state.curtains =
            mood.curtains;


        state.climate.temperature =
            mood.temperature;


        state.climate.power =
            true;


        state.security =
            mood.security;


        state.music.playing =
            mood.music;


        state.appliances.tv =
            mood.tv;


        state.appliances.projector =
            mood.projector;


        /*
         * Movie Night becomes extra fun:
         * if you're not already in the cinema,
         * the simulator moves you there.
         */

        if (
            moodKey === "movie" &&
            state.room !== "cinema"
        ) {

            state.room =
                "cinema";

            if (demoRoomName) {
                demoRoomName.textContent =
                    rooms.cinema.name;
            }

            if (roomControlName) {
                roomControlName.textContent =
                    rooms.cinema.name;
            }

            setRoomImage("cinema");
        }


        /*
         * Good Night feels most natural in
         * the bedroom.
         */

        if (
            moodKey === "sleep" &&
            state.room !== "master"
        ) {

            state.room =
                "master";

            if (demoRoomName) {
                demoRoomName.textContent =
                    rooms.master.name;
            }

            if (roomControlName) {
                roomControlName.textContent =
                    rooms.master.name;
            }

            setRoomImage("master");
        }


        updateLighting();
        updateCurtains();
        updateClimate();
        updateMusic();
        updateSecurity();
        updateAppliances();
        updateMoodUI();


        /*
         * Tiny feedback pulse.
         */

        const activeCard =
            $(
                `[data-mood="${moodKey}"]`
            );


        if (activeCard) {

            activeCard.animate(
                [
                    {
                        transform:
                            "scale(1)"
                    },
                    {
                        transform:
                            "scale(.985)"
                    },
                    {
                        transform:
                            "scale(1)"
                    }
                ],
                {
                    duration: 300,
                    easing: "ease-out"
                }
            );
        }
    }


    $$("[data-mood]").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                activateMood(
                    button.dataset.mood
                );
            
            });

    });
    /* =====================================================
   CAMERAS
===================================================== */

    const cameraMainImage = $(".camera-main-image");
    const cameraTitle = $(".camera-main > div:last-child strong");
    const cameraNumber = $(".camera-main > div:last-child small");

    const cameraFeeds = [
        {
            name: "Gate",
            image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=500&q=75"
        },
        {
            name: "Garden",
            image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=500&q=75"
        },
        {
            name: "Driveway",
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=500&q=75"
        },
        {
            name: "Rear",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=75"
        }
    ];

    $$(".camera-grid button").forEach((button, index) => {

        button.addEventListener("click", () => {

            const feed = cameraFeeds[index];

            if (!feed || !cameraMainImage) return;

            /* Change the actual main camera image */
            cameraMainImage.style.backgroundImage =
                `url("${feed.image}")`;

            cameraMainImage.style.backgroundSize = "cover";
            cameraMainImage.style.backgroundPosition = "center center";
            cameraMainImage.style.backgroundRepeat = "no-repeat";

            /* Update camera name */
            if (cameraTitle) {
                cameraTitle.textContent = feed.name;
            }

            /* Update camera number */
            if (cameraNumber) {
                cameraNumber.textContent =
                    `Camera ${String(index + 1).padStart(2, "0")}`;
            }

            /* Selected thumbnail */
            $$(".camera-grid button").forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            /* Small transition */
            cameraMainImage.animate(
                [
                    {
                        opacity: 0.45,
                        transform: "scale(1.025)"
                    },
                    {
                        opacity: 1,
                        transform: "scale(1)"
                    }
                ],
                {
                    duration: 350,
                    easing: "ease-out"
                }
            );

        });

    });
    
    /* =====================================================
       GENERIC DEVICE FEEDBACK
       Makes currently-static Intercom / Gate /
       Garden / Pool tiles still feel clickable.
    ===================================================== */

    $$(".all-devices-grid button").forEach(
        button => {

            if (
                button.dataset.openSystem ||
                button.dataset.openView ||
                button.dataset.appliance
            ) {
                return;
            }


            button.addEventListener(
                "click",
                () => {

                    button.animate(
                        [
                            {
                                transform:
                                    "scale(1)"
                            },
                            {
                                transform:
                                    "scale(.96)"
                            },
                            {
                                transform:
                                    "scale(1)"
                            }
                        ],
                        {
                            duration: 240,
                            easing: "ease-out"
                        }
                    );


                    const small =
                        $("small", button);


                    if (!small) return;


                    const original =
                        small.textContent;


                    small.textContent =
                        "Command sent";


                    window.setTimeout(
                        () => {

                            small.textContent =
                                original;

                        },
                        1000
                    );
                }
            );

        }
    );


    /* =====================================================
       INITIALISE
    ===================================================== */

    setRoomImage(
        state.room,
        false
    );

    updateLighting();
    updateCurtains();
    updateSheers();
    updateClimate();
    updateMusic();
    updateAppliances();
    updateSecurity();
    updateMoodUI();


    $$("input[type='range']").forEach(
        paintRange
    );


    /* =====================================================
       LITTLE START-UP POLISH
    ===================================================== */

    const phone =
        $(".tis-phone");


    if (
        phone &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        phone.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translateY(12px) scale(.985)"
                },
                {
                    opacity: 1,
                    transform:
                        "translateY(0) scale(1)"
                }
            ],
            {
                duration: 650,
                easing:
                    "cubic-bezier(.2,.7,.2,1)",
                fill: "both"
            }
        );
    }

});
/* =========================================================
   EMBEDDED EXPERIENCE MODE
========================================================= */

const tisExperienceParams =
    new URLSearchParams(window.location.search);

if (tisExperienceParams.get("embed") === "1") {
    document.documentElement.classList.add(
        "tis-experience-embedded"
    );
}