import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export const POST = async (req, res) => {
    console.log("Request is :->", req);
    const { inputText: playListUrl } = await req.json();
    console.log("PlayListUrl is :->", playListUrl);
    if (!playListUrl) {
        return NextResponse.json(
            { message: "Please provide a valid playlist URL", success: false },
            { status: 400 }
        );
    }
    async function autoScroll(page) {
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                let totalHeight = 0;
                const distance = 100; // Distance to scroll per interval
                const delay = 100; // Delay between scrolls (in ms)
                const scroll = () => {
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= document.body.scrollHeight) {
                        clearInterval(interval);
                        resolve();
                    }
                };
                const interval = setInterval(scroll, delay);
            });
        });
    }
    const videos = [];
    try {
        const browser = await puppeteer.launch({ headless: true }); // Use headless: true for no UI
       /*  const browser = await puppeteer.connect({
            browserWSEndpoint: 'wss://chrome.browserless.io/', // Replace with your service URL
        }); */
        const page = await browser.newPage();
        await page.goto(playListUrl, { waitUntil: "networkidle2" });
        await autoScroll(page);

        const videoDetails = await page.evaluate(() => {
            const videos = [];
            // Select all video elements within the playlist
            const videoElements = document.querySelectorAll(
                "ytd-playlist-video-renderer"
            );

            // Loop through each video element and extract relevant details
            videoElements.forEach((video) => {
                const title = video
                    .querySelector("#video-title")
                    ?.textContent.trim();
                const url = video.querySelector("#video-title")?.href;
                const views = video
                    .querySelector(".style-scope ytd-video-meta-block")
                    ?.textContent.trim();

                if (title && url && views) {
                    videos.push({
                        title,
                        url,
                        views,
                    });
                }
            });
            return videos;
        });

        await browser.close();

        return NextResponse.json({ videoList: videos, success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                message: "An error occurred while processing the playlist.",
                success: false,
            },
            { status: 500 }
        );
    }
};
