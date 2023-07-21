import React from "react";

interface Props {
  data: string; // принимаем дату в виде строки
}

const DynamicData: React.FC<Props> = ({ data }) => {
  const currentDate = new Date(); // текущая дата и время
  const receivedDate = new Date(data); // преобразуем полученную дату в объект типа Date

  const timeDifference = currentDate.getTime() - receivedDate.getTime(); // разница в миллисекундах
  const seconds = Math.floor(timeDifference / 1000); // разница в секундах
  const minutes = Math.floor(seconds / 60); // разница в минутах
  const hours = Math.floor(minutes / 60); // разница в часах

  let dynamicData = "";
  const getNoun = (number: number, titles: string[]) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  if (hours < 24) {
    dynamicData = `${hours} часов назад`;
  } else if (hours < 24 * 7) {
    const days = Math.floor(hours / 24);
    dynamicData = `${days} ${getNoun(days, ["день", "дня", "дней"])} назад`;
  } else if (hours < 24 * 30) {
    const weeks = Math.floor(hours / (24 * 7));
    dynamicData = `${weeks} ${getNoun(weeks, [
      "неделя",
      "недели",
      "недель",
    ])} назад`;
  } else if (hours < 24 * 365) {
    const months = Math.floor(hours / (24 * 30));
    dynamicData = `${months} ${getNoun(months, [
      "месяц",
      "месяца",
      "месяцев",
    ])} назад`;
  } else {
    const years = Math.floor(hours / (24 * 365));
    dynamicData = `${years} ${getNoun(years, ["год", "года", "лет"])} назад`;
  }

  // функция для правильного склонения слов

  return (
    <div>
      <p>{dynamicData}</p>
    </div>
  );
};

export default DynamicData;

// Пример использования компонента:

// import React from 'react';
// import DynamicData from './DynamicData';

// const App: React.FC = () => {
//    const data = "2021-06-05T23:26:27.658462Z"; // пример полученной даты

//    return (
//      <div>
//        <DynamicData data={data} />
//      </div>
//    );
// }

// export default App;
