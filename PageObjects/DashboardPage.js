
export class DashboardPage
{

   constructor(page){

       this.page = page;
       this.products=page.locator(".card-img-top + .card-body");
       this.productsText=page.locator(".card-img-top + .card-body b");
       this.cartButton= page.locator("[routerlink*='cart']");
       
   }

   async searchProduct(productName)
   {
       await this.products.first().waitFor();
       const productsCount =await this.products.count();
       console.log("products counts",productsCount);
       const  allProductsName= await this.productsText.allTextContents();
       console.log("All products name: ", allProductsName);

       for (let i = 0; i < productsCount; i++) {
   
            const actualProduct = await this.products.nth(i).locator("b").textContent();
            if (actualProduct === productName) {
                  await this.products.nth(i).locator("text= Add To Cart").click();
                    break;
            }
       }

    }

    async navigateToCart()
    {
        await this.cartButton.click();
    }


}