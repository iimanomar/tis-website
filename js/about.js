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