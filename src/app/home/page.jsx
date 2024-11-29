"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Music, Loader2, Sparkles, BarChart2 } from "lucide-react";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import PlayListChart from "@/components/custom/PlayListChart";
import { useRouter } from "next/navigation";
import ChartPage from "@/components/custom/ChartPage";

import Image from "next/image";
const Home = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [inputText, setInputText] = useState("");
    const [responseData, setResponseData] = useState([]);
    const router = useRouter();
    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        // Simulating analysis process
        const fetchedData = await fetch("/api/get-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputText,
            }),
        });
        const data = await fetchedData.json();
        if (data.success) {
            setResponseData(data.videoList);
            setIsAnalyzing(false);
            // router.push("/analyzed-result");
            return <ChartPage data={responseData} />;
            // console.log("Resonse Data", responseData);
        }
        if (!data.success) {
            setIsAnalyzing(false);
        }
        // setIsAnalyzing(false);
        console.log(data);
    };
    if (isAnalyzing) {
        return (
            <Loader
                loadingStates={loadingStates}
                loading={isAnalyzing}
                duration={2000}
            />
        );
    }

    return (
        <>
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <div className="max-w-md w-full space-y-8 relative z-10">
                    <div className="text-center">
                        <h1 className="text-5xl font-extrabold text-gray-800 mb-2 relative inline-block tracking-tight">
                            Analyze Your Playlist
                            <Sparkles className="absolute -top-8 -right-8 text-yellow-400 animate-pulse w-8 h-8" />
                        </h1>
                        <p className="text-xl text-gray-600 mt-4 font-light">
                            Uncover Your Statistics
                        </p>
                    </div>

                    <div className="mt-12 space-y-6">
                        <div className="relative group">
                            <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 group-hover:text-blue-500" />
                            <Input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Enter your playlist URL"
                                className="pl-10 pr-4 py-3 w-full border-2 border-gray-200 focus:border-blue-500 rounded-lg transition duration-300 text-lg placeholder-gray-400 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                            />
                        </div>

                        <Button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl text-lg relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center justify-center">
                                {isAnalyzing ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <BarChart2 className="mr-2 h-5 w-5" />
                                        Analyze
                                    </>
                                )}
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </Button>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-50 to-transparent"></div>

                <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -top-16 -right-16 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>
            {responseData && (
                <div className="flex justify-center mt-5">
                    <div className="w-2/3  bg-neutral-900 flex h-96 overflow-hidden rounded-md p-5">
                        <div className="w-[50%] overflow-scroll ">
                            {responseData &&
                                responseData?.videoList?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="gap-4 py-2 items-center flex"
                                    >
                                        <div>
                                            <Image
                                                width={100}
                                                height={70}
                                                src={
                                                    item.thumbnail ||
                                                    "https://ntiprit.gov.in/assets/front/img/broken-1.png"
                                                }
                                                alt="thumbnail"
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                        <div>
                                            <h1 className="text-white">
                                                {item.title}
                                            </h1>
                                            <h1 className="text-white">
                                                {item.views}
                                            </h1>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="w-[50%]">
                            <PlayListChart data={responseData?.graphData} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Home;

const loadingStates = [
    {
        text: "Initializing YouTube playlist scraping...",
    },
    {
        text: "Opening the playlist URL...",
    },
    {
        text: "Waiting for the page to load...",
    },
    {
        text: "Scrolling through the playlist...",
    },
    {
        text: "Fetching video details...",
    },
    {
        text: "Extracting video titles...",
    },
    {
        text: "Collecting video URLs...",
    },
    {
        text: "Compiling video views...",
    },
    {
        text: "Finishing up the scraping process...",
    },
    {
        text: "Preparing the video list...",
    },
];
