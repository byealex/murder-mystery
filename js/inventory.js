const inventoryIcon = document.querySelector("#inventoryIcon");
const inventoryUI = document.querySelector(".inventoryUI");
const dialogBox = document.querySelector(".dialog-box");

let inventory = [];
let displayInventory = false;

// pushes the item in the parameter into the inventory array
function takeItem(item) {
    // makes sure that if an item in the inventory has the same name as the given item (in the parameter) it's not added
    // otherwise there would be multiple instances of the 'same' item inside of the inventory
    if (!inventory.find(existingItem => existingItem.name === item.name)) {
        inventory.push(item);
    }
}

// for opening and closing inventory when clicked on the icon
function toggleInventory() {
    if (!displayInventory) {
        displayInventory = true;
        inventoryIcon.src = "./images/ui/open_inventory_icon.png";
        dialogBox.style.display = 'none';
        inventoryUI.style.display = 'inline';
        showInventoryItems(inventory);
        return;
    }
    if (displayInventory) {
        displayInventory = false;
        inventoryIcon.src = "./images/ui/inventory_icon.png";
        dialogBox.style.display = 'inline';
        inventoryUI.style.display = 'none';
    }
}

// needed for when game restarts
function resetInventory() {
    inventory = [{
        "image": "./images/items/item_gun.png",
        "inspect": "./images/items/item_gun.png",
        "name": "Gun",
        "description": "As a detective you might need a gun.",
        "options": [
            {
                "name": "View",
                "action": "inspectItem(inventory[0].inspect)"
            }
        ]
    }];
}