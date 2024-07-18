import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

// Utility function to add a delay
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
});
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto("https://www.instagram.com/", {
  waitUntil: "networkidle2",
});
// Set screen size to full screen
const { width, height } = await page.evaluate(() => {
  return {
    width: window.screen.width,
    height: window.screen.height,
  };
});
await page.setViewport({ width, height });

// Add a delay of 1 seconds (1000 milliseconds)
await delay(1000);

// Slowly fill the username field
await page.type("input[name='username']", "ayush.dvlpr", { delay: 100 }); // Delay of 100ms between keystrokes

// Slowly fill the password field
await page.type("input[name='password']", process.env.pass, { delay: 100 }); // Delay of 100ms between keystrokes

await page.locator("button[type='submit']").click();

// Wait for the profile icon to appear, indicating a successful login
await page.waitForSelector("svg[aria-label='Home']");
await delay(1000);

await page.goto("https://www.instagram.com/dhruvrathee/", {
  waitUntil: "networkidle2",
});

await delay(2000);

await page.goto("https://www.instagram.com/ayush.dvlpr/", {
  waitUntil: "networkidle2",
});
await delay(500);
await page.locator("svg[aria-label='Options']").click();
await delay(500);
await page.locator("text/Log Out").click();
await delay(2000);
await browser.close();
