//first need to import test & expect from playwright jars
const {test, expect} = require('@playwright/test')


test('browser context playwright test', async ({browser})=>{
    //playwright code---
    //Important:-> playwright is asynchronous means there  is no guarantee that code will run in sequence so use async/await 


    //here we are using browser fixture to create fresh stance of browser like  ecagnito mode & if  we  want we can also inject cookies
    const browserContext= await browser.newContext();
    const page = await browserContext.newPage();

    await page.goto("https://playwright.dev/docs/intro");

    //validating the title
    const actualTitle= await page.title();
    await expect(page).toHaveTitle(actualTitle);


});

test("Login test", async ({page})=>{

   //here playwright understood that we do need to  send any customized cookies, user only want to open the  browser and create the page
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   
   const userNameLocator = page.getByRole('textbox', {name:'Username'});
   const signInLocator = page.locator('#signInBtn');

   const actualTitle=await  page.title();
   await console.log("ActualTitle : "+ actualTitle);
   await expect(page).toHaveTitle(actualTitle);

   await page.getByRole('textbox', {name:'Username'}).fill("Karan");
   await page.locator('#password').fill('learning')
   await page.locator('#signInBtn').click();
   const errorMessage= await page.locator("[style*='block']").textContent(); // this method fill fetch the text content of selected element
   expect(errorMessage).toContain("Incorrect username/password");

   await userNameLocator.fill("");
   await userNameLocator.fill("rahulshettyacademy")
   await signInLocator.click();


});

test("Getting the name of first & second product  test", async ({page})=>{

   //here playwright understood that we do need to  send any customized cookies, user only want to open the  browser and create the page
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   
   const userNameLocator = page.getByRole('textbox', {name:'Username'});
   const signInLocator = page.locator('#signInBtn');

   const actualTitle=await  page.title();
   await console.log("ActualTitle : "+ actualTitle);
   await expect(page).toHaveTitle(actualTitle);

   await page.getByRole('textbox', {name:'Username'}).fill("Karan");
   await page.locator('#password').fill('learning')
   await page.locator('#signInBtn').click();
   const errorMessage= await page.locator("[style*='block']").textContent(); // this method fill fetch the text content of selected element
   expect(errorMessage).toContain("Incorrect username/password");

   await userNameLocator.fill("");
   await userNameLocator.fill("rahulshettyacademy")
   await signInLocator.click();

   console.log("First product : ",await  page.locator('.card-body a').first().textContent());
   console.log("Second product : ",await  page.locator('.card-body a').nth(2).textContent());

});


test("Get the name of all product test", async ({page})=>{

   //here playwright understood that we do need to  send any customized cookies, user only want to open the  browser and create the page
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   
   const userNameLocator = page.getByRole('textbox', {name:'Username'});
   const signInLocator = page.locator('#signInBtn');
   const productTitlesLocator = page.locator('.card-body a');

   const actualTitle=await  page.title();
   await console.log("ActualTitle : "+ actualTitle);
   await expect(page).toHaveTitle(actualTitle);

   await page.getByRole('textbox', {name:'Username'}).fill("Karan");
   await page.locator('#password').fill('learning')
   await page.locator('#signInBtn').click();
   const errorMessage= await page.locator("[style*='block']").textContent(); // this method fill fetch the text content of selected element
   expect(errorMessage).toContain("Incorrect username/password");

   await userNameLocator.fill("");
   await userNameLocator.fill("rahulshettyacademy")
   await signInLocator.click();

   await  page.locator('.card-body a').first().waitFor();

   const allTitlesResult= await productTitlesLocator.allTextContents();
   await console.log("All title result",allTitlesResult);
    
    
});



