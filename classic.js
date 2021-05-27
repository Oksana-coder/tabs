'use strict';

const refs = {
    constrols: document.querySelector('#tabs-1 [data-controls]'), // #tabs-1 is a root selector
    panes: document.querySelector('#tabs-1 [data-panes]'),
}

refs.constrols.addEventListener('click', event => {
    event.preventDefault(); // not a must, as we have anchors in hrefs
    
    if (event.target.nodeName !== 'A') { // checking that the click occurs on the link (<a></a>)
        return;
    }
    const currentActiveControlItem = refs.constrols.querySelector('.controls__item--active');

    if (currentActiveControlItem) {
        currentActiveControlItem.classList.remove('controls__item--active'); // checking if there is already another active control and making it inactive
        
        const paneId = getPaneId(currentActiveControlItem);
        const pane = getPaneById(paneId);
        pane.classList.remove('pane--active'); // making the previous active pane inactive
    }

    const controlItem = event.target;
    controlItem.classList.add('controls__item--active');

    const paneId = getPaneId(controlItem);
    const pane = getPaneById(paneId);
    pane.classList.add('pane--active'); // dispaying a chosen pane

    console.log(pane);
})

function getPaneId(control) {  // getting anchor without # to use for id search
    return control.getAttribute('href').slice(1);
}

function getPaneById(id) {
    return refs.panes.querySelector(`#${id}`);
}