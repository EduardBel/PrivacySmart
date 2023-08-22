async function didomi(preferencies) {
    if(document.cookie.match("euconsent-v2")){
        console.log("PrivacySmart: this website's cookies were already managed")
        return 0
    } 
    else{
        if(preferencies==4){
            await waitUntilFoundAndClick('#didomi-notice-agree-button');  //acceptem tot
            if(document.cookie.match("euconsent-v2")){
                console.log("PrivacySmart: cookies have been accepted for you")
                return 1
            }
        }
        else {
            await waitUntilFoundAndClick('#didomi-notice-learn-more-button'); //cliquem a configuracio de cookies
            await waitUntilFoundAndClick('.didomi-consent-popup-view-vendors-list-link')  //cliquem els vendors
            await waitUntilFoundAndClick('.didomi-components-radio .didomi-components-radio__option--unselected:first-child') //els bloquejem tots
            await waitUntilFoundAndClick('[aria-describedby="didomi-popup-vendors-title"]') //desem i tornem a la configuracio
            if(preferencies==3){    //rebutjar socis, acceptar la resta
                await waitUntilFoundAndClick('.didomi-components-radio .didomi-components-radio__option--unselected:nth-child(2)');  //fem que si a tot
                await waitUntilFoundAndClick('[aria-describedby="didomi-consent-popup-information-save"]')  //guardem
                
                if(document.cookie.match("euconsent-v2")){
                    console.log("PrivacySmart: we accepted the cookies but denied vendors for you")
                    return 1
                } 
            }
            else if(preferencies==2){   //rebutjar socis, rebutjar algunes(perfil i tal)
                await waitUntilFoundAndClick('.didomi-components-radio .didomi-components-radio__option--unselected:first-child');  //fem que no a tot

                if(document.querySelector('[aria-describedby="didomi-purpose-geolocation_data"]:nth-child(2)')!== null)
                    document.querySelector('[aria-describedby="didomi-purpose-geolocation_data"]:nth-child(2)').click();  // //acceptem les concretes
                if(document.querySelector('[aria-describedby="didomi-purpose-improve_products"]:nth-child(2)')!==null)
                    document.querySelector('[aria-describedby="didomi-purpose-improve_products"]:nth-child(2)').click();
                if(document.querySelector('[aria-describedby="didomi-purpose-market_research"]:nth-child(2)')!==null)
                    document.querySelector('[aria-describedby="didomi-purpose-market_research"]:nth-child(2)').click();
                if(document.querySelector('[aria-describedby="didomi-purpose-measure_content_performance"]:nth-child(2)')!==null)
                    document.querySelector('[aria-describedby="didomi-purpose-measure_content_performance"]:nth-child(2)').click();
                if(document.querySelector('[aria-describedby="didomi-purpose-measure_ad_performance"]:nth-child(2)')!==null)
                    document.querySelector('[aria-describedby="didomi-purpose-measure_ad_performance"]:nth-child(2)').click();
                if(document.querySelector('[aria-describedby="didomi-purpose-select_basic_ads"]:nth-child(2)')!==null)
                    document.querySelector('[aria-describedby="didomi-purpose-select_basic_ads"]:nth-child(2)').click();
                if(document.querySelector('[aria-describedby="didomi-purpose-cookies"]:nth-child(2)')!==null)
                    document.querySelector('[aria-describedby="didomi-purpose-cookies"]:nth-child(2)').click();
                if( document.querySelector('[aria-describedby="didomi-purpose-geo_marketing_studies"]:nth-child(2)')!==null)
                    document.querySelector('[aria-describedby="didomi-purpose-geo_marketing_studies"]:nth-child(2)').click();

                await waitUntilFoundAndClick('[aria-describedby="didomi-consent-popup-information-save"]')  //guardem
                
                if(document.cookie.match("euconsent-v2")){
                    console.log("PrivacySmart: we denied vendors and profile cookies for you")
                    return 1
                }                
            }
            else{   //preferencies = 1 rebutjar TOT
                await waitUntilFoundAndClick('.didomi-components-radio .didomi-components-radio__option--unselected:first-child');  //fem que no a tot
                await waitUntilFoundAndClick('[aria-describedby="didomi-consent-popup-information-save"]')  //guardem
                console.log("PrivacySmart: test")

                if(document.cookie.match("euconsent-v2")){
                    console.log("PrivacySmart: cookies have been refused for you")
                    return 1
                } 
            }
        } 
    } 


}