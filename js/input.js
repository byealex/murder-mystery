const form = document.querySelector("#inputForm");
const input = document.querySelector("#input");
const inputName = document.querySelector("#playerName");
const inputSafe = document.querySelector("#codeSafe");
const inputPC = document.querySelector("#passwordPC");

let currentInputType;
let showError = false;

function showInputField(type) {
    // makes sure to always display the form, when this function is called
    form.style.display = "block";

    // hide all the input fields first
    inputName.style.display = "none";
    inputSafe.style.display = "none";
    inputPC.style.display = "none";

    // show only the requested input field
    if (type === "playerName") {
        inputName.style.display = "inline";
        currentInputType = "playerName";
    } else if (type === "codeSafe") {
        inputSafe.style.display = "inline";
        currentInputType = "codeSafe";
    } else if (type === "passwordPC") {
        inputPC.style.display = "inline";
        currentInputType = "passwordPC";
    }

}

function checkInput(input) {
    // makes sure that whitespaces in front and at the back of the input, especially for the PC input, are removed
    input = input.trim();

    // check for Safe
    if (currentScenario === storyData.safe && input === "2953") {
        advanceTo(storyData.openedSafe);
        return;
    }
    // check for PC
    else if (currentScenario === storyData.goToPC && (input === "Time1973" || input === "time1973")) {
        advanceTo(storyData.informationAboutBlackwood);
        return;
    }
    // if input is wrong
    else {
        showError = true;
        changeText(null, currentScenario.text)
        showInputField(currentInputType);
    }
}

// event listener for the submit button
inputForm.addEventListener("submit", function (event) {
    event.preventDefault();

    switch (currentInputType) {
        case "playerName":
            playerName = inputName.value;
            inputForm.style.display = "none";
            advanceTo(storyData.proceedIntro);
            break;
        case "codeSafe":
            codeSafe = inputSafe.value;
            /* the next line is a small detail: it empties the input field when the code for the Safe is entered (only visible when entered code is false). On game restart it will be emptied either way. 
            Just a little detail to make the input more realistic, as you usually have to input the entire code again if it's the wrong code */
            inputSafe.value = "";
            checkInput(codeSafe);
            break;
        case "passwordPC":
            passwordPC = inputPC.value;
            inputPC.value = "";
            checkInput(passwordPC);
            break;
    }
});
