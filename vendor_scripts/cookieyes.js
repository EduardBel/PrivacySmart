async function cookieyes(preferencies) {
    return new Promise(async (resolve) => {

    if(document.cookie.match("PluginTFG")){
        console.log("PrivacySmart: this website's cookies were already managed")
        return 0
    } 
    else{
        await waitUntilFixed('#cookie-law-info-bar').then(async ()=>{
            if(preferencies==4){
                await waitUntilFoundAndClick(".cookie_action_close_header")  //acceptem tot
                setCookie("PluginTFG", "1", 365);   //creem cookie propia per saber que s'han manegat les cookies
                console.log("PrivacySmart: cookies have been accepted for you")
                resolve(1);
            }
            else {
                if(document.querySelector('.cli_settings_button')== null){
                        document.getElementById('cookie-law-info-bar').style.position="relative"    //fa que s'amagui el banner
                        console.log("PrivacySmart: this website's cookies can't be managed, so we hid the banner")
                        resolve(0);   
                } 
                else{
                    //hi ha boto de settings
                    await waitUntilFoundAndClick(".cli_settings_button");

                    if(preferencies==3){    //rebutjar socis(wt-cli-checkbox-vendor-partner), acceptar la resta
                        if(document.querySelector('#wt-cli-checkbox-functional')!== null)   //cookies funcionals
                            document.querySelector('#wt-cli-checkbox-functional').click();
                        if(document.querySelector('#wt-cli-checkbox-performance')!== null)   //cookies de performance
                            document.querySelector('#wt-cli-checkbox-performance').click();
                        if(document.querySelector('#wt-cli-checkbox-analytics')!== null)   //cookies analitiques
                            document.querySelector('#wt-cli-checkbox-analytics').click();
                        if(document.querySelector('#wt-cli-checkbox-advertisement')!== null)   //cookies d'anuncis
                            document.querySelector('#wt-cli-checkbox-advertisement').click();
                        if(document.querySelector('#wt-cli-checkbox-others')!== null)   //altres
                            document.querySelector('#wt-cli-checkbox-others').click();
                        
                        await waitUntilFoundAndClick("#wt-cli-privacy-save-btn");   //apliquem la configuracio
                        setCookie("PluginTFG", "1", 365);   //creem cookie propia per saber que s'han manegat les cookies
                        console.log("PrivacySmart: we accepted the cookies but denied vendors for you")
                        resolve(1);
                        
                    }
                    else if(preferencies==2){   //rebutjar socis, rebutjar algunes(perfil i tal)
                        if(document.querySelector('#wt-cli-checkbox-functional')!== null)   //cookies funcionals
                            document.querySelector('#wt-cli-checkbox-functional').click();
                        if(document.querySelector('#wt-cli-checkbox-performance')!== null)   //cookies de performance
                            document.querySelector('#wt-cli-checkbox-performance').click();

                        await waitUntilFoundAndClick("#wt-cli-privacy-save-btn");   //apliquem la configuracio
                        setCookie("PluginTFG", "1", 365);   //creem cookie propia per saber que s'han manegat les cookies
                        console.log("PrivacySmart: we denied vendors and profile cookies for you")
                        resolve(1);             
                    }
                    else{   //preferencies = 1 rebutjar TOT
                        await waitUntilFoundAndClick("#wt-cli-privacy-save-btn");   //apliquem la configuracio
                        setCookie("PluginTFG", "1", 365);   //creem cookie propia per saber que s'han manegat les cookies
                        console.log("PrivacySmart: cookies have been refused for you")
                        resolve(1);
                    }
                } 
            }
        });
    } 
})

}