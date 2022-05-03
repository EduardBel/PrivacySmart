function cookiebot(preferencies) {  // falta afegir nivells 2 i 3
    if(document.cookie.match("CookieConsent")){
        console.log("Info Plugin Eduard: les cookies d'aquest lloc ja havien estat manegades")
        return 0
    } 
    else{
        if(preferencies<=2){
            document.getElementById('CybotCookiebotDialogBodyButtonDecline').click();
            console.log("Info Plugin Eduard: hem denegat les cookies per tu")
        }
        else{
            document.getElementById('CybotCookiebotDialogBodyButtonAccept').click();
            console.log("Info Plugin Eduard: hem acceptat les cookies per tu")
        }   
        return 1 
    } 
}