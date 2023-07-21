import React, { useEffect, useState } from "react";
import { fetchData, instance } from "../../../utils/axios";
import s from "./style.module.scss";
import { Link, Outlet, useParams } from "react-router-dom";
import { VideoData } from "../../../utils/typs/typs";
import DynamicData from "../../../components/Time";

const ChanelVideo = () => {
  const [res, setRes] = useState<VideoData | null>(null);
  const [ser, setSer] = useState<VideoData | null>(null);
  const { id } = useParams();

  useEffect(() => {
    void fetchData(`/search?channelId=${id}&part=snippet%2Cid&order=date`).then(
      (response: VideoData) => setRes(response)
    );
    // void fetchData(`/videos?part=snippet,statistics&id=${id}`).then(
    //   (response: VideoData) => setSer(response)
    // );
  }, [id]);

  return (
    <div className={s.chanel}>
      <div className={s.chanel_grid}>
        {res?.items?.map((item, index) => (
          <div key={index}>
            <Link
              to={`/single/${item.id.videoId}`}
              onClick={() => {
                localStorage.setItem("channelId", `${item.snippet.channelId}`);
              }}
            >
              <div className={s.chanel_card}>
                <div className={s.chanel_vid}>
                  <img src={item.snippet.thumbnails.high.url} alt="" />
                </div>

                <h4 title={item.snippet.title}>
                  {item.snippet.title.length > 15
                    ? `${item.snippet.title.slice(0, 45)}...`
                    : item.snippet.title}
                </h4>

                <div className={s.card_flex}>
                  <p>{item.snippet.channelTitle}</p>
                  <p>•</p>
                  <DynamicData data={item.snippet.publishTime} />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChanelVideo;
