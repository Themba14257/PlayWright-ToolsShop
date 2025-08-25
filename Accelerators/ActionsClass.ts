import { Page, expect } from '@playwright/test';

export default class Actions {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToUrl(url: string) {
    await this.page.goto(url);
  }

  async clickOnElement(selector: string) {
    await this.page.click(selector, { force: true });
  }

  async typeIntoElement(selector: string, text: string) {
    const el = this.page.locator(selector);
    await el.fill(text);
  }

  async elementContainsText(selector: string, text: string) {
    const el = this.page.locator(selector);
    await expect(el).toHaveText(new RegExp(text, 'i'));
  }

  async getDropdownOptions(selector: string): Promise<string[]> {
    const options = await this.page.locator(selector).evaluate((element) => {
      if (element instanceof HTMLSelectElement) {
        return Array.from(element.options, (option) => option.text);
      }
      return [];
    });
    return options;
  }

  async expectDropdownOptionsToEqual(selector: string, expectedOptions: string[]) {
    const options = await this.getDropdownOptions(selector);
    expect(options).toEqual(expectedOptions);
  }

  async scrollToElement(selector: string) {
    const element = await this.page.locator(selector).elementHandle();
    if (element) {
      await this.page.evaluate((el) => el.scrollIntoView(), element);
    }
  }

  async selectDropdownElement(selector: string,) {
    const dropdown = this.page.locator(selector);
    await dropdown.click();
  }
}
