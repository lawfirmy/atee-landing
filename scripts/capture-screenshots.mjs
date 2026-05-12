import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'portfolio');

const services = [
  { slug: 'bnbtips', url: 'https://bnbtips.co.kr' },
  { slug: 'gonggoya', url: 'https://gonggoya.com' },
  { slug: 'mooagent', url: 'https://mooagent.com' },
  { slug: 'pactery', url: 'https://pactery.app' },
  { slug: 'booboo2', url: 'https://booboo2.com' },
  { slug: 'okpat', url: 'https://okpatent.co.kr' },
  { slug: 'rework', url: 'https://rework.kr' },
  { slug: 'absynote', url: 'https://absynote.com' },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });

  for (const svc of services) {
    const page = await context.newPage();
    try {
      console.log(`Capturing ${svc.slug} (${svc.url})...`);
      await page.goto(svc.url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(2000);
      const path = join(outDir, `${svc.slug}.webp`);
      await page.screenshot({ path, type: 'jpeg', quality: 80 });
      console.log(`  -> saved ${path}`);
    } catch (err) {
      console.error(`  -> FAILED ${svc.slug}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log('Done!');
}

main();
