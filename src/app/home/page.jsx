"use client";

// import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Music, Loader2, Sparkles, BarChart2 } from "lucide-react";
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
const Home = () => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const handleAnalyze = () => {
        setIsAnalyzing(true);
        // Simulating analysis process
        setTimeout(() => setIsAnalyzing(false), 2000);
    };

    return (
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
    );
};
export default Home;