test("Get the name of all product with via waitForLoadState test", async ({page})=>{

   //here playwright understood that we do need to  send any customized cookies, user only want to open the  browser and create the page
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   
   const userNameLocator = page.getByRole('textbox', {name:'Username'});
   const signInLocator = page.locator('#signInBtn');
   const productTitlesLocator = page.locator('.card-body a');

   const actualTitle=await  page.title();
   await console.log("ActualTitle : "+ actualTitle);
   await expect(page).toHaveTitle(actualTitle);

   await page.getByRole('textbox', {name:'Username'}).fill("Karan");
   await page.locator('#password').fill('learning')
   await page.locator('#signInBtn').click();
   const errorMessage= await page.locator("[style*='block']").textContent(); // this method fill fetch the text content of selected element
   expect(errorMessage).toContain("Incorrect username/password");

   await userNameLocator.fill("");
   await userNameLocator.fill("rahulshettyacademy")
   await signInLocator.click();

   await page.waitForLoadState('networkidle'); //this wait method will wait for all api load

  //  await  page.locator('.card-body a').first().waitFor();

   const allTitlesResult= await productTitlesLocator.allTextContents();
   await console.log("All title result",allTitlesResult);
    
    
});


test("static dropdown handling  test", async ({page})=>{

   //here playwright understood that we do need to  send any customized cookies, user only want to open the  browser and create the page
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   
   const userNameLocator = page.getByRole('textbox', {name:'Username'});
   const signInLocator = page.locator('#signInBtn');
   const dropdownLocator = page.locator()
   const productTitlesLocator = page.locator('.card-body a');

   const actualTitle=await  page.title();
   await console.log("ActualTitle : "+ actualTitle);
   await expect(page).toHaveTitle(actualTitle);

   await page.getByRole('textbox', {name:'Username'}).fill("Karan");
   await page.locator('#password').fill('learning')
   await page.locator('#signInBtn').click();
   const errorMessage= await page.locator("[style*='block']").textContent(); // this method fill fetch the text content of selected element
   expect(errorMessage).toContain("Incorrect username/password");

   await userNameLocator.fill("");
   await userNameLocator.fill("rahulshettyacademy")

   const dropdown = await page.locator('select.form-control');
   await dropdown.selectOption('consult');
  // await page.pause();
   await signInLocator.click();

   await page.waitForLoadState('networkidle'); //this wait method will wait for all api load

  //  await  page.locator('.card-body a').first().waitFor();
   const allTitlesResult= await productTitlesLocator.allTextContents();
   await console.log("All title result",allTitlesResult);
    
    
});

test("click on radio test", async ({page})=>{

   //here playwright understood that we do need to  send any customized cookies, user only want to open the  browser and create the page
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   
   const userNameLocator = page.getByRole('textbox', {name:'Username'});
   const signInLocator = page.locator('#signInBtn');
   const dropdownLocator = page.locator()
   const productTitlesLocator = page.locator('.card-body a');

   const actualTitle=await  page.title();
   await console.log("ActualTitle : "+ actualTitle);
   await expect(page).toHaveTitle(actualTitle);

   await page.getByRole('textbox', {name:'Username'}).fill("Karan");
   await page.locator('#password').fill('learning')
   await page.locator('#signInBtn').click();
   const errorMessage= await page.locator("[style*='block']").textContent(); // this method fill fetch the text content of selected element
   expect(errorMessage).toContain("Incorrect username/password");

   await userNameLocator.fill("");
   await userNameLocator.fill("rahulshettyacademy")

   const dropdown = await page.locator('select.form-control');
   await dropdown.selectOption('consult');

   const userRadiobutton=await page.locator("[value='user']");
   await  userRadiobutton.click();   
   const okaybutton= await page.locator('#okayBtn');
   await okaybutton.waitFor();
   await okaybutton.click();

   console.log(await userRadiobutton.isChecked());
   expect(await userRadiobutton.isChecked()); 

   await signInLocator.click();

   await page.waitForLoadState('networkidle'); //this wait method will wait for all api load

  //  await  page.locator('.card-body a').first().waitFor();
   const allTitlesResult= await productTitlesLocator.allTextContents();
   await console.log("All title result",allTitlesResult);
    
    
});


