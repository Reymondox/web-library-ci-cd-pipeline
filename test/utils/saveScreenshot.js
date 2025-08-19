import fs from 'fs'
import path from 'path'

export async function saveScreenshot(driver, success, routeEndpoint){
    console.log("Generando captura...");
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${routeEndpoint}Result_${timestamp}.png`;


    const screenshot = await driver.takeScreenshot();
    if(success){
        fs.writeFileSync(`./screenshots/success/${routeEndpoint}/${fileName}`, screenshot, 'base64');
        console.log("Captura de pantalla guardada.")
        return
    }else{
        fs.writeFileSync(`./screenshots/failure/${routeEndpoint}/${fileName}`, screenshot, 'base64');
        console.log("Captura de pantalla guardada.")
        return
    }

}