const soundIcon = document.querySelector("#soundIcon");

let currSound = new Audio();
let isMuted = false;

// switches between mute and unmute
function toggleSound() {
    if (!currSound.paused) {
        isMuted = true;
        soundIcon.src = "./images/ui/mute.png"
        currSound.pause();
    }
    else {
        isMuted = false;
        soundIcon.src = "./images/ui/sound-on.png"
        currSound.play();
    }
}

// changes the sound, if a scenario contains a sound (in json)
function changeSound(sound) {
    if (sound === undefined) {
        return;
    }

    // have to stop/pause the current sound, otherwise the new sound will simply play over the old sound and there is no way to mute the old sound then
    currSound.pause();
    currSound = new Audio(sound);

    // this makes sure that the sound only starts to play if the mute-button is off
    // else it would start playing the sound, even if the mute-button is on
    if (!isMuted) {
        currSound.play();
        // since my sounds are background music rather than sound effects, I loop them
        currSound.loop = true;
    }
}

soundIcon.addEventListener("click", toggleSound);