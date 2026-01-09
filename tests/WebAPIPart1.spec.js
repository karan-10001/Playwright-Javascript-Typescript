const { test, expect, request } = require("@playwright/test");
import { APIUitls } from "../Utils/APIUtils";

//creating apiPayload variable 
const  apiPlayload = 
{
    userEmail: "karansocialmedia10001@gmail.com",    //here key should not be inside the quotes
    userPassword : "Singh12345"
};
//another global variable token to store

const createOrderPlayload=  
{
    orders: [
    {
        country: "Cuba", 
        productOrderedId: "68a961459320a140fe1ca57a"
    }
   ]
};


let response ;
 // suppose if we want a variable  that  I don't need to initialize now then use let 

test.beforeAll( async ()=>{

    //login api
    const apiContext = await request.newContext(); // creating new api context
    const apiUitls = new APIUitls(apiContext,apiPlayload);
    response=await apiUitls.createOrder(createOrderPlayload);


});

test("login using api & placing the order through UI test case", async ({ page }) => {


    await page.addInitScript(value => {
      
    window.localStorage.setItem('token', value);

  } , response.token);  // so this function takes two argument one is function other one is argument/ parameter 
               // here first parameter is function other paramter is token 

   await page.goto("https://rahulshettyacademy.com/client/");

  const email = "karansocialmedia10001@gmail.com";
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



test.only("Creating order through api & validating order id in order page test case", async ({ page }) => {

  await page.addInitScript(value => {
      
    window.localStorage.setItem('token', value);

  } , response.token);  // so this function takes two argument one is function other one is argument/ parameter 
               // here first parameter is function other paramter is token 

  await page.goto("https://rahulshettyacademy.com/client/");


  await page.locator("[routerlink*='myorders']").first().click();

  const orders = page.locator(".table  .ng-star-inserted");
  await orders.first().waitFor();

  const ordersCount = await orders.count();
  console.log("total orders :", ordersCount);

  for (let i = 0; i < ordersCount; i++) {
    const row = orders.nth(i);
    const tempOrderID = (await row.locator("th").textContent()).trim();

    if (tempOrderID === response.orderID) {
      await row.locator("button").first().click();
      break;
    }
  }
  await expect(page.locator(".col-text").first()).toContainText(response.orderID);
});