test("check & uncheck on  checkbox test", async ({page})=>{

   //here playwright understood that we do need to  send any customized cookies, user only want to open the  browser and create the page
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   
   const userNameLocator = page.getByRole('textbox', {name:'Username'});
   const signInLocator = page.locator('#signInBtn');
   const dropdownLocator = page.locator()
   const productTitlesLocator = page.locator('.card-body a');

   const actualTitle=await  page.title();
   await console.log("ActualTitle : "+ actualTitle);
   await expect(page).toHaveTitle(actualTitle);

   await page.getByRole('textbox', {name:'Username'}).fill("Karan");
   await page.locator('#password').fill('learning')
   await page.locator('#signInBtn').click();
   const errorMessage= await page.locator("[style*='block']").textContent(); // this method fill fetch the text content of selected element
   expect(errorMessage).toContain("Incorrect username/password");

   await userNameLocator.fill("");
   await userNameLocator.fill("rahulshettyacademy")

   const dropdown = await page.locator('select.form-control');
   await dropdown.selectOption('consult');

   const userRadiobutton=await page.locator("[value='user']");
   await  userRadiobutton.click();   
   const okaybutton= await page.locator('#okayBtn');
   await okaybutton.waitFor();
   await okaybutton.click();

   console.log(await userRadiobutton.isChecked());
   expect(await userRadiobutton.isChecked()); 

   const checkboxLocator=  await page.locator('#terms');
   await checkboxLocator.waitFor(); // so .waitFor() method can not be chained with action
    await checkboxLocator.click();

   console.log(await checkboxLocator.isChecked());
   expect(await checkboxLocator.isChecked());
   expect( await checkboxLocator.isChecked()).toBeTruthy();

   await checkboxLocator.uncheck();
   console.log(await checkboxLocator.isChecked());
   expect(await checkboxLocator.isChecked()).toBeFalsy();
 
   await signInLocator.click();

   await page.waitForLoadState('networkidle'); //this wait method will wait for all api load

  //  await  page.locator('.card-body a').first().waitFor();
   const allTitlesResult= await productTitlesLocator.allTextContents();
   await console.log("All title result",allTitlesResult);
    
    
});

test("chech whether blicking link is there or not test", async ({page})=>{

   //here playwright understood that we do need to  send any customized cookies, user only want to open the  browser and create the page
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   
   const userNameLocator = page.getByRole('textbox', {name:'Username'});
   const signInLocator = page.locator('#signInBtn');
   const dropdownLocator = page.locator()
   const productTitlesLocator = page.locator('.card-body a');

   const actualTitle=await  page.title();
   await console.log("ActualTitle : "+ actualTitle);
   await expect(page).toHaveTitle(actualTitle);

   await page.getByRole('textbox', {name:'Username'}).fill("Karan");
   await page.locator('#password').fill('learning')
   await page.locator('#signInBtn').click();
   const errorMessage= await page.locator("[style*='block']").textContent(); // this method fill fetch the text content of selected element
   expect(errorMessage).toContain("Incorrect username/password");

   await userNameLocator.fill("");
   await userNameLocator.fill("rahulshettyacademy")

   const dropdown = await page.locator('select.form-control');
   await dropdown.selectOption('consult');

   const userRadiobutton=await page.locator("[value='user']");
   await  userRadiobutton.click();   
   const okaybutton= await page.locator('#okayBtn');
   await okaybutton.waitFor();
   await okaybutton.click();

   console.log(await userRadiobutton.isChecked());
   expect(await userRadiobutton.isChecked()); 

   const checkboxLocator=  await page.locator('#terms');
   await checkboxLocator.waitFor(); // so .waitFor() method can not be chained with action
    await checkboxLocator.click();

   console.log(await checkboxLocator.isChecked());
   expect(await checkboxLocator.isChecked());
   expect( await checkboxLocator.isChecked()).toBeTruthy();

   await checkboxLocator.uncheck();
   console.log(await checkboxLocator.isChecked());
   expect(await checkboxLocator.isChecked()).toBeFalsy();

   //checking the  blinking link
   const blinkingLinkLocator = await page.locator("[href*='documents-request']");
   await expect(blinkingLinkLocator).toHaveAttribute('class','blinkingText'); // attributes: class="blinkingText"
 
   await signInLocator.click();

   await page.waitForLoadState('networkidle'); //this wait method will wait for all api load

  //  await  page.locator('.card-body a').first().waitFor();
   const allTitlesResult= await productTitlesLocator.allTextContents();
   await console.log("All title result",allTitlesResult);
    
    
});