async function cookiebot(preferencies) {  // falta afegir nivells 2 i 3
    console.log("detects cookiebot")
    if(document.cookie.match("CookieConsent")){
        console.log("PrivacySmart: this website's cookies were already managed")
        return 0
    } 
    else{
        
        await waitUntilFound('#CybotCookiebotDialogBody')
        if(document.querySelector('#CybotCookiebotDialogBodyContentTextShowIABVendors')!== null){   //si comparteixen amb partners
            console.log("Vendors trobats")
            document.querySelector('#CybotCookiebotDialogBodyContentTextShowIABVendors').click();
            await waitUntilFound('.CybotCookiebotDialogBodyLevelButtonIABHeaderToggleDeselectVendorsLink');   //deneguem partners
            CybotCookiebotDialogBodyLevelButtonIABHeaderToggleDeselectVendorsLink   //tambe pot ser aixi el reject partners
            document.querySelector('#CybotCookiebotDialogBodyLevelButtonPreferences').click();   //deneguem preferencies
            document.querySelector('#CybotCookiebotDialogBodyLevelButtonStatistics').click();   //deneguem estadistiques
            document.querySelector('#CybotCookiebotDialogBodyLevelButtonMarketing').click();   //deneguem marketing
            //document.querySelector('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection').click();   //permetem la seleccio
            
        }
        else console.log("Vendors NOT found")



        /*if(preferencies<=2){
            await waitUntilFoundAndClick('#CybotCookiebotDialogBodyButtonDecline');
            console.log("Info Plugin Eduard: hem denegat les cookies per tu")
        }
        else{
            await waitUntilFoundAndClick('#CybotCookiebotDialogBodyButtonAccept');
            console.log("Info Plugin Eduard: hem acceptat les cookies per tu")
        }   */
        return 1 
    } 
}

//CybotCookiebotDialogBodyLevelDetailsButton

