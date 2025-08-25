Feature: Login

Scenario: User validate login functionality
  Given I am on the tools shop page
   When I click on the Sign in button
   Then I am presented with the login page
  # When I click on the "Login" button
  # Then I should see an error message indicating that the email is required
  # And The "Password" fied is required