document.addEventListener('DOMContentLoaded', function () {
    var audioPlayer = document.getElementById('audio-player');
    var playPauseButton = document.getElementById('play-pause');
    var progressBar = document.getElementById('progress-bar');
    var progressContainer = document.getElementById('progress-container');
    var currentTimeElement = document.getElementById('current-time');
    var durationElement = document.getElementById('duration');
    var speedSelector = document.getElementById('speed');

    // Play/Pause functionality
    playPauseButton.addEventListener('click', function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });

    audioPlayer.addEventListener('play', function () {
        playPauseButton.textContent = 'Pause';
        console.log('Audio is playing');
    });

    audioPlayer.addEventListener('pause', function () {
        playPauseButton.textContent = 'Play';
        console.log('Audio is paused');
    });

    audioPlayer.addEventListener('volumechange', function () {
        console.log('Volume changed to', audioPlayer.volume);
    });

    audioPlayer.addEventListener('timeupdate', function () {
        var currentTime = audioPlayer.currentTime;
        var duration = audioPlayer.duration;
        var progress = (currentTime / duration) * 100;
        progressBar.style.width = progress + '%';

        // Update current time display
        var currentMinutes = Math.floor(currentTime / 60);
        var currentSeconds = Math.floor(currentTime % 60);
        currentTimeElement.textContent = currentMinutes + ':' + (currentSeconds < 10 ? '0' : '') + currentSeconds;
    });

    audioPlayer.addEventListener('ended', function () {
        playPauseButton.textContent = 'Play';
        console.log('Audio has ended');
    });

    audioPlayer.addEventListener('loadeddata', function () {
        // Update duration display
        var duration = audioPlayer.duration;
        var durationMinutes = Math.floor(duration / 60);
        var durationSeconds = Math.floor(duration % 60);
        durationElement.textContent = durationMinutes + ':' + (durationSeconds < 10 ? '0' : '') + durationSeconds;
    });

    speedSelector.addEventListener('change', function () {
        audioPlayer.playbackRate = parseFloat(speedSelector.value);
    });

    progressContainer.addEventListener('click', function (e) {
        var rect = progressContainer.getBoundingClientRect();
        var offsetX = e.clientX - rect.left;
        var width = rect.width;
        var duration = audioPlayer.duration;
        var newTime = (offsetX / width) * duration;
        audioPlayer.currentTime = newTime;
    });
});

  