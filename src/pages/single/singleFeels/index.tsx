import React, { ReactNode, useEffect, useState } from "react";

import s from "./style.module.scss";
import { Link } from "react-router-dom";
import { VideoData } from "../../../utils/typs/typs";
import { fetchData, instance } from "../../../utils/axios";

export default function SingleFeels({ id }: any): JSX.Element {
  const [res, setRes] = useState<VideoData | null>(null);

  useEffect(() => {
    void fetchData(
      `search?relatedToVideoId=${id}&part=id%2Csnippet&type=video`
    ).then((res) => setRes(res));
  }, [id]);

  return (
    <div className={s.main}>
      <div>
        <div className={s.main_grid}>
          {res?.items?.map((item, index) => (
            <Link
              to={`/single/${item.id.videoId}`}
              key={index}
              onClick={() => {
                localStorage.setItem("channelId", `${item.snippet.channelId}`);
              }}
            >
              <div>
                <div className={s.main_card}>
                  <img src={item.snippet.thumbnails.high.url} alt="" />
                  <div>
                    <h3>{item.snippet.title.slice(0, 30)}</h3>
                    <Link to={`/chanel/${item.snippet.channelId}/main`}>
                      <h5>{item.snippet.channelTitle.slice(0, 30)}</h5>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div></div>
        </div>
      </div>
    </div>
  );
}
