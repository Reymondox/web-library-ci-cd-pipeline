import { Builder, By, until } from 'selenium-webdriver'
import { saveScreenshot } from '../utils/saveScreenshot.js';
import assert from 'assert'

describe('Login failureness test', function(){
    this.timeout(20000);
    let driver

    beforeEach(async function() {
        const options = new chrome.Options()
            .addArguments("--headless=new")
            .addArguments("--no-sandbox")
            .addArguments("--disable-dev-shm-usage")
            .addArguments(`--user-data-dir=/tmp/chrome-profile-${Date.now()}`)
            .addArguments("--disable-gpu");
    
        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();
    });
    afterEach(async function(){
        if(driver){
            await driver.quit();
        }
    })

    it ('No debe iniciar sesion con el correo correcto y la contraseña incorrecta.', async function(){
        try{
            //Navigate to App Location
            await driver.get("http://localhost:3000/");

            //Login
            const email = "swunteronze@gmail.com";
            const password = "ABCD";
            const expectedURL = 'http://localhost:3000/';

            const emailInput = await driver.wait(until.elementLocated(By.id("user-email")))
            emailInput.sendKeys(email);

            const passwordInput = await driver.wait(until.elementLocated(By.id("user-pass")))
            passwordInput.sendKeys(password);

            const submitButton = await driver.wait(until.elementLocated(By.id("create-button")))
            submitButton.click();

            //Assert
            await driver.wait(until.urlIs(expectedURL), 10000);

            let currentURL = await driver.getCurrentUrl();
            assert.strictEqual(currentURL, expectedURL, "La URL actual no coincide con la URL esperada.");

            console.log("Prueba exitosa. No se ha podido iniciar sesión");

            saveScreenshot(driver, true, "loginFailureTests");
        }catch(err){
            console.error("La prueba ha fallado.")
            saveScreenshot(driver, false, "loginFailureTests");
            throw(err)
        }
    })
})

