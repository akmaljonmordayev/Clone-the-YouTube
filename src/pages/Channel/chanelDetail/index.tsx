import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { VideoData } from "../../../utils/typs/typs";
import { fetchData } from "../../../utils/axios";
import Trailer from "../chanelTrailer";

import s from "./style.module.scss";
import ChanelNav from "../chanelNav";

interface DetailBannerProps {
  id?: string;
}

export default function DetailBanner({ id }: DetailBannerProps) {
  const [res, setRes] = useState<VideoData | null>(null);

  const loc = useLocation();

  function addSpacesToNumber(number: string): string {
    const numberString = number.toString();
    let result = "";

    for (let i = 0; i < numberString.length; i++) {
      result += numberString[i];

      if (
        (numberString.length - i - 1) % 3 === 0 &&
        i !== numberString.length - 1
      ) {
        result += " ";
      }
    }

    return result;
  }

  // const numberWithSpaces = addSpacesToNumber();

  useEffect(() => {
    void fetchData(`channels?part=snippet&id=${id}`).then(
      (response: VideoData) => setRes(response)
    );
  }, []);
  // const numberWithSpaces = addSpacesToNumber(item.statistics.videoCount);

  return (
    <div className={s.details}>
      {res?.items?.map((item, i) => {
        return (
          <div key={i}>
            {
              void localStorage.setItem(
                "publishTime",
                `${item.snippet.publishedAt}`
              )
            }
            {
              void localStorage.setItem(
                "description",
                `${
                  item.snippet.description.length < 1
                    ? ""
                    : item.snippet.description
                }`
              )
            }
            {
              void localStorage.setItem(
                "viewCount",
                `${item.statistics.viewCount}`
              )
            }
            <div className={s.detail_card}>
              <div className={s.detail_img}>
                {item.brandingSettings.image ? (
                  <img
                    src={item.brandingSettings.image.bannerExternalUrl}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </div>

              <div className={s.detail_info}>
                <div className={s.info_img}>
                  <img src={item.snippet.thumbnails.high.url} alt="" />
                </div>
                <div className={s.info_text}>
                  <h2>{item.snippet.title}</h2>
                  <div className={s.info_p}>
                    <p>
                      {item.snippet.customUrl} |{" "}
                      {item.statistics.subscriberCount > 999999
                        ? `${item.statistics.subscriberCount.slice(
                            0,
                            3
                          )} млн  подписчиков`
                        : `${item.statistics.subscriberCount.slice(
                            0,
                            3
                          )} тыс  подписчиков`}
                    </p>
                    <p>{`${item.statistics.videoCount} видео`}</p>
                  </div>
                  <p>
                    {item.snippet.description.slice(0, 150)}
                    {"..."}
                    <br />
                    <Link to={"about"}>{` Подробнее о канале`}</Link>
                  </p>
                </div>
              </div>
              <div className={s.detail_trailer}>
                <ChanelNav id={id} />
                {loc.pathname !== `/chanel/${id}/main` ? (
                  ""
                ) : (
                  <Trailer
                    video={item.brandingSettings.channel.unsubscribedTrailer}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
