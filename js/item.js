const inspectItemImage = document.querySelector(".inspectItem");
const inspectItemContainer = document.querySelector(".inspectItemContainer");

class Item {
    constructor(image, inspectImage, name, description, options) {
        this.image = image;
        this.inspectImage = inspectImage;
        this.name = name;
        this.description = description;
        this.options = options;
    }
}

// this function assigns the given image as the inspect image and then shows the inspectItemContainer
function inspectItem(image) {
    if (inspectItemImage) {
        inspectItemImage.src = image;
        inspectItemContainer.style.display = 'flex';
    }
}

// makes sure items that have a 'Use' button (outside of the fight) are only used in the right scenario
function useItem() {
    /* if the current scenario has a 'nextScenario' (in json), only then the item can be used 
    because 'using' an item simply means it advances to that next scenario */
    if (currentScenario.nextScenario) {
        toggleInventory();
        advanceTo(storyData[currentScenario.nextScenario]);
    }
}

// simply overrides the inventory ui with the item text, if it has a 'Read' button
function readItem(text) {
    inventoryUI.innerHTML = text;
}

// the inspectItemContainer makes the "background" of the inspected Image clickable
// when clicked, the entire container with the image inside will be hidden; since the image is a child of the container, it will be hidden automatically as well
inspectItemContainer.addEventListener("click", () => {
    inspectItemContainer.style.display = 'none';
});