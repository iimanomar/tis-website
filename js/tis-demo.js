/* =========================================================
   TIS EAST AFRICA
   GLOBAL INTERACTIVE EXPERIENCE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const trigger = document.querySelector(".tis-demo-trigger");

    if (!trigger) return;


    /* =====================================================
       CREATE POPUP
    ===================================================== */

    const popup = document.createElement("div");

    popup.className = "tis-demo-modal";
    popup.setAttribute("aria-hidden", "true");

    popup.innerHTML = `
        <div class="tis-demo-backdrop"></div>

        <div
            class="tis-demo-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label="TIS interactive experience"
        >

            <div class="tis-demo-modal-top">

                <div class="tis-demo-modal-title">

                    <span>
                        Interactive Experience
                    </span>

                    <strong>
                        Try TIS
                    </strong>

                </div>

                <button
                    class="tis-demo-close"
                    type="button"
                    aria-label="Close TIS experience"
                >
                    <span></span>
                    <span></span>
                </button>

            </div>


            <div class="tis-demo-modal-content">

                <iframe
                    class="tis-demo-frame"
                    src="experience.html?embed=1"
                    title="TIS interactive smart home experience"
                    loading="eager"
                ></iframe>

            </div>

        </div>
    `;

    document.body.appendChild(popup);


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const backdrop =
        popup.querySelector(".tis-demo-backdrop");

    const closeButton =
        popup.querySelector(".tis-demo-close");


    /* =====================================================
       OPEN EXPERIENCE
    ===================================================== */

    function openDemo() {

        popup.classList.add("open");

        popup.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "tis-demo-open"
        );

        window.setTimeout(() => {

            closeButton.focus();

        }, 350);

    }


    /* =====================================================
       CLOSE EXPERIENCE
    ===================================================== */

    function closeDemo() {

        popup.classList.remove("open");

        popup.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "tis-demo-open"
        );

        trigger.focus();

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    trigger.addEventListener(
        "click",
        openDemo
    );


    closeButton.addEventListener(
        "click",
        closeDemo
    );


    backdrop.addEventListener(
        "click",
        closeDemo
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                popup.classList.contains("open")
            ) {

                closeDemo();

            }

        }
    );

});