import { test, expect } from "../pages/index";
const data = require("../../movies.json");

const {executeSQL} = require('../support/database')

test("deve poder cadastrar um novo filme", async ({ page }) => {

  const movies = data.create;

  await executeSQL(`DELETE FROM public.movies WHERE title = '${movies.title}'`)
  await page.login.visit();
  await page.login.trylog("admin@zombieplus.com", "pwd123");

  await page.movie.create(
    movies.title,
    movies.overview,
    movies.company,
    movies.release_year
  );

  await page.toast.seeToast("Cadastro realizado com sucesso!");
});
