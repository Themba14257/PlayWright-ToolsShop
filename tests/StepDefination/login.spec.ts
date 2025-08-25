
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage';
import Actions from '../../Accelerators/ActionsClass';
import { goToLoginPage } from '../../Support/helpers/NavigationHelpers';
import * as testData from '../../TestData/ToolsShopTestData.json';

let actions: Actions;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    actions = new Actions(page);
    loginPage = new LoginPage();
    await goToLoginPage(actions, loginPage);
});

test.describe('Validate user can login without entering credentials', () => {

    test('User cannot login without entering credentials', async () => {
        await test.step('When I click on the Login button without entering credentials', async () => {
            await actions.clickOnElement(loginPage.loginButton);
        });

        await test.step('I should see validation messages for required fields', async () => {
            await actions.elementContainsText(loginPage.emailErrorMessage, testData.Login.toastMessage.emailRequired);
            await actions.elementContainsText(loginPage.passwordErrorMessage, testData.Login.toastMessage.passwordRequired);
        });
    });
});

test.describe('Validate the user can Login with Invalid Credentials', () => {
    test('User cannot login with invalid credentials', async () => {
        await test.step('When I enter invalid email address and click Login', async () => {
            await actions.typeIntoElement(loginPage.emailInput, testData.Login.InvalidEmail);
        });

        await test.step('I enter invalid password', async () => {
            await actions.typeIntoElement(loginPage.passwordInput, testData.Login.InvalidPassword);
        });

        await test.step('I click on the Login button', async () => {
            await actions.clickOnElement(loginPage.loginButton);
        });

        await test.step('I am presidented with error message for invalid email or password', async () => {
            await actions.elementContainsText(loginPage.loginErrorMessage, testData.Login.toastMessage.loginFailed);
        });
    });
});