const { test, expect } = require("@playwright/test");
const { POManager } = require("../PageObjects/POManager");

//we have to use test data as js object so convert it to json or sometimes first 
//convert into string then json
//I think no need it already return js object
const TestData = require("../testData/TestData.json");

for(const dataset of TestData)
{

test(`Place the roder in shop E2E test case  for ${dataset.Productname}`, async ({ page }) => {
  const POmanager = new POManager(page);
  const email = "karansocialmedia10001@gmail.com";
  const password = "Singh12345";

  //class object created
  const loginPage = POmanager.getLoginPage();

  loginPage.goTo("https://rahulshettyacademy.com/client/#/auth/login");

  await expect(page).toHaveTitle("Let's Shop");

  await loginPage.login(dataset.email,dataset.password);

  //other  way of validation for login msg
  expect(await loginPage.getLoginSuccessMsg()).toContain("Login Successfully");

  //await page.waitForLoadState("networkidle"); // this  one is required to add to load the all api first

  const dashbaord = POmanager.getDashboardPage();

  await dashbaord.searchProduct(dataset.Productname);
  await dashbaord.navigateToCart();

  // await page.locator("h3:has-text('ZARA COAT 3')").waitFor();
  // await page.locator("div li").first().waitFor();
  const isVisible = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  await expect(isVisible).toBeTruthy();

  const checkoutBtn = page.locator("text=Checkout");
 // await checkoutBtn.waitFor();
  await checkoutBtn.click();

  await page
    .getByPlaceholder("Select Country")
    .pressSequentially("Ind", { delay: 100 });

  const dropdown = page.locator(".input + .ta-results");
  await dropdown.waitFor();

  const optionCount = await dropdown.locator("button").count();
  console.log("option count: ", optionCount);

  for (let i = 0; i < optionCount; i++) {
    const optionText = await dropdown.locator("button").nth(i).textContent();

    if (optionText === " India") {
      // optionText
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  const actualMail = await page.locator(".details__user label").textContent();
  expect(actualMail).toContain(dataset.email);

  await page.locator(".title + input").nth(1).fill("223");
  await page.locator(".title + input").nth(2).fill("Karan Pratap Singh");

  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order."
  );

  const orderID = (
    await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
  )
    .replace(/\|/g, "")
    .trim();

  console.log("orderID : ", orderID);

  await page.locator("[routerlink*='myorders']").first().click();

  const orders = page.locator(".table  .ng-star-inserted");
  await orders.first().waitFor();

  const ordersCount = await orders.count();
  console.log("total orders :", ordersCount);

  for (let i = 0; i < ordersCount; i++) {
    const row = orders.nth(i);
    const tempOrderID = (await row.locator("th").textContent()).trim();

    if (tempOrderID === orderID) {
      await row.locator("button").first().click();
      break;
    }
  }
  await expect(page.locator(".col-text").first()).toContainText(orderID);
});

}