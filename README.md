# Sproutify - A Collaborative Digital Garden (v2.0)

<p align="center">
  <img src="https://placehold.co/600x300/e8f5e9/4caf50/png?text=Sproutify+2.0" alt="Sproutify Banner">
</p>

<p align="center">
  <strong>Welcome to the new Sproutify, done by Khoa and Hữu!</strong> This is a unique collaborative experiment where creativity takes root. We provide the digital soil—a dynamic, modern web interface—and you provide the seeds of imagination. What will you grow?
</p>

---

## 🌱 The Core Concept

Sproutify is built on a simple yet powerful premise: **collective creativity within defined spaces**. Our shared canvas is a single `index.html` file, which dynamically loads up to 20 distinct "zones" (or apps).

Each zone is a blank slate, a pocket universe waiting for a creator to bring it to life. The challenge is to build something amazing—a mini-game, a piece of art, a useful tool, a stunning animation—entirely within the confines of a `div`. It's a test of creativity, skill, and the ability to make a big impact in a small space.

This revamped version introduces a modern frontend with two viewing modes: a **Launchpad** for a clean app-selection experience and a **Grid View** to see all creations at once.

## 🚀 New Project Structure

The project has been refactored for clarity and scalability. Here’s the new structure:

```
Sproutify/
├── css/
│   └── style.css       # All main styles for the shell interface
├── js/
│   └── main.js         # All main JavaScript for the shell interface
├── index.html          # The main HTML skeleton and zone content storage
└── README.md           # This file
```

- **`index.html`**: Now only contains the basic page structure and, importantly, the `#zone-content-storage` div where all user-created zones live.
- **`css/style.css`**: Handles the look and feel of the main interface (background, clock, launchpad, modal, etc.). It does NOT contain styles for the content *inside* the zones.
- **`js/main.js`**: Powers the dynamic features: clock, view switching, settings, and loading zones into the modal or grid view.

## 📫 How to Contribute

Ready to plant your creative seed? Here’s how you can contribute to the new Sproutify:

1.  **Fork & Clone**: Fork the project and clone it to your local machine.

2.  **Find an Empty Zone**: Open `index.html`. Scroll down to the `<div id="zone-content-storage">`. Find an empty zone, which looks like this:
    ```html
    <div class="zone-X" data-zone-name="Zone X">Zone X</div>
    ```

3.  **Add Your Creation**: 
    - Replace the placeholder text (`Zone X`) with your HTML content.
    - **Crucially, all your CSS and JS must be self-contained within your zone's `div`**. 
    - Add CSS inside a `<style>` tag.
    - Add JavaScript inside a `<script>` tag. It's highly recommended to wrap your JS in an IIFE `(function() { ... })();` to avoid polluting the global scope.

4.  **Update Zone Metadata**:
    - Change the `data-zone-name` attribute to the name of your app. This name will appear in the Launchpad.
    ```html
    <div class="zone-5" data-zone-name="My Awesome App">
        <!-- Your content, styles, and scripts here -->
    </div>
    ```

5.  **(Optional) Add a Custom Icon**:
    - Open `js/main.js` and find the `initialize` function.
    - Inside the `switch` statement for `zoneId`, add a new `case` for your zone number and provide a URL to your icon.
    ```javascript
    // ... inside the switch statement
    case 5: // Your zone number
        iconImageHTML = `<img src="https://your-icon-url.com/icon.png" class="app-icon-img">`;
        break;
    ```

6.  **Commit & Pull Request**: Commit your changes and open a pull request. Please describe your creation and which zone you've claimed.

## 📜 Rules of the Garden

1.  **Respect the Boundaries**: Your creation **must** be contained entirely within your chosen zone's `div`. Do not write code that tries to modify the main page layout (e.g., `document.body.style = ...`).
2.  **Keep it Self-Contained**: All HTML, CSS, and JS for your app must be inside your one `div`. This is how the project stays modular.
3.  **Be Original and Keep it Safe**: All content must be appropriate for a general audience. No offensive material, trackers, or malicious code.

---

<p align="center">
  <strong>Let's grow something amazing together!</strong>
</p>
