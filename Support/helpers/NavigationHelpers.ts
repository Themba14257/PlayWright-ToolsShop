import Actions from '../../Accelerators/ActionsClass';
import { ContactPage } from '../../tests/pageObjects/Contact';
import { LoginPage } from '../../tests/pageObjects/LoginPage';
import { BASE_URL } from '../utils';

export async function goToLoginPage(actions: Actions, loginPage: LoginPage) {
  await actions.goToUrl(BASE_URL);
  await actions.clickOnElement(loginPage.navSignInLink);
  await actions.elementContainsText(loginPage.loginHeading, 'Login');
}

export async function navigateToContactPage(actions: Actions, contactPage: ContactPage) {
  await actions.goToUrl(BASE_URL);
  await actions.clickOnElement(contactPage.contactNavLink);
  await actions.elementContainsText(contactPage.contactHeading, 'Contact');
}
