// import { toggleSound, changeSound } from "./sound.js";
// import { talkRachelDown, dodgeAndReposition, loseHP, reset, showHP } from "./fight.js";
// import { changeText, changeBackgroundImage, changeButtons, changeDescription, changeImage, itemButtons, itemImage, itemText, showInventoryItems, showSuspects } from "./ui.js";
// import { showInputField, checkInput } from "./input.js";
// import { takeItem, toggleInventory, updatedInventory, useInventory } from "./inventory.js";
// import { investigation, talkToPerson } from "./investigation.js";
// import { inspectItem, readItem, useItem } from "./item.js";

const title = document.querySelector("h1");

let storyData;
let currentScenario;

// fetch json data by loading the JSON file
fetch('story.json').then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return response.json();
}).then(data => {
    storyData = data;
    startGame();
}).catch((error) => console.error("Unable to fetch data:", error));

function startGame() {
    advanceTo(storyData.startScreen);
}

function advanceTo(scenario) {
    currentScenario = scenario;
    suspectsDiv.innerHTML = "";
    inputForm.style.display = "none";
    showError = false;

    // only for Start Screen
    // hide sound icon
    // show title
    // reset inventory 
    if (scenario === storyData.startScreen) {
        title.style.display = "inline";
        soundIcon.style.display = "none";
        resetInventory();
    }
    // after leaving Start Screen
    // hide title
    // show sound icon
    else {
        title.style.display = 'none';
        soundIcon.style.display = "inline";
    }

    changeSound(scenario.sound);
    changeBackgroundImage(scenario.backgroundImage);
    changeDescription(scenario.description);
    changeImage(scenario.image);
    changeText(scenario.talkingPerson, scenario.text);
    changeButtons(scenario.options);

    // for scenarios where you have input fields
    // each scenario has a slightly different input field, therefore each input is handled differently
    switch (scenario) {
        case storyData.username:
            showInputField('playerName');
            break;
        case storyData.safe:
            showInputField('codeSafe');
            break;
        case storyData.goToPC:
            showInputField('passwordPC');
            break;
    }

    // these scenarios will be handled/shown differently. These are the 'save points', where you can go back to
    if (scenario == storyData.investigation || scenario === storyData.investigationContinues || scenario === storyData.finalInvestigation) {
        investigation(scenario);
        return;
    }

    // for scenarios that contain an item
    // if there is an item in that scenario (see json file), a new instance of the Item class will be created and added to the inventory
    if (scenario.item) {
        let newItem = new Item(scenario.item.image, scenario.item.inspect, scenario.item.name, scenario.item.description, scenario.item.options);
        takeItem(newItem);
        inventoryIcon.style.display = "inline";
    }

    // needed for the inital 3 hearts
    // otherwise showHP() is only triggered after reducing hp for the first time
    // but also needed to hide the inventoryIcon
    if (scenario === storyData.arrestPerson['Assistant']) {
        showHP(playerHP);
        inventoryIcon.style.display = "none";
    }
}

// reset for try again (if died during fight) or for restarting the entire game
/* instead of creating 2 different functions (one for try again and one for restart the game), I created one function for both cases
as they have the same reset settings, but depending on the parameter they either advance to the start of the game or to the fight introduction (rachel arrest) */
function reset(goToScenario) {
    currSound.pause();
    inventoryIcon.style.display = 'none'
    hp.style.display = 'none';
    inputForm.reset();
    playerHP = 3;
    talkAttempts = 0;
    dodgeAttempts = 0;
    advanceTo(goToScenario);
}

inventoryIcon.addEventListener("click", toggleInventory);