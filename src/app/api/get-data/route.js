import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
export const POST = async (req, res) => {
    // Extract playlist URL from request
    const { inputText: playListUrl } = await req.json();
    console.log("Playlist URL is: ", playListUrl);

    if (!playListUrl) {
        return NextResponse.json(
            { message: "Please provide a valid playlist URL", success: false },
            { status: 400 }
        );
    }
    // Auto-scroll function to load all elements
    async function autoScroll(page) {
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 100; // Scroll distance per interval
                const interval = setInterval(() => {
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= document.body.scrollHeight) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 100); // Interval delay (ms)
            });
        });
    }

    try {
        // Launch Puppeteer
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Navigate to playlist URL
        await page.goto(playListUrl, { waitUntil: "networkidle2" });

        // Scroll through the page to load all videos
        await autoScroll(page);

        // Extract video details
        const videoDetails = await page.evaluate(() => {
            const videos = [];
            const videoElements = document.querySelectorAll(
                "ytd-playlist-video-renderer"
            );

            videoElements.forEach((video) => {
                const title = video
                    .querySelector("#video-title")
                    ?.textContent.trim();
                const url = video.querySelector("#video-title")?.href;
                const views = video
                    .querySelector(".style-scope.ytd-video-meta-block")
                    ?.textContent.trim();

                if (title && url && views) {
                    videos.push({ title, url, views });
                }
            });

            return videos; // Return the array of video details
        });

        // Close the browser
        await browser.close();

        //Preparing the data fir displaying the graph
        const graphData = videoDetails.map((video, index) => ({
            name: `Video ${index + 1}`,
            views: video.views,
        }));

        // Log and return the extracted video details
        console.log("Videos are: ", videoDetails);
        return NextResponse.json({ videoList: videoDetails,graphData, success: true });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json(
            {
                message: "An error occurred while processing the playlist.",
                success: false,
            },
            { status: 500 }
        );
    }
};
