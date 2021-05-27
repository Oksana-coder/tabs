'use strict';

class Tabs {
    constructor({ rootSelector, activeControlClass = 'active', activePaneClass = 'active', activeTab = 1, }) {
        this._refs = this._getRefs(rootSelector);
        this._activeControlClass = activeControlClass;
        this._activePaneClass = activePaneClass;
        this._activeTabIndex = activeTab - 1; // index of the active tab by default (upon loading)

        this._bindEvents();

        this._setActiveTab();
    }

    _getRefs(root) {
        const refs = {};

        refs.controls = document.querySelector(`${root} [data-controls]`);
        refs.panes = document.querySelector(`${root} [data-panes]`);

        return refs;
    }

    _bindEvents() { // for binding all events, the realisation of specific event will be in the eventListener
        this._refs.controls.addEventListener('click', this._onControlClick.bind(this)); // need to bind the context, otherwise this of onControlClick will refer to the controls not to tabs
    } 

    _onControlClick(event) {
        event.preventDefault(); // not a must, as we have anchors in hrefs
    
        if (event.target.nodeName !== 'A') { // checking that the click occurs on the link (<a></a>)
            return;
        }

        this._removeActiveTab();
        
        const controlItem = event.target;
        controlItem.classList.add(this._activeControlClass);

        const paneId = this._getPaneId(controlItem);
        this._setActivePane(paneId); // dispaying a chosen pane
    }

    _setActiveTab() {
        const controlItems = this._refs.controls.querySelectorAll('a');
        const control = controlItems[this._activeTabIndex];

        control.classList.add(this._activeControlClass);

        const paneId = this._getPaneId(control);
        this._setActivePane(paneId);
    }

    _removeActiveTab() {
        const currentActiveControlItem = this._refs.controls.querySelector(`.${this._activeControlClass}`);
        
        if (!currentActiveControlItem) {
            return;
        }

        currentActiveControlItem.classList.remove(this._activeControlClass); // checking if there is already another active control and making it inactive
        
        const paneId = this._getPaneId(currentActiveControlItem);
        this._removeActivePane(paneId)
    }

    _setActivePane(paneId) {
        const pane = this._getPaneById(paneId);
        pane.classList.add(this._activePaneClass); // dispaying a chosen pane
    }

    _removeActivePane(paneId) {
        const pane = this._getPaneById(paneId);
        pane.classList.remove(this._activePaneClass); // making the previous active pane inactive
    }

    _getPaneId(control) {  // getting anchor without # to use for id search
    return control.getAttribute('href').slice(1);
    }

    _getPaneById(id) {
        return this._refs.panes.querySelector(`#${id}`);
    } 

}

const tabs1 = new Tabs({
    rootSelector: '#tabs-1',
    activeControlClass: 'controls__item--active',
    activePaneClass: 'pane--active',
    activeTab: 1,
});

console.log(tabs1);

const tabs2 = new Tabs({
    rootSelector: '#tabs-2',
    activeControlClass: 'controls__item--active',
    activePaneClass: 'pane--active',
    activeTab: 1,
});

console.log(tabs1);