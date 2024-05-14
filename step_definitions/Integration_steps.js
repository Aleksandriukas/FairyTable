const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');

Given('the user is on the login page', async function () {
  await LoginPage.open();
});

When('the user enters valid credentials', async function () {
  await LoginPage.enterCredentials('username', 'password');
});

When('the user clicks the login button', async function () {
  await LoginPage.clickLogin();
});

Then('the user should be redirected to the dashboard', async function () {
  await DashboardPage.waitForDashboard();
});

Then('the dashboard should display the user\'s profile information', async function () {
  await DashboardPage.verifyUserProfile();
});
