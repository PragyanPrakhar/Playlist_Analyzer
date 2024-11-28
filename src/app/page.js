"use client";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button"; // Assuming you have this Button component
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    const onClickHandler = () => {
        router.push("/home");
    };
    return (
        <div>
            <BackgroundBeamsWithCollision>
                <div className="relative z-20 text-center space-y-6">
                    {" "}
                    {/* Added wrapper with spacing */}
                    <h2 className="text-2xl md:text-4xl lg:text-7xl font-bold text-black dark:text-white font-sans tracking-tight">
                        Wanna analyze your Playlist? <br />
                        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                                <span className="">Analyze Now.</span>
                            </div>
                            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                                <span className="">Analyze Now.</span>
                            </div>
                        </div>
                    </h2>
                    <Button
                        onClick={onClickHandler}
                        className="mt-4 px-6 py-2 text-lg font-semibold bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition"
                    >
                        Analyze
                    </Button>
                </div>
            </BackgroundBeamsWithCollision>
        </div>
    );
}
