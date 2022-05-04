async function waitUntilFound(selector) {
    return new Promise((resolve) => {
        function callback(document) {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve();
            }
        }
        const observer = new MutationObserver(() => {
            callback(document);
        });

        observer.observe(document.querySelector('html'), {
            subtree: true,
            childList: true,
            attributes: true,
        });
        callback(document);
    })
}

function clickAllElements(selector) {
    const elements = document.querySelectorAll(selector);
    for (const element of elements) {
        if (element instanceof HTMLElement) {
            element.click();
        }
    }
}

async function waitUntilFoundAndClick(selector){
        await waitUntilFound(selector);
        clickAllElements(selector);  //aixi espera a que s'hagi clicat tot per fer SCS
    }
