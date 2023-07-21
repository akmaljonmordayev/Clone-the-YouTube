import s from "./style.module.scss";
// interface StorageInfo {
//   viewCount: string;
//   channelTitle: string;
//   publishTime: string;
// }

export default function ChanelAbout() {
  const viewCount = localStorage.getItem("viewCount") || "";
  const publishTime = localStorage.getItem("publishTime") || "";
  const description = localStorage.getItem("description") || "";

  const formatDate = (dateString: string) => {
    const options: object = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);

    return date.toLocaleDateString("ru-RU", options);
  };

  const dateString = publishTime;
  const formattedDate = formatDate(dateString);

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

  const numberWithSpaces = addSpacesToNumber(viewCount);

  return (
    <div className={s.about}>
      <div>
        {description.length > 1 ? (
          <span>
            <h3>О канале</h3>
            <h4>{description}</h4>
          </span>
        ) : (
          ""
        )}
        <h3>Дополнительно</h3>
        <h4>
          Для коммерческих запросов: <span>Не указано</span>
        </h4>

        <h3>Ссылки</h3>
        <a href={`https://www.youtube.com/`}>Youtube</a>
        <a href={`https://www.instagram.com/`}>Instagram</a>
      </div>
      <div>
        <h3>Статистика</h3>
        <h4>{numberWithSpaces} просмотров</h4>
        <h4>Дата регистрации: {formattedDate}</h4>
      </div>
    </div>
  );
}
