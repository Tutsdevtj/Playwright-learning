import { test, expect } from "@playwright/test";

export class Movies {
  constructor(page) {
    this.page = page;
  }

  async isLoggedIn() {
    await this.page.waitForLoadState("networdidle");
    await expect(this.page).toHaveURL(/.*admin/);
  }

  async create(title, overview, company, release_year) {
    await this.page.locator('a[href$="register"]').click();
    await this.page.getByLabel("Titulo do filme").fill(title);
    await this.page.getByLabel("Sinopse").fill(overview);

    await this.page
      .locator("#select_company_id .react-select__indicator")
      .click();

    await this.page
      .locator(".react-select__option")
      .filter({ hasText: company })
      .click();

    await this.page.locator("#select_year .react-select__indicator").click();

    await this.page
      .locator(".react-select__option")
      .filter({ hasText: release_year })
      .click();


    await this.page.getByRole('Button', {name: 'Cadastrar'}).click()

  }
}
