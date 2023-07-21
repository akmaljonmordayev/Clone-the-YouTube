import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { VideoData } from "../../utils/typs/typs";
import { fetchData, instance } from "../../utils/axios";
import ReactPlayer from "react-player";
import s from "./style.module.scss";
import like from "../../assets/like-svgrepo-com.svg";
import dislike from "../../assets/dislike-outlined-thumb-svgrepo-com.svg";
import SingleFeels from "./singleFeels";

export default function Single() {
  const { id } = useParams();

  const [res, setRes] = useState<VideoData | null>(null);
  const [resm, setResm] = useState<VideoData | null>(null);
  const [com, setCom] = useState<VideoData | null>(null);

  useEffect(() => {
    void fetchData(`videos?part=snippet,statistics&id=${id}`).then((response) =>
      setRes(response)
    );
    void fetchData(
      `channels?part=snippet&id=${localStorage.getItem("channelId")}`
    ).then((respons) => setResm(respons));
    void fetchData(`commentThreads?part=snippet&videoId=${id}`).then(
      (coments) => setCom(coments)
    );

    handleClick();
  }, [id]);

  function handleClick(): void {
    const targetElement = document.getElementById("active");
    targetElement.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={s.single} id="active">
      <div className={s.single_grid}>
        <div>
          <div className={s.single_player}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
            />
          </div>
          <div className={s.single_flex}>
            <div className={s.single_title}>
              {res?.items?.map((item, i) => (
                <div key={i}>
                  <div className={s.single_titleInfo}>
                    <h3>{item.snippet.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className={s.single_account}>
              {resm?.items?.map((item, i) => (
                <div key={i} className={s.single_accountFlex}>
                  <div className={s.single_accountInfo}>
                    <img src={item.snippet.thumbnails.high.url} alt="" />
                    <div>
                      {res?.items?.map((e, i) => (
                        <div key={i}>
                          <Link to={`/chanel/${e.snippet.channelId}/main`}>
                            <h3>{e.snippet.channelTitle}</h3>
                          </Link>
                        </div>
                      ))}
                      <p>{item.statistics.subscriberCount} подписчиков</p>
                    </div>
                  </div>
                  <div className={s.single_rate}>
                    {res?.items.map((e, i) => (
                      <div key={i}>
                        <h3>
                          {" "}
                          <img src={like} alt="" /> {e.statistics.likeCount}
                          <p>|</p>
                          <img src={dislike} alt="" />
                        </h3>
                      </div>
                    ))}
                    {/* <h3>"</h3> */}
                  </div>
                </div>
              ))}
            </div>
            <div className={s.single_info}>
              {res?.items?.map((item, i) => (
                <div key={i}>
                  <div className={s.single_videoInfo}>
                    <p>{item.statistics.viewCount} просмотра</p>
                    <span>{item.snippet.description}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={s.single_comments}>
              {com?.items?.map((item, i) => (
                <div key={i} className={s.single_gap}>
                  <div className={s.single_commentsFlex}>
                    <div className={s.single_userImg}>
                      <img
                        src={
                          item.snippet.topLevelComment.snippet
                            .authorProfileImageUrl
                        }
                        alt={
                          item.snippet.topLevelComment.snippet
                            .authorProfileImageUrl
                        }
                      />
                    </div>
                    <div className={s.single_comentsInfo}>
                      <h4>
                        {item.snippet.topLevelComment.snippet.authorDisplayName}
                      </h4>
                      <span>
                        {item.snippet.topLevelComment.snippet.textDisplay.substring(
                          0,
                          1
                        ) !== "<a"
                          ? item.snippet.topLevelComment.snippet.textDisplay.slice(
                              0,
                              50
                            )
                          : ""}{" "}
                      </span>
                      <div className={s.like}>
                        <p>
                          <img src={like} alt="" />{" "}
                          {item.snippet.topLevelComment.snippet.likeCount}
                        </p>
                        <p>
                          <img src={dislike} alt="" />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <SingleFeels id={id} />
        </div>
      </div>
    </div>
  );
}
