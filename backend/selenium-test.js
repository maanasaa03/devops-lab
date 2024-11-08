const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver'); // Ensure this is installed to work with Chrome browser

(async function example() {
  let driver = await new Builder()
    .usingServer('http://localhost:4444/wd/hub') // Connect to Selenium server in Docker
    .forBrowser('chrome')
    .build();
  try {
    await driver.get('http://localhost:3000');  // Frontend URL
    let button = await driver.findElement(By.tagName('button'));
    await button.click();
    let output = await driver.wait(until.elementLocated(By.id('output')), 10000);
    let text = await output.getText();
    console.log('Output text:', text);

    if (text === 'Hello from the backend!') {
      console.log('Test passed');
    } else {
      console.log('Test failed');
    }
  } finally {
    await driver.quit();  // Close the browser after the test
  }
})();
