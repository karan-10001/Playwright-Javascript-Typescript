const { test, expect } = require("@playwright/test");

test("Place the roder in shop E2E test case", async ({ browser }) => {
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
  //other  way of validation for login msg
  const LoginToastMsg = await loginSuccessToast.textContent();
  await expect(LoginToastMsg).toContain("Login Successfully");

  await page.waitForLoadState("networkidle"); // this  one is required to add to load the all api first

  const searchProduct = "ZARA COAT 3";
  await page.locator(".card-img-top + .card-body").first().waitFor();
  const products = page.locator(".card-img-top + .card-body");

  const productCount = await products.count();
  console.log("Count of products: ", productCount);

  const productsName = await page
    .locator(".card-img-top + .card-body b")
    .allTextContents();
  console.log(productsName);

  for (let i = 0; i < productCount; i++) {
    const prodName = await products.nth(i).locator("b").textContent();
    if (prodName === searchProduct) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator("[routerlink*='cart']").click();
  // await page.locator("h3:has-text('ZARA COAT 3')").waitFor();
  await page.locator("div li").first().waitFor();
  const isVisible = page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  await expect(isVisible).toBeTruthy();

  const checkoutBtn = page.locator("text=Checkout");
  await checkoutBtn.waitFor();
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
  expect(actualMail).toContain(email);

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
