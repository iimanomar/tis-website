document.addEventListener("DOMContentLoaded", () => {

    const videos = document.querySelectorAll(
        ".about-film video, .experience-reel video"
    );

    videos.forEach((video) => {

        video.muted = true;

        const playVideo = () => {
            video.play().catch(() => { });
        };

        if (video.readyState >= 2) {
            playVideo();
        } else {
            video.addEventListener(
                "loadeddata",
                playVideo,
                { once: true }
            );
        }

    });

});
document.addEventListener("DOMContentLoaded", () => {

    const videos = document.querySelectorAll(
        ".about-video, .experience-video"
    );

    videos.forEach((video) => {

        video.muted = true;
        video.defaultMuted = true;
        video.autoplay = true;
        video.loop = true;
        video.playsInline = true;

        video.removeAttribute("controls");

        const start = () => {
            video.play().catch(() => { });
        };

        start();

        video.addEventListener("loadedmetadata", start, { once: true });
        video.addEventListener("canplay", start, { once: true });

    });

});