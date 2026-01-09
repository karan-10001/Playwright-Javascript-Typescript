const { test, expect } = require("@playwright/test");

test("calender validation", async ({ page }) => {
  const monthNumber = "6";
  const date = "15";
  const year = "2027";

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

  //calender handling
  await page.locator("button.react-date-picker__calendar-button").click();
  await page.locator("button.react-calendar__navigation__label").click();
  await page.locator("button.react-calendar__navigation__label").click();

  const yearLocator = page
    .locator("button.react-calendar__decade-view__years__year")
    .filter({ hasText: "2027" });
  const isVisibleOfYearLocator = await yearLocator.isVisible();

  //    if(isVisibleOfYearLocator)
  //    {
  //      await isVisibleOfYearLocator.click();
  //    }
  //    else{

  //    }
  await yearLocator.click();

  await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click();
  
  await page.locator("//abbr[text()='"+date+"']").click();

  const inputsLocator = page.locator('.react-date-picker__inputGroup__input');

  const expextedList=[monthNumber,date,year];

  for(let i=0;i<expextedList.length;i++)
  {

    const value = await inputsLocator.nth(i).inputValue();

    expect(value).toEqual(expextedList[i]);
    
  }

});
