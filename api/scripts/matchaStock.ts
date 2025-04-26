import { chromium } from 'playwright-core';
import dotenv from 'dotenv';
dotenv.config();

export async function checkStock() {
  try {
    const browser = await chromium.connectOverCDP(
      `wss://chrome.browserless.io?token=${process.env.BROWSERLESS_API_KEY}`
    );

    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    });
    const page = await context.newPage();

    await page.goto(
      'https://www.matchajp.net/products/koyamaen-matcha-tea-powder-ceremonical-grade-ogurayama-150g-can',
      { waitUntil: 'domcontentloaded' }
    );

    try {
      const button = await page.waitForSelector(
        '#ProductSubmitButton-template--15972096901273__main',
        { timeout: 5000 }
      );
      const buttonText = await button.innerText();

      if (buttonText.includes('Sold out')) {
        console.log('🟥 Koyamaen Matcha is SOLD OUT');
        return { foundButton: true, isSoldOut: true };
      } else {
        console.log('🟩 Koyamaen Matcha Item is IN STOCK!');
        return { foundButton: false, isSoldOut: false };
      }
    } catch (err) {
      console.error('❌ Could not find the button:', err);
      return { error: 'Could not find the button' };
    } finally {
      
      await browser.close();
    }
  } catch (error) {
    console.error('❌ Error:', error);
    return { error: 'An error occurred while processing the request' };
  }
}