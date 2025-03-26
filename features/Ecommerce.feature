Feature: Ecommerce Test Suite

Scenario Outline: Placing the Order
  Given User logins to Ecommerce website with following login creds- "<username>" and "<password>"
  When User Add "<productName>" product to Cart
  Then User verify "<productName>" product in the Cart
  And User fills his details and place the Order
  Then User verify order is present in the confirmation page
  And User verify order in myOrder page

  Examples:
  |username           |password    |productName    |
  |testmadu@gmail.com |Testmadu@123|ADIDAS ORIGINAL|
  |MohanMach@gmail.com|NaN@1234    |IPHONE 13 PRO  |
