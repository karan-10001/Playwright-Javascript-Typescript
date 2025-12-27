const {test,expect}= require("@playwright/test");

test('Handling child window test', async ({browser})=>{

    const browserContext = await browser.newContext();
    const page =await browserContext.newPage();

     await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
     
  // Locate the link which opens a new tab/window
const linkLocator = page.locator("[href*='documents']");

// Use Promise.all to run both actions in parallel:
// 1. Start waiting for a new page (tab/window) to open
// 2. Click on the link that triggers the new page
// This ensures Playwright does not miss the page event
const [newPage] = await Promise.all([

  browserContext.waitForEvent('page'), 
  // Waits for a new page (child window) to be opened in the same browser context

  linkLocator.click()
  // Click action that triggers opening of the new tab/window

]);

     
    const redTextLocator = newPage.locator('p.red');
    const text =await redTextLocator.textContent();

    console.log(text);

});


test("extract email from text in child window test", async ({
  browser,
}) => {
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // Locate the link which opens a new tab/window
  const linkLocator = page.locator("[href*='documents']");

  // Use Promise.all to run both actions in parallel:
  // 1. Start waiting for a new page (tab/window) to open
  // 2. Click on the link that triggers the new page
  // This ensures Playwright does not miss the page event
  const [newPage] = await Promise.all([
    browserContext.waitForEvent("page"),
    // Waits for a new page (child window) to be opened in the same browser context

    linkLocator.click(),
    // Click action that triggers opening of the new tab/window
  ]);

  const redTextLocator = newPage.locator("p.red");
  const text = await redTextLocator.textContent();
  console.log(text);
  const arr = text.split('@');
  console.log(arr[0]," ",arr[1]);
  
  const arr1= arr[1].split(" ");
  const email= arr1[0];
  console.log("email : ", email);



});

test.only("Get the email from child window & use this on parent window test", async ({
  browser,
}) => {
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const parentWindowUsernameInputBox=page.locator('#username');
  // Locate the link which opens a new tab/window
  const linkLocator = page.locator("[href*='documents']");

  // Use Promise.all to run both actions in parallel:
  // 1. Start waiting for a new page (tab/window) to open
  // 2. Click on the link that triggers the new page
  // This ensures Playwright does not miss the page event
  const [newPage] = await Promise.all([
    browserContext.waitForEvent("page"),
    // Waits for a new page (child window) to be opened in the same browser context

    linkLocator.click(),
    // Click action that triggers opening of the new tab/window
  ]);

  const redTextLocator = newPage.locator("p.red");
  const text = await redTextLocator.textContent();
  console.log(text);
  const arr = text.split('@');
  console.log(arr[0]," ",arr[1]);
  
  const arr1= arr[1].split(" ");
  const email= arr1[0];
  console.log("email : ", email);

 //now filing above email in parent window username input  field 
  
// await parentWindowUsernameInputBox.fill(email);
await page.locator('#username').fill(email);
// await page.pause();
// console.log("content of user input field in parent window ",await page.locator('#username').textContent()); // textContent() will not work here  becuase this is  input  box

console.log("content of user input field in parent window : ",await page.locator('#username').inputValue()); 
  

});