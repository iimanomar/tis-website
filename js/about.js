document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(
        ".about-video, .experience-video"
    );

    videos.forEach((video) => {
        // Required for silent native autoplay
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;

        // Keep these attributes explicitly set
        video.setAttribute("muted", "");
        video.setAttribute("playsinline", "");
        video.setAttribute("autoplay", "");
        video.setAttribute("loop", "");

        // Remove Safari's visible player controls
        video.removeAttribute("controls");

        // Let the video's native autoplay happen first
        const startVideo = () => {
            video.muted = true;

            if (video.paused) {
                video.play().catch((error) => {
                    console.log(
                        `Autoplay blocked: ${video.className}`,
                        error.name
                    );
                });
            }
        };

        // Safari may need the media loaded before accepting play()
        if (video.readyState >= 2) {
            startVideo();
        } else {
            video.addEventListener("canplay", startVideo, {
                once: true
            });
        }
    });
});