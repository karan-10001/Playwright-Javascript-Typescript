const {test, expect}= require('@playwright/test');

test('screenshot & visual comparison test case', async ({browser})=>{

    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
 
    
    await expect(page.locator("input[name='show-hide']")).toBeVisible();

    //partial capture the screenshot
    await page.locator("input[name='show-hide']").screenshot({path:'partialscreenshot.png'});
    await page.locator('#hide-textbox').click();

    //capture the screenshot whole page
    page.screenshot({path:'Screenshots.png'});
    await expect(page.locator("input[name='show-hide']")).toBeHidden();


});

test.only("visual testing or visual  comparison",async ({page})=>{

    await page.goto("https://www.flightaware.com/");

    //this method used to capture the current image & compare with baseline image
    expect(await page.screenshot()).toMatchSnapshot("landingPage.png");

    //at first run it will fail becuase we not providing landingPage.png 
    //first it will store automatically at run then it will validate 

    //for this webisite it will because there is time element in page & it getting change in every moment

});
