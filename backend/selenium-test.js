const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
    let driver = await new Builder()
    .usingServer('http://selenium:4444/wd/hub') // Ensure this matches the selenium service name
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();
  
  try {
    // Open the frontend page
    await driver.get('http://frontend:3000'); // Update to use service name
    
    // Find and click the button
    let button = await driver.findElement(By.tagName('button'));
    await button.click();

    // Wait for the output element to show the response
    let output = await driver.wait(until.elementLocated(By.id('output')), 10000);
    let text = await output.getText();

    console.log('Output text:', text);

    // Verify that the text is correct
    if (text === 'Hello from the backend!') {
      console.log('Test passed');
    } else {
      console.log('Test failed');
    }
  } finally {
    await driver.quit();
  }
})();
