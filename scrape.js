const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  let totalSum = 0;
  const urls = [
    'https://sanand0.github.io/tdsdata/js_table/?seed=5',
    'https://sanand0.github.io/tdsdata/js_table/?seed=6',
    'https://sanand0.github.io/tdsdata/js_table/?seed=7',
    'https://sanand0.github.io/tdsdata/js_table/?seed=8',
    'https://sanand0.github.io/tdsdata/js_table/?seed=9',
    'https://sanand0.github.io/tdsdata/js_table/?seed=10',
    'https://sanand0.github.io/tdsdata/js_table/?seed=11',
    'https://sanand0.github.io/tdsdata/js_table/?seed=12',
    'https://sanand0.github.io/tdsdata/js_table/?seed=13',
    'https://sanand0.github.io/tdsdata/js_table/?seed=14'
  ];

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for the table to appear on the DOM
    await page.waitForSelector('table');
    
    const pageSum = await page.evaluate(() => {
      let sum = 0;
      // Select all table data cells
      const cells = document.querySelectorAll('table td');
      cells.forEach(cell => {
        const value = parseFloat(cell.innerText);
        if (!isNaN(value)) {
          sum += value;
        }
      });
      return sum;
    });
    
    console.log(`Sum for seed ${url.split('=')[1]}: ${pageSum}`);
    totalSum += pageSum;
  }

  console.log(`\nFinal Total Sum: ${totalSum}`);
  await browser.close();
})();
