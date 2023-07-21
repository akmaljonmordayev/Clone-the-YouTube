import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { VideoData, VideoID } from "../../../utils/typs/typs";
import { fetchData, instance } from "../../../utils/axios";
import s from "./style.module.scss";
import { Link } from "react-router-dom";

export default function Trailer({ video }: VideoID) {
  const [res, setRes] = useState<VideoData | null>(null);

  useEffect(() => {
    void fetchData(`/videos?part=snippet,statistics&id=${video}`).then(
      (response: VideoData) => setRes(response)
    );
  }, [video]);

  return (
    <div className={s.trailer}>
      <div className={s.trailer_player}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video}`}
          controls
        />
      </div>
      <div className={s.trailer_box}>
        <div className={s.trailer_card}>
          {res?.items?.map((item, i) => (
            <div key={i} className={s.trailer_info}>
              <div>
                <h5>{item.snippet.title}</h5>
              </div>
              <span>
                <p>{item.statistics.viewCount} просмотров </p>
              </span>
              <span>
                <p>{item.statistics.likeCount} нравится </p>
              </span>
              <div>
                <h5>{`${item.snippet.description.slice(0, 300)}...`}</h5>
                <Link to={`/single/${item.id.videoId}`}>ПОДРОБНЕЕ...</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
