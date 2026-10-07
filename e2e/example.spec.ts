import { test, expect } from '@playwright/test';

import { ingredients } from '../src/services/ingredients/data';

const bun = ingredients.find((ingredient) => ingredient.type === 'bun')!;
const otherBun = ingredients.filter((ingredient) => ingredient.type === 'bun')[1];
const fillings = ingredients.filter((ingredient) => ingredient.type === 'sauce');

test.beforeEach(async ({ page }) => {
  await page.route('**/api/ingredients', (route) =>
    route.fulfill({ json: { success: true, data: ingredients } })
  );
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Соберите бургер' })).toBeVisible();
  await expect(page.getByRole('button', { name: new RegExp(bun.name) })).toBeVisible();
});

test('bun replacement, counters, total and removal', async ({ page }) => {
  const constructor = page.getByTestId('burger-constructor');
  const dropArea = page.getByTestId('constructor-drop-area');
  const bunCard = page.getByRole('button', { name: new RegExp(bun.name) });
  await expect(constructor.getByRole('button', { name: 'Оформить заказ' })).toBeDisabled();
  await expect(constructor.getByText('Перетащите булку')).toHaveCount(2);
  await bunCard.dragTo(dropArea);
  await expect(bunCard.locator('.counter')).toHaveText('2');
  await expect(constructor.getByText(`${bun.name} (верх)`, { exact: true })).toBeVisible();
  await expect(constructor.getByText(String(bun.price * 2), { exact: true })).toBeVisible();
  const otherCard = page.getByRole('button', { name: new RegExp(otherBun.name) });
  await otherCard.dragTo(dropArea);
  await expect(bunCard.locator('.counter')).toHaveCount(0);
  await expect(otherCard.locator('.counter')).toHaveText('2');
  await constructor.locator('.constructor-element__action svg').first().click();
  await expect(otherCard.locator('.counter')).toHaveCount(0);
  await expect(constructor.getByText('Перетащите булку')).toHaveCount(2);
  await expect(constructor.getByText('0', { exact: true })).toBeVisible();
});

test('fillings can be sorted, kept on outside drop and removed', async ({ page }) => {
  const constructor = page.getByTestId('burger-constructor');
  const dropArea = page.getByTestId('constructor-drop-area');
  await page.getByRole('button', { name: new RegExp(bun.name) }).dragTo(dropArea);
  for (const filling of fillings.slice(0, 2)) {
    await page.getByRole('button', { name: new RegExp(filling.name) }).dragTo(dropArea);
  }
  const items = constructor.locator('li');
  await expect(items).toHaveCount(2);
  await items.first().dragTo(items.last());
  await expect(items.first()).toContainText(fillings[1].name);
  await items.first().dragTo(page.getByRole('heading', { name: 'Соберите бургер' }));
  await expect(items).toHaveCount(2);
  await expect(items.first()).toContainText(fillings[1].name);
  await items.first().locator('.constructor-element__action svg').click();
  await expect(items).toHaveCount(1);
  await expect(page.getByRole('button', { name: new RegExp(fillings[1].name) }).locator('.counter')).toHaveCount(0);
});

test('order request contains both bun halves and displays server number', async ({ page }) => {
  let submittedIngredients: string[] = [];
  await page.route('**/api/orders', (route) => {
    submittedIngredients = route.request().postDataJSON().ingredients;
    return route.fulfill({ json: { success: true, order: { number: 123456 } } });
  });
  const dropArea = page.getByTestId('constructor-drop-area');
  await page.getByRole('button', { name: new RegExp(bun.name) }).dragTo(dropArea);
  await page.getByRole('button', { name: new RegExp(fillings[0].name) }).dragTo(dropArea);
  await page.getByRole('button', { name: 'Оформить заказ' }).click();
  await expect(page.getByRole('dialog')).toContainText('123456');
  expect(submittedIngredients).toEqual([bun._id, fillings[0]._id, bun._id]);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('ingredient modal closes via button, Escape and overlay', async ({ page }) => {
  const card = page.getByRole('button', { name: new RegExp(bun.name) });
  await card.click();
  await expect(page.getByRole('dialog')).toContainText(bun.name);
  await page.getByRole('button', { name: 'Закрыть', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await card.click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await card.click();
  await page.mouse.click(5, 5);
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('scroll switches the active ingredient tab', async ({ page }) => {
  const mainHeading = page.getByRole('heading', { name: 'Начинки', exact: true });
  await mainHeading.evaluate((heading) => heading.scrollIntoView({ block: 'start' }));
  await expect(page.locator('.tab_type_current')).toHaveText('Начинки');
});
