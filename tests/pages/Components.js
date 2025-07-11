const { expect } = require("@playwright/test");

export class Toast {
  constructor(page) {
    this.page = page;
  }

  async seeToast(message) {
   await expect(this.page.locator(".toast")).toContainText(message);
   await expect(this.page.locator(".toast")).toBeVisible(2000);

  }
}