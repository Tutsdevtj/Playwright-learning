import { test, expect } from "../pages/index";

const { faker } = require("@faker-js/faker");

let leadName, leadEmail

test.beforeEach(async ({ page }) => {
  leadName = faker.person.fullName();
  leadEmail = faker.internet.email();
});

test("deve cadastrar um lead na fila de espera", async ({ page }) => {
  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm(leadName, leadEmail);
  const message =
    "Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!";
  await page.landingPage.toastHaveText(message);
});

test("não deve cadastrar com email incorreto", async ({ page }) => {
  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm(leadName, "admin");
  await page.landingPage.alertHaveText("Email incorreto");
});

test("não deve cadastrar com email já existente", async ({ page, request }) => {
  const newLead = await request.post("http://localhost:3333/leads", {
    data: {
      name: leadName,
      email: leadEmail,
    },
  });

  expect(newLead.ok).toBeTruthy();

  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm(leadName, leadEmail);
  const message =
    "O endereço de e-mail fornecido já está registrado em nossa fila de espera.";
  await page.landingPage.toastHaveText(message);
});

test("não deve cadastrar com nome vazio", async ({ page }) => {
  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm("", "papito@gmail.com");
  await page.landingPage.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar com email vazio", async ({ page }) => {
  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm("Tuts", "");
  await page.landingPage.alertHaveText("Campo obrigatório");
});

test("não deve cadastrar com ambos campos vazios", async ({ page }) => {
  await page.landingPage.visit();
  await page.landingPage.openLeadModal();
  await page.landingPage.submitLeadForm("", "");
  await page.landingPage.alertHaveText(["Campo obrigatório", "Campo obrigatório"]); //transformado em array pq aparece 2 alerts do mesmo
});
