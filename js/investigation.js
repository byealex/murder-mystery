function investigation(scenario) {
    characterImage.innerHTML = "";
    gameButtons.innerHTML = "";

    changeDescription(scenario.description);
    changeButtons(scenario.options);
    changeText(null, scenario.text);

    // this will dynamically create a new div for each suspect, depending on the investigation phase 
    scenario.suspects.forEach(suspect => {
        showSuspects(suspect.image, suspect.description, suspect.action);
    });
}

//investigation specific dialogues and not generic ones
function talkToPerson(person) {
    description.innerHTML = '';
    suspectsDiv.innerHTML = '';

    const suspect = storyData.dialogues[`${person}`];

    changeImage(suspect.image);

    // depending on the currentScenario, a different text and different buttons will be shown
    if (suspect.finalPhase && currentScenario === storyData.finalInvestigation) {
        changeText(suspect.name, suspect.finalPhase.text);
        changeButtons(suspect.finalPhase.options);
        return;
    }
    else if (suspect.nextPhase && currentScenario === storyData.investigationContinues) {
        changeText(suspect.name, suspect.nextPhase.text);
        changeButtons(suspect.nextPhase.options);
        return;
    }
    else {
        changeText(suspect.name, suspect.text);
        changeButtons(storyData.dialogues.options);
    }
}