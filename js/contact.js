/* =========================================================
   TIS EAST AFRICA — CONTACT
========================================================= */

(() => {

    const form =
        document.querySelector("#tis-contact-form");

    const interest =
        document.querySelector("#interest");

    const message =
        document.querySelector("#message");

    if (!form) return;


    /* =====================================================
       MESSAGE CONTEXT
    ===================================================== */

    if (interest && message) {

        interest.addEventListener("change", () => {

            if (
                interest.value ===
                "Visit the Experience Center"
            ) {

                message.placeholder =
                    "When would you like to visit?";

                return;
            }


            if (
                interest.value ===
                "Start a project"
            ) {

                message.placeholder =
                    "Tell us about your project.";

                return;
            }


            message.placeholder =
                "How can we help?";

        });

    }


    /* =====================================================
       SUBMISSION
    ===================================================== */

    form.addEventListener("submit", () => {

        const button =
            form.querySelector(".contact-submit");

        if (!button) return;

        const label =
            button.querySelector("span:first-child");

        if (label) {
            label.textContent = "Sending enquiry";
        }

        button.setAttribute(
            "aria-busy",
            "true"
        );

    });

})();