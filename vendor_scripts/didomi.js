async function didomi(preferencies) {
    console.log("Info Plugin Eduard: ENTRA A DIDOMI")
    if(document.cookie.match("euconsent-v2")){
        console.log("Info Plugin Eduard: les cookies d'aquest lloc ja havien estat manegades")
        return 0
    } 
    else{
        if(preferencies==4){
            document.getElementById('didomi-notice-agree-button').click();  //acceptem tot
            console.log("Info Plugin Eduard: hem acceptat les cookies per tu")
            return 1
        }
        else {
            await waitUntilFoundAndClick('#didomi-notice-learn-more-button'); //cliquem a configuracio de cookies
            await waitUntilFoundAndClick('.didomi-consent-popup-view-vendors-list-link')  //cliquem els vendors
            await waitUntilFoundAndClick('.didomi-components-radio .didomi-components-radio__option--unselected:first-child') //els bloquejem tots
            await waitUntilFoundAndClick('[aria-describedby="didomi-popup-vendors-title"]') //desem i tornem a la configuracio
            if(preferencies==3){    //rebutjar socis, acceptar la resta
                await waitUntilFoundAndClick('.didomi-components-button .didomi-button didomi-components-button--color .didomi-button-highlight highlight-button') //acceptem tot
                console.log("Info Plugin Eduard: hem acceptat les cookies però denegat els vendors per tu")
                return 1
            }
            else if(preferencies==2){   //rebutjar socis, rebutjar algunes(perfil i tal)
                await waitUntilFoundAndClick('.didomi-components-radio .didomi-components-radio__option--unselected:first-child');  //fem que no a tot
                await waitUntilFoundAndClick('[aria-describedby="didomi-purpose-geolocation_data"]:nth-child(2)')   //acceptem les concretes
                await waitUntilFoundAndClick('[aria-describedby="didomi-purpose-geolocation_data"]:nth-child(2)')
                await waitUntilFoundAndClick('[aria-describedby="didomi-purpose-improve_products"]:nth-child(2)')
                await waitUntilFoundAndClick('[aria-describedby="didomi-purpose-market_research"]:nth-child(2)')
                await waitUntilFoundAndClick('[aria-describedby="didomi-purpose-measure_content_performance"]:nth-child(2)')
                await waitUntilFoundAndClick('[aria-describedby="didomi-purpose-measure_ad_performance"]:nth-child(2)')
                await waitUntilFoundAndClick('[aria-describedby="didomi-purpose-select_basic_ads"]:nth-child(2)')
                await waitUntilFoundAndClick('[aria-describedby="didomi-purpose-cookies"]:nth-child(2)')
                await waitUntilFoundAndClick('[aria-describedby="didomi-purpose-geo_marketing_studies"]:nth-child(2)')

                //falta clicar el okay
                console.log("Info Plugin Eduard: hem denegat els vendors i les cookies de perfil per tu")
                return 1
            }
            else{   //preferencies = 1 rebutjar TOT
                document.getElementById('didomi-components-button didomi-button didomi-button-standard standard-button').click();   //denegar tot
                console.log("Info Plugin Eduard: hem denegat les cookies per tu")
                return 1
            }
        }
        
           
         
    } 
}