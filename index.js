import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false,
});
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto("https://www.instagram.com/", {
  waitUntil: "networkidle2",
});
// Set screen size.
await page.setViewport({ width: 1080, height: 1024 });
await page.locator("input[name='username']").fill("Ayush");
await page.locator("input[name='password']").fill("pasdvavsas");

await page.locator("button[type='submit']").click();

// await browser.close();
