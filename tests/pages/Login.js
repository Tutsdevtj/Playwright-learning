const { expect } = require("@playwright/test");

export class Login {
  constructor(page) {
    this.page = page;
  }

async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        await expect(this.page.locator('.login-form')).toBeVisible()
    }

  async trylog(name, email) {
    await this.page.getByPlaceholder("E-mail").fill(name);
    await this.page.getByPlaceholder("Senha").fill(email);
    await this.page.getByRole("button", { name: "Entrar" }).click();

  }

 async alertHaveText(target) {
        await expect(this.page.locator('span[class$=alert]')).toHaveText(target)
    }
}
