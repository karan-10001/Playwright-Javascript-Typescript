export class LoginPage
{
     constructor(page)
     {
        this.page = page;
        this.userMail =page.locator("#userEmail");
        this.userPassword= page.locator("#userPassword");
        this.loginButton =page.locator("#login");
        this.successMsgLocator =page.locator(".toast-success div");
     }
     
     async goTo(url)
     {
       await this.page.goto(url);
     }

     async login(userMail, userPassword)
     {
       await  this.userMail.fill(userMail);
       await  this.userPassword.fill(userPassword);
       await  this.loginButton.click();

     }

     async getLoginSuccessMsg()
     {
        const successMsg=await this.successMsgLocator.textContent();
        return successMsg;
     }


}