import Link from "next/link";
import { FC } from "react";
import { Video } from "../model/Video";

interface VideoProps {
  video: Video;
}

export const VideoCard: FC<VideoProps> = ({ video }) => {
  return (
    <div className="w-72">
      <Link href={`/watch?v=${video.id}`}>
        <a draggable={false} className="select-none w-72">
          <div
            id="video-thumbnail"
            className="w-full h-48 bg-base-200 rounded-md"
          ></div>
          <div className="flex flex-col">
            <p className="text-base-content text-xl line-clamp-2">
              {video.title}
            </p>
            <div className="flex justify-between">
              <Link
                href={`/user/${video.user.id}`}
                className="text-base-content text-md"
              >
                <a>{video.user.username}</a>
              </Link>
              <p className="text-base-content text-md">
                {video.createdAt.toLocaleDateString("de-DE")}
              </p>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};
