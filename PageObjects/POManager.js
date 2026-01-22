// const {LoginPage } = require("./LoginPage.js");
// const {DashboardPage } = require("./DashboardPage.js");

import {LoginPage} from "./LoginPage.js";
import { DashboardPage } from "./DashboardPage.js";

export class POManager
{
   constructor(page)
   {  
      this.page = page;
      this.loginPage = new LoginPage(this.page);
      this.DashboardPage= new DashboardPage(this.page);
   }

  getLoginPage()
  {
    return this.loginPage;
  }

  getDashboardPage()
  {
    return this.DashboardPage;
  }


}