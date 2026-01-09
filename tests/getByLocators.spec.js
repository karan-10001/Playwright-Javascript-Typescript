import { test, expect } from "@playwright/test";
//const {test, expect}= require('@playwright/test');

test("getByLabel() locator practice ", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  //use getByLabel() on clicking or selecting something not for typing in ideal scenario

  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").check();
  await page.getByLabel("Gender").selectOption("Male");

  const passwordLocator = page.getByLabel("Password");
  await passwordLocator.fill("Karan"); //here this is not working it does not work for typing or inputbox
});

test("getByPlaceholder() locator practice ", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  //when element have inputbox and there is placholder then  use this locator
  await page.getByPlaceholder("Password").fill("karanpratapsingh");
});

test("getByRole() locator practice ", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  //this is most used locator
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();

  await page.getByRole("link", { name: "Shop" }).click();
});

test("getByText() locator practice ", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  //this is used to get element based on it's text
  // await page
  //   .getByText("Success! The Form has been submitted successfully!.")
  //   .isVisible();
  // 
                      //this will not work here because it is associated with submit button
});

test(" filter locator practice ", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  //this is most used locator
  await page.getByRole("button", { name: "Submit" }).click();
  await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();

  await page.getByRole("link", { name: "Shop" }).click();

  await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button',{name:'Add'}).click(); //use this method for filter or chaining the locators
  
  

});