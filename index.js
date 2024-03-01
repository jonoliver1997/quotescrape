const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");

  //Login to the website
  await page.click("a[href='/login']");

  await page.type("#username", "jonoliver");
  await page.type("#password", "Password123");

  await Promise.all([
    page.waitForNavigation({ timeout: 0 }),
    page.click("input[value='Login']"),
    console.log(" Successfully Logged in!"),
  ]);

  // Scrape the quotes
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
  console.log(grabQuotes);

  //await browser.close();
})();
