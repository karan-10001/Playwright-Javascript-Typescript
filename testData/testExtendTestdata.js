// here taking test as a base 
import { test as base} from "@playwright/test";


export const customeTest = base.extend({

        td1: {
            email : "karansocialmedia10001@gmail.com",
            password: "Singh12345",
            Productname : "ZARA COAT 3"

        },
         td2: {
            email : "betudarling10001@gmail.com",
            password: "Saksingsingh10001@",
            Productname : "ZARA COAT 3"

        }      

});
// use customeTest instead of test 
/*
suppose you 100 of test cases and for each 
you need to send seprate test cases 
then extend the test behaviour & create the fixture as test data
*/

