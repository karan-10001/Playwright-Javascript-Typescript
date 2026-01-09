const { test, expect, request } = require("@playwright/test");
import { APIUitls } from "../Utils/APIUtils";

//creating apiPayload variable
const apiPlayload = {
  userEmail: "karansocialmedia10001@gmail.com", //here key should not be inside the quotes
  userPassword: "Singh12345",
};
//another global variable token to store

const createOrderPlayload = {
  orders: [
    {
      country: "Cuba",
      productOrderedId: "68a961459320a140fe1ca57a",
    },
  ],
};

//fakeResponse that we got  from network
//we will send this response to UI
let fakeResponse = { data: [], message: "No Orders" };

let response;
// suppose if we want a variable  that  I don't need to initialize now then use let

test.beforeAll(async () => {
  //login api
  const apiContext = await request.newContext(); // creating new api context
  const apiUitls = new APIUitls(apiContext, apiPlayload);
  response = await apiUitls.createOrder(createOrderPlayload);
});

test("Mocking the API response as no order id is available in myorder page", async ({
  page,
}) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token); // so this function takes two argument one is function other one is argument/ parameter
  // here first parameter is function other paramter is token

  await page.goto("https://rahulshettyacademy.com/client/");

  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",

    async (route) => {
      // this is second parameter as route function

      //here fetching the actual response of URL
      const actualResponse = await page.request.fetch(route.request());

      const fakeResponseJSON=JSON.stringify(fakeResponse);
      //this route.fullfill({ }); used to send the response to UI here we replacing actual  response with fake response
      route.fulfill({
        actualResponse,
         fakeResponseJSON,
      });
    }
  );

  await page.locator("[routerlink*='myorders']").first().click();
  //await page.pause(); //not use page.pause() for idle case ony for debug
 await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"); // replace id with * for generalize use
  console.log(await page.locator(".mt-4").textContent());
});

