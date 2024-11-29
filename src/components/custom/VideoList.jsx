import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'

export function VideoList({ videos }) {
  return (
    <ScrollArea className="w-1/2 pr-4">
      <div className="space-y-4">
        {videos.map((video) => (
          <div key={video.id} className="flex bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={120}
              height={90}
              className="object-cover"
            />
            <div className="p-4 flex-1">
              <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{video.views.toLocaleString()} views</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

