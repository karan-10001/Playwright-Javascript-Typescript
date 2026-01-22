Feature: Ecommerce validations

  @Validation @foo 
  Scenario Outline: Placing the order
    Given The user login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed
    Examples:
    | username | password |
    |  karan   | learning |
    | Deepak   | hello@123|