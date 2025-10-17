document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const clockContainer = document.getElementById('clock-container');
    const launchpadView = document.getElementById('launchpad-view');
    const gridView = document.getElementById('grid-view');
    const viewToggle = document.getElementById('view-toggle');
    const zoneStorage = document.getElementById('zone-content-storage');
    const modalPopup = document.getElementById('modal-popup');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalFullscreenBtn = document.getElementById('modal-fullscreen-btn');
    const settingsToggle = document.getElementById('settings-toggle');
    const settingsPanel = document.getElementById('settings-panel');
    const settingsCloseBtn = document.getElementById('settings-close-btn');
    const bgUrlInput = document.getElementById('bg-url-input');
    const bgBlurInput = document.getElementById('bg-blur-input');
    const bgBrightnessInput = document.getElementById('bg-brightness-input');
    const root = document.documentElement;

    // --- State ---
    let currentView = 'launchpad'; // 'launchpad' or 'grid'

    // --- Clock ---
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockContainer.textContent = `${hours}:${minutes}:${seconds}`;
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Settings ---
    function applySettings() {
        root.style.setProperty('--background-image-url', `url('${bgUrlInput.value}')`);
        root.style.setProperty('--background-blur', `${bgBlurInput.value}px`);
        root.style.setProperty('--background-brightness', bgBrightnessInput.value);
    }

    function saveSettings() {
        localStorage.setItem('sproutify-settings', JSON.stringify({
            bgUrl: bgUrlInput.value,
            bgBlur: bgBlurInput.value,
            bgBrightness: bgBrightnessInput.value,
        }));
    }

    function loadSettings() {
        const saved = JSON.parse(localStorage.getItem('sproutify-settings'));
        if (saved) {
            bgUrlInput.value = saved.bgUrl;
            bgBlurInput.value = saved.bgBlur;
            bgBrightnessInput.value = saved.bgBrightness;
        } else {
            // Default values
            bgUrlInput.value = 'https://www.skyweaver.net/images/media/wallpapers/wallpaper1.jpg';
            bgBlurInput.value = 5;
            bgBrightnessInput.value = 0.8;
        }
        applySettings();
    }

    [bgUrlInput, bgBlurInput, bgBrightnessInput].forEach(input => {
        input.addEventListener('input', applySettings);
        input.addEventListener('change', saveSettings);
    });
    settingsToggle.addEventListener('click', () => settingsPanel.classList.toggle('open'));
    settingsCloseBtn.addEventListener('click', () => settingsPanel.classList.remove('open'));

    // --- View Management ---
    function switchView(view) {
        if (view === 'grid') {
            launchpadView.classList.remove('active');
            gridView.classList.add('active');
            currentView = 'grid';
            viewToggle.checked = true;
        } else {
            gridView.classList.remove('active');
            launchpadView.classList.add('active');
            currentView = 'launchpad';
            viewToggle.checked = false;
        }
    }

    viewToggle.addEventListener('change', () => {
        switchView(viewToggle.checked ? 'grid' : 'launchpad');
    });

    // --- Zone & Modal Logic ---
    function executeScriptInNode(node) {
        const scripts = node.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
            newScript.appendChild(document.createTextNode(oldScript.innerHTML));
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    function openZoneInModal(zoneId) {
        const zoneContent = zoneStorage.querySelector(`.zone-${zoneId}`).cloneNode(true);
        modalContent.innerHTML = ''; // Clear previous content
        modalContent.appendChild(zoneContent);
        executeScriptInNode(modalContent); // IMPORTANT: Execute scripts in the new context
        modalPopup.style.display = 'flex';
    }

    function closeModal() {
        modalContent.innerHTML = ''; // Crucial for stopping game loops/intervals
        modalPopup.style.display = 'none';
    }

    modalCloseBtn.addEventListener('click', closeModal);
    modalFullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            modalContent.requestFullscreen();
        }
    });

    // --- Initialization ---
    function initialize() {
        // 1. Load settings
        loadSettings();

        // 2. Populate Launchpad and Grid View
        const zones = zoneStorage.querySelectorAll('[class^="zone-"]');
        zones.forEach((zone, index) => {
            const zoneId = index + 1;
            const zoneName = zone.dataset.zoneName || `Zone ${zoneId}`;

            // --- Create Launchpad Icon ---
            const launchpadItem = document.createElement('div');
            launchpadItem.className = 'launchpad-item';
            launchpadItem.dataset.zoneId = zoneId;

            let iconImageHTML;
            switch (zoneId) {
                case 1:
                    iconImageHTML = `<img src="https://cdn-icons-png.flaticon.com/512/747/747891.png" class="app-icon-img" alt="Space Invader Icon">`;
                    break;
                case 2:
                    iconImageHTML = `<img src="https://cdn-icons-png.flaticon.com/512/2913/2913333.png" class="app-icon-img" alt="Pomodoro Icon">`;
                    break;
                default:
                    iconImageHTML = `<div class="app-icon-img-placeholder">${zoneId}</div>`;
            }

            launchpadItem.innerHTML = `
                <div class="app-icon">${iconImageHTML}</div>
                <div class="app-icon-name">${zoneName}</div>
            `;
            launchpadItem.addEventListener('click', () => openZoneInModal(zoneId));
            launchpadView.appendChild(launchpadItem);

            // --- Move content to Grid View ---
            gridView.appendChild(zone.cloneNode(true));
        });

        // FIX: Execute scripts for the grid view after it has been populated
        executeScriptInNode(gridView);

        // 3. Set initial view
        switchView('launchpad');
    }

    initialize();
});