Feature: Ecommerce validation

  @Regression
  Scenario: Placing the order
    Given The user login to Ecommerce application with "karansocialmedia10001@gmail.com" and "Singh12345"
    When The user adds item "ZARA COAT 3" to cart
    Then The user validates that "ZARA COAT 3" is displayed in the cart

    @Validation @Regression 
  Scenario Outline: Placing the order
    Given The user login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed
    Examples:
    | username | password |
    |  karan   | learning |
    | Deepak   | hello@123|  
    
