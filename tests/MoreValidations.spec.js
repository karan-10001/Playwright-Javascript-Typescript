const {test, expect}= require('@playwright/test');


test('Visible/Hidden validation test', async ({browser})=>{

    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto('https://www.google.com/');
    await page.goBack();
    await page.goForward();

    await expect(page.locator("input[name='show-hide']")).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator("input[name='show-hide']")).toBeHidden();


});

test('Alert popup/dialog validation test', async ({browser})=>{

    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

   
   //this is one time listner 
    page.once('dialog',dialog=>  dialog.dismiss()); // this is listener & it is waiting for pop-up to occur. 
    await page.locator('#confirmbtn').click();

    page.once('dialog',dialog=> dialog.accept()); // listener is waiting for any alert or dialog  to occur.
    await page.locator('#alertbtn').click();

    // stead of page.once we can use page.on('dialog', dialog=> dialog.dismiss()); but still on it will search for next event

    // if you want you can also put some condition here
//     page.on('dialog', dialog => {
//   if (dialog.type() === 'confirm') {
//     dialog.dismiss();
//   } else {
//     dialog.accept();
//   }
// });

// await page.locator('#confirmbtn').click();
// await page.locator('#alertbtn').click();

});

test('hover validation test', async ({browser})=>{

    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    //
    await page.locator('#mousehover').hover();


});

test.only('iframe handling validation test', async ({browser})=>{

    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
   //if you handling the iframe or frameset  then use farmelocator

   const framePage = page.frameLocator('#courses-iframe');

   const accessAllLocator= framePage.locator("div a[href*='all-access']").first();

   await accessAllLocator.click();

   await expect(framePage.locator('text=Premium Access Plans')).toBeVisible();


 


   

});

