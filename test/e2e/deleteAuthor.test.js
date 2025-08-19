import { Builder, By, until } from 'selenium-webdriver'
import { saveScreenshot } from '../utils/saveScreenshot.js';
import assert from 'assert'


describe('Delete Author Test', function(){
        this.timeout(20000);
        let driver

    beforeEach(async function() {
        //Launch Browser
        driver = await new Builder().forBrowser("chrome").build()
    })

    afterEach(async function(){
        if(driver){
            await driver.quit();
        }
    })

    it ('Se debe eliminar un autor de forma correcta:', async function(){
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


            //Navigate to authors
            await driver.get("http://localhost:3000/authors/index")

            //Delete
            const authorName = "Gabriel García Márquez";
            const expectedURL = "http://localhost:3000/authors/index"

            const deleteButton = await driver.findElement(
                By.xpath(`//h4[text()='${authorName}']/ancestor::div[@class='card']//button[contains(@class, 'delete-author')]`)
            );

            await driver.executeScript("arguments[0].scrollIntoView(true);", deleteButton);

            await driver.executeScript("arguments[0].click();", deleteButton);

            await driver.wait(until.alertIsPresent(), 5000);
            let confirmAlert = await driver.switchTo().alert();
            await confirmAlert.accept();

            await driver.wait(until.alertIsPresent(), 5000);
            await confirmAlert.accept();

            await driver.sleep(1000);


            //Confirmation
            await driver.wait(until.urlIs(expectedURL), 10000);
            
        
            currentURL = await driver.getCurrentUrl();
            assert.strictEqual(currentURL, expectedURL, "La URL actual no coincide con la URL esperada.");


            const authors = await driver.findElements(By.xpath(`//h4[text()='${authorName}']`));
            assert.strictEqual(authors.length, 0, "El autor no fue eliminado.");
        
            console.log("Prueba exitosa. Se ha eliminado el autor con éxito.")

            saveScreenshot(driver, true, "deleteAuthorTests");

        }catch(err){
            console.error("La prueba ha fallado.")
            saveScreenshot(driver, false, "deleteAuthorTests");
            throw(err)
        }
    })
})
