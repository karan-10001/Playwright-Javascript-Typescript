export class APIUitls
{

    constructor(apiContext, apiPlayload)
    {
            this.apiContext=apiContext;
            this.apiPlayload= apiPlayload;
    }


    async getToken()
    {

         //new in  this line hitting the api with url & data & got  the response 
            const apiResponse =await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
                {
                    data:this.apiPlayload
                }
            )
        
            //validation for api response status
        
           // expect(apiResponse.ok()).toBeTruthy(); don't need this
            console.log("apiResponse Row :", apiResponse)
            const apiResponseJson = await apiResponse.json(); // here converting api response to json
            console.log("apiResponseJson : ",apiResponseJson);
        
            const token = apiResponseJson.token;          // fetching token from api response json 
            console.log("token :" ,token);

            return token;

    }

   async createOrder(createOrderPlayload)
    {
             let response  ={};

             response.token = await this.getToken();
        
              const createOrderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: createOrderPlayload,
                headers:
                {
                    "authorization": response.token, // instead of token call  getToken method 
                    "content-type":"application/json"
                }
            }
          );
        
        //    expect(createOrderResponse.ok()).toBeTruthy(); don't need this in util file 
        
           const createOrderResponseJson= await createOrderResponse.json();
           const orderID = createOrderResponseJson.orders[0];
        
           console.log("OrderID from api : ",orderID);

           response.orderID= orderID;

           return response;
        
    }






}