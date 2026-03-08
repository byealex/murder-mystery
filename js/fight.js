const hp = document.querySelector(".hp");

let playerHP = 3;
let talkAttempts = 0;
let dodgeAttempts = 0;

// option 1 during the fight
function talkRachelDown() {
    talkAttempts++;

    const successChance = Math.random();
    // there is a 25% chance that the player will be successfull on the first or second try
    // on the third try the player will succeed, no matter what
    if (successChance > 0.75 || talkAttempts === 3) {
        advanceTo(storyData.talkAttempt.three);
    } else {
        switch (talkAttempts) {
            case 1: advanceTo(storyData.talkAttempt.one);
                break;
            case 2: advanceTo(storyData.talkAttempt.two);
                break;
            // case 3: advanceTo(storyData.talkAttempt.three);
            //     break;
        }
    }
}

// option 2 during the fight
function dodgeAndReposition() {
    dodgeAttempts++;

    const successChance = Math.random();
    // same concept as option 1 but with only 15% of success
    if (successChance > 0.85) {
        advanceTo(storyData.dodgeAttempt.three);
    } else {
        switch (dodgeAttempts) {
            case 1: advanceTo(storyData.dodgeAttempt.one);
                break;
            case 2: advanceTo(storyData.dodgeAttempt.two);
                break;
            case 3: advanceTo(storyData.dodgeAttempt.three);
                break;
        }
    }
}

// option 3 during the fight
// fight specific update of the inventory
// specifically, it changes the options for each item to an 'Use' option, so they can be used during the fight
function updatedInventory() {
    inventory.forEach(item => {
        item.options = [{ "name": "Use", "action": `useInventory('${item.name}')` }];
    });

    // opens the inventory when option 3 is selected, but has to be after the forEach loop, otherwise the options aren't updated when inventory opens
    toggleInventory();
}

function useInventory(itemName) {
    // need to store the index of the selected item, so I can remove it from the inventory after it got used
    const index = inventory.findIndex(inventoryItem => inventoryItem.name === itemName);

    // hides the Inventory UI again after player has selected an item
    toggleInventory();

    // depending on the item the player choose, a different text will be shown
    switch (itemName) {
        case "Gun": advanceTo(storyData.useInventoryItem.gun);
            break;
        case "Keys":
            advanceTo(storyData.useInventoryItem.keys);
            break;
        case "Document":
            advanceTo(storyData.useInventoryItem.document);
            break;
        case "Pocket watch":
            advanceTo(storyData.useInventoryItem.pocketWatch);
            break;
    }

    // this part removes the item at the index
    inventory.splice(index, 1);
}


function showHP(playerHP) {
    hp.style.display = "inline";
    hp.innerHTML = "";

    for (let i = 0; i < playerHP; i++) {
        hp.innerHTML += `<img src="./images/ui/heart.png">`;
    }
}

function loseHP() {
    playerHP--;
    showHP(playerHP);
    advanceTo(playerHP <= 0 ? storyData.death : storyData.fight);
}