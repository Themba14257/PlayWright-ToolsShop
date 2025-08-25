import { test, expect } from '@playwright/test';
import { ContactPage } from '../pageObjects/Contact';
import Actions from '../../Accelerators/ActionsClass';
import * as testData from '../../TestData/ToolsShopTestData.json';
import { before, describe } from 'node:test';
import { navigateToContactPage } from '../../Support/helpers/NavigationHelpers';




let actions: Actions;
let contactPage: ContactPage;

test.beforeEach(async ({ page }) => {
    actions = new Actions(page);
    contactPage = new ContactPage();
    await navigateToContactPage(actions, contactPage);
});

test.describe('Validate the Subject Dropdown', () => {
    test('should display the correct subject options', async () => {
        await test.step('Then I should see the correct options in the Subject dropdown', async () => {
            await actions.scrollToElement(contactPage.subjectDropdownList);
            await actions.expectDropdownOptionsToEqual(contactPage.subjectDropdownList, testData.Contact.SubjectDropdown.expectedOptions);
        });
    });
});

test.describe('Validate the error handling Contact Us form submission', () => {
    test('should display error messages for required fields', async () => {
        test.step('should display error messages for required fields', async () => {
            await actions.scrollToElement(contactPage.sendButton);
            await actions.clickOnElement(contactPage.sendButton);
        });
        test.step("Then I should be presented with toast error message for LastName, firstName, EmailAddress, Subject, and Message", async () => {
            await actions.elementContainsText(contactPage.messageError, testData.Contact.toastMessage.LastName);
            await actions.elementContainsText(contactPage.messageError, testData.Contact.toastMessage.FirstName);


            await actions.elementContainsText(contactPage.messageError, testData.Contact.toastMessage.EmailAddress);
            await actions.elementContainsText(contactPage.messageError, testData.Contact.toastMessage.Subject);
            await actions.elementContainsText(contactPage.messageError, testData.Contact.toastMessage.Message);
        });
    });

});