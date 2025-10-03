"use client";
import { cn } from "@/lib/utils";
import { infos } from "@/constants";
import { useState, useEffect } from "react";

const VideoInfo = ({
  createdAt,
  description,
  videoId,
  videoUrl,
  title,
}: VideoInfoProps) => {
  const [showToast, setShowToast] = useState(false);

  const metaDatas = [
    {
      label: "Video title",
      value: `${title}`,
    },
    {
      label: "Uploaded",
      value: `${new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`,
    },
    {
      label: "Video description",
      value: description,
    },
    {
      label: "Video id",
      value: videoId,
    },
    {
      label: "Video url",
      value: videoUrl,
    },
  ];

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(videoUrl);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const renderMetadata = () => (
    <div className="metadata">
      {metaDatas.map(({ label, value }, index) => (
        <article key={index}>
          <h2>{label}</h2>
          <p
            className={cn({
              "text-pink-100 truncate cursor-pointer hover:underline":
                label === "Video url",
            })}
            onClick={label === "Video url" ? handleCopyUrl : undefined}
          >
            {value}
          </p>
        </article>
      ))}
    </div>
  );

  return (
    <section className="video-info">
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-pink-100 text-white px-4 py-2 rounded-md shadow-lg z-50">
          Link copied
        </div>
      )}
      <nav>
        {infos.map((item) => (
          <button
            key={item}
            className={"text-pink-100 border-b-2 border-pink-100"}
          >
            {item}
          </button>
        ))}
      </nav>
      {renderMetadata()}
    </section>
  );
};

export default VideoInfo;
