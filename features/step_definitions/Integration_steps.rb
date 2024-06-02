# # features/step_definitions/login_steps.rb

# # require_relative '../pages/login_page'
# # require_relative '../pages/dashboard_page'

# Given('the user is on the login page') do
#   LoginPage.open
# end

# When('the user enters valid credentials') do
#   LoginPage.enter_credentials('username', 'password')
# end

# When('the user clicks the login button') do
#   LoginPage.click_login
# end

# Then('the user should be redirected to the dashboard') do
#   DashboardPage.wait_for_dashboard
# end

# Then('the dashboard should display the user\'s profile information') do
#   DashboardPage.verify_user_profile
# end

# Then('this step always passes') do
#   pending 'This step always passes'
# end