import { chromium} from "@playwright/test";
import { Before, After } from "@cucumber/cucumber";
import { POManager } from "../../../PageObjects/POManager.js";
import {AfterStep, BeforeStep, Status} from "@cucumber/cucumber";

//in before annotation we generally write whatever things are require before running  the actual test cases lilke browser setup
// Before({ tags: "@foo"}, async function(){

//     const browser = await chromium.launch(
//         { 
//             headless: false 

//         }
//     );
//     const browserContext = await browser.newContext();

//     //here  this keyword is world constructor for scenario, this keywork will pass below page, POmanager to all steps of  sceanrio
//     this.page = await browserContext.newPage();
//     this.POmanager = new POManager(this.page);

// });
Before( async function(){

    const browser = await chromium.launch(
        { 
            headless: false 

        }
    );
    const browserContext = await browser.newContext();

    //here  this keyword is world constructor for scenario, this keywork will pass below page, POmanager to all steps of  sceanrio
    this.page = await browserContext.newPage();
    this.POmanager = new POManager(this.page);

});

BeforeStep( function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function (result) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if(result.status === Status.FAILED)
  {
    await this.page.screenshot({path: "screenshotAftersetp.png"});
  }

});

//after annotation is used to do action at last, after exuting all the test cases , like browser closing , tear down the data 

After( function(){
    console.log("I'm last to execute ");
});