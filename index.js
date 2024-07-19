import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

// Helper function to truncate text
const truncateText = (text, maxLength = 10) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

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
var { width, height } = await page.evaluate(() => {
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

await page.goto("https://www.instagram.com/chandigarhuniversity/", {
  waitUntil: "networkidle2",
});
await delay(2000);
const preloadHref = await page.$eval("div._aagv img", (el) => el.alt);
console.log("image caption : ", preloadHref);
await page.locator("div._aagw").click();

await page.waitForSelector("div._a9zs span");
const comments = await page.$$eval("div._a9zs span", (options) => {
  return options.map((option) => {
    return option.innerText;
  });
});
console.log("comments : ", comments);
await delay(2000);

await page.goto("https://www.instagram.com/ayush.dvlpr/", {
  waitUntil: "networkidle2",
});
await delay(1000);
await page.locator("svg[aria-label='Options']").click();
await delay(1000);
await page.locator("text/Log Out").click();
await delay(2000);

const page2 = await browser.newPage();

// Navigate the page to a URL.
await page2.goto("https://monkeylearn.com/sentiment-analysis-online/", {
  waitUntil: "networkidle2",
});

// const { width, height } = await page2.evaluate(() => {
//   return {
//     width: window.screen.width,
//     height: window.screen.height,
//   };
// });

await page2.setViewport({ width, height });
await delay(1000);
await page2.evaluate(() => {
  window.scrollTo(0, 200);
});

// const comments = [
//   "Atleast India k bare mei to sahi hi bola baki to pta hi hai sabko 😂🤡",
//   "So Funny 😂 , Acting ke Badshah Ho Bhai 😂😂",
//   "Nice persuasion technique",
//   "Can you provide details on the application process?",
//   "Proud to see Chandigarh University setting trends in Indian education",
//   "👍 Great",
//   "😂😂😂😂😂",
//   "What is the duration of the program?",
//   "Akele bolunga toh bawal hoga 😀",
//   "It makes us really proud to see Chandigarh University being named the best in the world. It shows that our education system is improving and doing really well.",
//   "Just caught wind of the latest on educational resources in India, and let me tell you, it's got me feeling ready to conquer the academic world!💪",
//   "Chandigarh University is dreams come true ❤️🎉",
//   "👏👏👏",
//   "99% company 4-5LPA se upr ki ni aati h yha or inlog future dikhare h",
// ];

for (let i = 0; i < comments.length; i++) {
  // Add a delay of 1 seconds (1000 milliseconds)
  await delay(1000);
  await page2.locator("textarea").fill(comments[i]);
  await delay(500);
  await page2.locator("button[type='button']").click();

  // Wait for the elements to be loaded
  await page2.waitForSelector(".EmbedModel-module--resultRow--SZpn2");

  // Extract inner text of the two span elements
  const result = await page2.evaluate(() => {
    const rows = Array.from(
      document.querySelectorAll(".EmbedModel-module--resultRow--SZpn2")
    );
    return rows
      .map((row) => {
        const spans = row.querySelectorAll("span");
        if (spans.length >= 2) {
          return {
            TAG: spans[0].innerText,
            CONFIDENCE: spans[1].innerText,
          };
        }
        return null;
      })
      .filter((item) => item !== null);
  });

  console.log(truncateText(comments[i]), result);
}

await browser.close();
