document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(
        ".about-video, .experience-video"
    );

    videos.forEach((video) => {
        // Prepare video immediately
        video.muted = true;
        video.defaultMuted = true;
        video.loop = true;
        video.playsInline = true;
        video.controls = false;

        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.removeAttribute("controls");

        // Force Safari to load the media now
        video.load();
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const video = entry.target;

                if (entry.isIntersecting) {
                    video.muted = true;

                    video.play().catch((error) => {
                        console.log(
                            `${video.className} blocked:`,
                            error.name,
                            error.message
                        );
                    });
                } else {
                    video.pause();
                }
            });
        },
        {
            // Trigger BEFORE the video fully reaches the screen
            rootMargin: "250px 0px 250px 0px",
            threshold: 0.01
        }
    );

    videos.forEach((video) => {
        observer.observe(video);
    });
});