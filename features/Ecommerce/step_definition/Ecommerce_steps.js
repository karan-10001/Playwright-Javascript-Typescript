// const { Given, When, Then } = require('@cucumber/cucumber');
// const playwright = require('@playwright/test');

import { Given, When, Then } from "@cucumber/cucumber";
import { expect}  from "@playwright/test";

Given(
  "The user login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 }, async function (email, password) {
    
    const loginPage = this.POmanager.getLoginPage();

    await loginPage.goTo("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.login(email, password);
  }
);

When("The user adds item {string} to cart", async function (productname) {
  const dashboard = this.POmanager.getDashboardPage();
  await dashboard.searchProduct(productname);
  await dashboard.navigateToCart();
});

Then(
  "The user validates that {string} is displayed in the cart",
  async function (productname) {
    // assertion here
  }
);

  Given('The user login to Ecommerce2 application with {string} and {string}', async function (username, password) {
           // Write code here that turns the phrase above into concrete actions
              await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
              
              const userNameLocator = this.page.getByRole('textbox', {name:'Username'});
              const signInLocator = this.page.locator('#signInBtn');
           
              const actualTitle=await  this.page.title();
              console.log("ActualTitle : "+ actualTitle);
              await expect(this.page).toHaveTitle(actualTitle);
           
              await userNameLocator.fill(username);
              await this.page.locator('#password').fill(password);
              await signInLocator.click();

         });


  Then('Verify Error message is displayed', async function () {
           // Write code here that turns the phrase above into concrete actions
      const errorMessage= await this.page.locator("[style*='block']").textContent(); // this method fill fetch the text content of selected element
      console.log("error Msg :", errorMessage);
      expect(errorMessage).toContain("Incorrect username/password");
  });