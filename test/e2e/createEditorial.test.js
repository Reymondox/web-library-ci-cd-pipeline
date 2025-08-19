import { Builder, By, until } from 'selenium-webdriver'
import { saveScreenshot } from '../utils/saveScreenshot.js';
import assert from 'assert'
import chrome from 'selenium-webdriver/chrome'


describe('Create editorial test', function(){
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

    it ('Se debe crear un nuevo editorial de forma correcta.', async function(){
        try{
            //Navigate to App Location
            await driver.get("http://localhost:3000/");

            //Login ToDo
            const email = "swunteronze@gmail.com";
            const password = "1234";
            const expectedLoginURL = 'http://localhost:3000/home/index';
        
            const emailInput = await driver.wait(until.elementLocated(By.id("user-email")))
            emailInput.sendKeys(email);
        
            const passwordInput = await driver.wait(until.elementLocated(By.id("user-pass")))
            passwordInput.sendKeys(password);
        
            const submitButton = await driver.wait(until.elementLocated(By.id("create-button")))
            submitButton.click();
        
            //Assert
            await driver.wait(until.urlIs(expectedLoginURL), 10000);
        
            let currentURL = await driver.getCurrentUrl();
            assert.strictEqual(currentURL, expectedLoginURL, "La URL actual no coincide con la URL esperada.");


            //Navigate to editorials creation form
            await driver.get("http://localhost:3000/editorials/create")

            //Add ToDo
            const editorialName = "Blue Ocean";
            const editorialNumber = "891-991-0541";
            const editorialCountry = 'Estados Unidos';
            const expectedURL = 'http://localhost:3000/editorials/index'

            const nameInput = await driver.wait(until.elementLocated(By.id("editorial-name")))
            nameInput.sendKeys(editorialName);
        
            const editorialInput = await driver.wait(until.elementLocated(By.id("editorial-phone")))
            editorialInput.sendKeys(editorialNumber);

            const countryInput = await driver.wait(until.elementLocated(By.id("editorial-country")))
            countryInput.sendKeys(editorialCountry);
        
            const saveButton = await driver.wait(until.elementLocated(By.id("create-button")))
            saveButton.click();

            await driver.wait(until.urlIs(expectedURL), 10000);
        
            currentURL = await driver.getCurrentUrl();
            assert.strictEqual(currentURL, expectedURL, "La URL actual no coincide con la URL esperada.");


            const foundedEditorialName = await driver.wait(until.elementLocated(By.xpath(`//h4[contains(text(), '${editorialName}')]`))).getText()
            assert.strictEqual(foundedEditorialName, editorialName, "No se ha encontrado el editorial creado.");
        
            console.log("Prueba exitosa. Se ha creado el editorial con éxito.")

            saveScreenshot(driver, true, "createEditorialTests");

        }catch(err){
            console.error("La prueba ha fallado.")
            saveScreenshot(driver, false, "createEditorialTests");
            throw(err)
        }
    })
})
