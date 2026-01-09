const { test, expect, request } = require("@playwright/test");

//here we want to check whethe any other can view other user order details,so hacker can't view the other order details
//while mocking the api reqest call
test("Security testing Or mocking the api response with different order id that is not uthorized", async ({browser}) => {
 
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();

  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

  await expect(page).toHaveTitle("Let's Shop");

  const email = "karansocialmedia10001@gmail.com";
  const password = "Singh12345";

  const userEmailLocator = page.locator("#userEmail");
  await userEmailLocator.fill(email);
  const userPasswordLocator = page.locator("#userPassword");
  await userPasswordLocator.fill(password);

  const loginBtnLocator = page.locator("#login");
  await loginBtnLocator.click();

  const loginSuccessToast = page.locator(".toast-success div");
  await expect(loginSuccessToast).toBeVisible();
  //validation for login msg
  await expect(loginSuccessToast).toHaveText("Login Successfully");

  //here navigate to myorder page
  await page.locator("[routerlink*='myorders']").first().click();

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",

    async (route) => {
               //this route.continue() method is used to modify the request 
             await  route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=695d1bfac941646b7a82deb6"});
      
                     }
  );

  await page.locator("button:has-text('View')").first().click();

 console.log(await page.locator("div.email-wrapper p").textContent());


});

