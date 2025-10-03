import { redirect } from "next/navigation";

import { getVideoById } from "@/lib/actions/video";
import { VideoDetailHeader, VideoInfo, VideoPlayer } from "@/components";

const page = async ({ params }: Params) => {
  const { videoid } = await params;

  const { user, video } = await getVideoById(videoid);
  if (!video) redirect("/404");

  return (
    <main className="wrapper page">
      <VideoDetailHeader
        title={video.title}
        createdAt={video.createdAt}
        userImg={user?.image}
        username={user?.name}
        videoId={video.videoId}
        ownerId={video.userId}
        visibility={video.visibility}
        thumbnailUrl={video.thumbnailUrl}
      />

      <section className="video-details">
        <div className="content">
          <VideoPlayer videoId={video.videoId} />
        </div>

        <VideoInfo
          title={video.title}
          createdAt={video.createdAt}
          description={video.description}
          videoId={videoid}
          videoUrl={video.videoUrl}
        />
      </section>
    </main>
  );
};

export default page;
