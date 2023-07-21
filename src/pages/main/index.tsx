import React, { useEffect, useState } from "react";
import s from "./style.module.scss";
import { fetchData, instance } from "../../utils/axios";
import { Link } from "react-router-dom";
import { VideoData } from "../../utils/typs/typs";

const Main = () => {
  const [res, setRes] = useState<VideoData | null>(null);
  function getRandomWords(words: string[]): string[] {
    const randomWords: string[] = [];

    // Копируем массив слов, чтобы не изменять исходный
    const remainingWords = [...words];

    // Генерируем случайное число от 0 до длины массива слов
    while (remainingWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingWords.length);

      // Добавляем случайное слово в новый массив и удаляем его из оставшихся слов
      randomWords.push(remainingWords[randomIndex]);
      remainingWords.splice(randomIndex, 1);
    }

    return randomWords;
  }
  const words = [
    "coder",
    "rozetked",
    "git",
    "pubg",
    "csgo",
    "drift",
    "music",
    "bassMusic",
    "wild",
    "children",
  ];
  const randomWords = getRandomWords(words);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    void fetchData(`/search?part=snippet&q=${randomWords}`).then((res) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setRes(res)
    );
  }, []);

  console.log(res);

  return (
    <div className={s.main}>
      <h1>Main</h1>

      <div className={s.main_grid}>
        {res?.items?.map((item, index) => (
          <div>
            {item.snippet.kind === "youtube#channel" ? (
              <div className={s.main_card}>
                <Link
                  to={`/chanel/${item.snippet.channelId}/main`}
                  onClick={() => {
                    localStorage.setItem(
                      "channelId",
                      `${item.snippet.channelId}`
                    );
                  }}
                >
                  <img src={item.snippet.thumbnails.high.url} alt="" />
                  <h3>{item.snippet.title.slice(0, 30)}</h3>
                  <Link to={`/chanel/${item.snippet.channelId}/main`}>
                    <h5>{item.snippet.channelTitle.slice(0, 30)}</h5>
                  </Link>
                  <div></div>
                </Link>
              </div>
            ) : (
              <Link
                to={`/single/${item.id.videoId}`}
                key={index}
                onClick={() => {
                  localStorage.setItem(
                    "channelId",
                    `${item.snippet.channelId}`
                  );
                }}
              >
                <div>
                  <div className={s.main_card}>
                    <img src={item.snippet.thumbnails.high.url} alt="" />
                    <h3>{item.snippet.title.slice(0, 30)}</h3>
                    <Link
                      to={`/chanel/${item.snippet.channelId}/main`}
                      onClick={() => {
                        localStorage.setItem(
                          "channelId",
                          `${item.snippet.channelId}`
                        );
                      }}
                    >
                      <h5>{item.snippet.channelTitle.slice(0, 30)}</h5>
                    </Link>
                    <div></div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        ))}

        <div></div>
      </div>
    </div>
  );
};

export default Main;
