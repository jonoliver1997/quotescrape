//Same functionality but with try catch and separate functions for login and scrape
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("https://quotes.toscrape.com/");

    // Login to the website
    await login(page);

    // Scrape the quotes
    const grabQuotes = await scrapeQuotes(page);
    console.log(grabQuotes);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await browser.close();
  }
})();

async function login(page) {
  await page.click("a[href='/login']");
  await page.type("#username", "jonoliver");
  await page.type("#password", "Password123");
  await Promise.all([
    page.waitForNavigation(), // Wait for navigation to complete
    page.click("input[value='Login']"),
    console.log(" Successfully Logged in!"),
  ]);
}

async function scrapeQuotes(page) {
  const grabQuotes = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".quote");
    let quoteArray = [];
    quotes.forEach((quote) => {
      const quoteText = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;
      quoteArray.push({ quoteText, author });
    });
    return quoteArray;
  });
  return grabQuotes;
}
