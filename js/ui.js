const body = document.querySelector("body");
const description = document.querySelector("#description");
const characterImage = document.querySelector("#characterImage");
const gameText = document.querySelector("#gameText");
const gameButtons = document.querySelector("#gameButtons");
const suspectsDiv = document.querySelector(".suspects");
const itemContainer = document.querySelector(".itemContainer");

function changeBackgroundImage(source) {
    if (source === undefined) {
        return;
    }

    body.style.backgroundImage = `url(${source})`;
}

function changeDescription(descriptionText) {
    description.innerHTML = '';

    if (descriptionText) {
        description.innerHTML = descriptionText;
    }
}

function changeImage(source) {
    // this time the characterImage needs to be cleared/removed only if there isn't an image defined
    // if it is defined, it will overwrite the existing characterImage and not be added to it, since here I use a '=' operator and not a '+='
    if (source === undefined) {
        characterImage.innerHTML = "";
        return;
    }

    characterImage.innerHTML = `<img src="${source}">`;
}

function changeText(talkingPerson, text) {
    if (!text) {
        text = "";
    }

    text = text.replace('PLAYER', playerName);

    // content here is simply the person that is talking (e.g. Officer)
    let content = "";
    if (talkingPerson) {
        content = `<span>${talkingPerson}: </span>`;
    }

    // if there is a talking person: append the text to the talking person which creates this new content (e.g. Officer: lorem ipsum)
    // otherwise content will just be an empty string and nothing will happen
    content += text;

    // same concept as the talking person, but in this case: content is the text that is appended to the errorMessage (if there is one)
    // since there are no scenarios where there is a talking person and a errorMessage, I let the content be the variable for both cases
    let errorMessage = "";
    if (currentScenario.errorMessage) {
        errorMessage = showError ? currentScenario.errorMessage : '';
        content = errorMessage + "<br>" + content;
    }

    gameText.innerHTML = content;
}

function changeButtons(options) {
    // the buttons need to be cleared/removed for each call, regardless, if they are defined or not
    // otherwise the new buttons, will just be added at the back of the previous buttons
    gameButtons.innerHTML = "";

    if (options === undefined) {
        return;
    }

    // since options is an array and might contain 2 or more buttons/options, I need to go through all options, therefore I need a loop
    for (let i = 0; i < options.length; i++) {
        gameButtons.innerHTML += `<p><button onclick="${options[i].action}">${options[i].name}</button></p>`
    }
}

// shows the suspects as options for the investigation
function showSuspects(image, description, action) {
    // a new div is created dynamically for the suspect
    let newDiv = document.createElement("div");
    newDiv.innerHTML += `<img src="${image}" onclick=${action}>`;
    newDiv.innerHTML += `<p>${description}</p>`

    // the newly, dynamically created div is appended to/placed inside of the suspectsDiv, which is just a big container with all suspects inside. For styling purposes. 
    suspectsDiv.appendChild(newDiv);
}

// displays the items in the inventory
function showInventoryItems(items) {
    inventoryUI.innerHTML = "";

    items.forEach(item => {
        // for each item, a new div will be dynamically created with the class name itemContainer
        // the .itemContaienr styling is directly applied
        const itemContainer = document.createElement('div');
        itemContainer.className = "itemContainer";
        itemImage(itemContainer, item.image);
        itemText(itemContainer, item.name, item.description);
        itemButtons(itemContainer, item.options);

        // each dynamically itemContainer div will be added inside of the inventoryUI div
        inventoryUI.append(itemContainer);
    });
}

// item specific changes, only applied to items in the inventory. For styling purposes.
function itemImage(itemContainer, image) {
    itemContainer.innerHTML = `<img src="${image}"/>`
}

function itemText(itemContainer, name, description) {
    itemContainer.innerHTML += `<p><span>${name}</span>: ${description}</p>`;
}

function itemButtons(itemContainer, options) {
    for (let i = 0; i < options.length; i++) {
        itemContainer.innerHTML += `<p><button onclick="${options[i].action}">${options[i].name}</button></p>`;
    }
}