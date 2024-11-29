import { join } from "path";

/**
 * @type {import("puppeteer").Configuration}
 */
const puppeteerConfig = {
    // Changes the cache location for Puppeteer.
    cacheDirectory: join(process.cwd(), ".cache", "puppeteer"),
};

export default puppeteerConfig;
