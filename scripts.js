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

async function waitUntilFixed(selector) {
    return new Promise((resolve) => {
        function callback(document) {
            if (document.querySelector(selector).style.position == 'fixed') {
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


async function waitForAny(selector){
    return new Promise((resolve) => {
        function callback(document) {
            for (const property in selector) {
                if (document.querySelector(selector[property])) {
                    observer.disconnect();
                    resolve(property);
                }
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

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }