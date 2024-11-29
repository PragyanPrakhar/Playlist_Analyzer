"use client";

import { VideoList } from "@/components/custom/VideoList";
import {ViewsChart} from "@/components/custom/ViewsChart";

export default function Home({}){
    return (
        <div className="flex h-screen bg-gray-100">
          <div className="flex-1 p-4 overflow-hidden">
            <h1 className="text-2xl font-bold mb-4">YouTube Playlist Analyzer</h1>
            <div className="flex h-[calc(100vh-100px)]">
              <VideoList videos={playlistData} />
              <ViewsChart data={playlistData} />
            </div>
          </div>
        </div>
      )
}