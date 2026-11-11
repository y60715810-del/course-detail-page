// 用法：node export.js
// 前提：npm install puppeteer

const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });

  const htmlPath = path.resolve(__dirname, 'editor.html');
  await page.goto('file://' + htmlPath, { waitUntil: 'networkidle0' });

  // 触发生成详情页
  await page.evaluate(() => generatePage());

  // 等待渲染
  await page.waitForTimeout(1000);

  // 截取详情页区域
  const element = await page.$('#renderTarget .page');
  if (element) {
    await element.screenshot({ path: 'detail_page.png' });
    console.log('已导出 detail_page.png');
  } else {
    // 后备：截取预览 iframe
    const iframe = await page.$('#previewFrame');
    if (iframe) {
      const frame = await iframe.contentFrame();
      if (frame) {
        await frame.$eval('.page', el => el.screenshot({ path: 'detail_page.png' }));
        console.log('已导出 detail_page.png');
      } else {
        await page.screenshot({ path: 'detail_page.png', fullPage: true });
        console.log('已全页截图 detail_page.png');
      }
    }
  }

  await browser.close();
})();
