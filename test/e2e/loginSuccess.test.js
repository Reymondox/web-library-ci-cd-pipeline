import { Builder, By, until } from 'selenium-webdriver'
import { saveScreenshot } from '../utils/saveScreenshot.js';
import assert from 'assert'


describe('Login successfullness test', function(){
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

    it ('Debe iniciar sesion correctamente con email y contraseña correcto.', async function(){
        try{
            //Navigate to App Location
            await driver.get("http://localhost:3000/");

            //Login
            const email = "swunteronze@gmail.com";
            const password = "1234";
            const expectedURL = 'http://localhost:3000/home/index';
        
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

            console.log("Prueba exitosa. Se ha iniciado sesión con éxito")

            saveScreenshot(driver, true, "loginSuccessTests");
            
        }catch(err){
            console.error("La prueba ha fallado.")
            saveScreenshot(driver, false, "loginSuccessTests");
            throw(err)
        }
    })
})
