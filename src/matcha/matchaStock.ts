import { chromium } from 'playwright';

export async function checkStock() {

  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext({

    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  });
  const page = await context.newPage();

  await page.goto('https://www.matchajp.net/products/koyamaen-matcha-tea-powder-ceremonical-grade-ogurayama-150g-can',
     { waitUntil: 'domcontentloaded' });

  try {
    const button = await page.waitForSelector('#ProductSubmitButton-template--15972096901273__main', { timeout: 5000 });
    const buttonText = await button.innerText();

    if (buttonText.includes('Sold out')) {
      console.log('🟥 Koyamaen Matcha is SOLD OUT');
      return {foundButton: true, isSoldOut: true};
    } else {
      console.log('🟩 Koyamaen Matcha Item is IN STOCK!');
      return {foundButton: false, isSoldOut: false};
    }

  } catch (err) {
    console.error('❌ Could not find the button:', err);
  }

  await browser.close();
}

