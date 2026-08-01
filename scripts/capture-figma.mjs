import { chromium } from 'playwright';

const url =
  'https://www.figma.com/design/zFGN2O5xktHl9VmoOieq5E/React-_-%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?node-id=0-1&p=f&t=N8JZh2v7YYJXN54p-0';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1728, height: 1117 } });

await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
await page.waitForTimeout(5000);

const dismissButtonTexts = ['Do not allow cookies', 'Close', 'Not now'];

for (const text of dismissButtonTexts) {
  const button = page.getByRole('button', { name: text }).first();
  if (await button.isVisible().catch(() => false)) {
    await button.click().catch(() => {});
    await page.waitForTimeout(500);
  }
}

await page.keyboard.press('Escape').catch(() => {});
await page.waitForTimeout(1000);

const zoomInTimes = 6;

for (let index = 0; index < zoomInTimes; index += 1) {
  await page.keyboard.down('Meta');
  await page.keyboard.press('=').catch(() => {});
  await page.keyboard.up('Meta');
  await page.waitForTimeout(400);
}

await page.mouse.click(560, 210);
await page.waitForTimeout(1000);
await page.screenshot({ path: '/tmp/react-burger-figma-zoomed.png', fullPage: false });

await browser.close();
