# 🕵️ Murder Mystery

Murder Mystery is a small browser-based interactive story where the player investigates a murder case by questioning suspects, exploring clues, and progressing through different investigation scenarios.

The project focuses on a JSON-driven story system, where the narrative and scenarios are stored outside the core JavaScript logic and rendered dynamically in the browser.

---

## 🌐 Play the Game

[Click here to play the game!](https://byealex.github.io/murder-mystery/)

---

## 🧩 Gameplay

The game unfolds as an investigation where the player explores different scenarios and gathers information to move the story forward.

During the investigation you can:

- Talk to suspects  
- Explore locations  
- Collect and manage items  
- Review clues and continue the investigation  

Progression happens through a central investigation flow that allows the player to explore different interactions before continuing with the story.

---

## ⚙️ Core Mechanics

### Story System

- Story content is stored in a JSON file
- Scenarios contain dialogue, options, and outcomes
- The game loads and renders the current scenario dynamically

### Dynamic Interface

- UI elements appear or disappear depending on the scenario
- Some components (e.g. suspect layouts) are generated dynamically
- Dialogue, options, and visuals are separated into different HTML elements for flexible styling

### Inventory

- Items can be collected during the investigation
- Inventory opens in a separate interface
- Dialogue view is temporarily hidden while the inventory is open

---

## 🧠 Development Focus

The main goal of this project was learning how to structure a game around external story data.  
The narrative is stored in a JSON file and retrieved dynamically by the game to control scenario flow and player interactions.

---

## 🧱 Challenges

- Working with JSON-based story data instead of hardcoded logic
- Dynamically generating UI elements for certain scenes
- Designing an inventory interface that does not interrupt the dialogue flow

---

## ✍️ Reflection

### What went well

- The investigation flow works reliably
- Separating story data from logic improved flexibility

### Lessons learned

- Structuring code early helps avoid complexity later
- Even small projects benefit from clear separation of data and logic
