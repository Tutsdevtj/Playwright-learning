const { test: base, expect } = require("@playwright/test");

const { Movies } = require("./Movies");
const { Login } = require("./Login");
const { LandingPage } = require("./LandingPage");
const { Toast } = require("./Components");

const test = base.extend({
  page: async ({ page }, use) => {

    await use({
        ...page,
        landingPage: new LandingPage(page),
        login: new Login(page),
        movie: new Movies(page),
        toast: new Toast(page),

    })


  },
});

export { test, expect }
