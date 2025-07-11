import { test, expect } from "../pages/index";

test("deve fazer login como administrador", async ({ page }) => {
  await page.login.visit();
  await page.login.trylog("admin@zombieplus.com", "pwd123");
 // await expect(page).toHaveURL(/.*\/admin/);
  
});



test("não deve fazer login com senha incorreta", async ({ page }) => {
  await page.login.visit();
  await page.login.trylog("admin@zombieplus.com", "123");
  await page.toast.seeToast(
    "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
  );

});

test("não deve fazer login com email incorreto", async ({ page }) => {
  await page.login.visit();
  await page.login.trylog("admin", "pwd123");
  await page.login.alertHaveText("Email incorreto");
});

test("não deve fazer login com ambos campos vazios", async ({ page }) => {
  await page.login.visit();
  await page.login.trylog("", "");
  await page.login.alertHaveText(["Campo obrigatório", "Campo obrigatório"]);
});
