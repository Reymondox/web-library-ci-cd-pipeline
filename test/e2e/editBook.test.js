import { Builder, By, until } from 'selenium-webdriver'
import { saveScreenshot } from '../utils/saveScreenshot.js';
import assert from 'assert'


describe('Edit Book Test', function(){
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

    it ('Se debe editar un libro de forma correcta.', async function(){
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


            //Navigate to edit a book
            await driver.get("http://localhost:3000/books/edit/20")

            //Edit
            const bookName = "Edit Book Test";
            const expectedURL = "http://localhost:3000/books/index"

            const nameInput = await driver.wait(until.elementLocated(By.id("book-name")))
            nameInput.clear();
            nameInput.sendKeys(bookName);
        
            const saveButton = await driver.wait(until.elementLocated(By.id("create-button")))
            await driver.executeScript("arguments[0].click();", saveButton);

            //Confirmation
            await driver.wait(until.urlIs(expectedURL), 10000);
        
            currentURL = await driver.getCurrentUrl();
            assert.strictEqual(currentURL, expectedURL, "La URL actual no coincide con la URL esperada.");


            const foundedBookName = await driver.wait(until.elementLocated(By.xpath(`//h4[contains(text(), '${bookName}')]`))).getText()
            assert.strictEqual(foundedBookName, bookName, "No se ha encontrado el libro editado.");
        
            console.log("Prueba exitosa. Se ha editado el libro con éxito.")

            saveScreenshot(driver, true, "editBookTests");

        }catch(err){
            console.error("La prueba ha fallado.")
            saveScreenshot(driver, false, "editBookTests");
            throw(err)
        }
    })
})
