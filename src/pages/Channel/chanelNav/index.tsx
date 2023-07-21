import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import s from "./style.module.scss";

interface ChanelNav {
  id?: string;
}

export default function ChanelNav({ id }: ChanelNav) {
  const loc = useLocation();
  return (
    <div className={s.navbar}>
      <div className={s.navbar_links}>
        {loc.pathname !== `/chanel/${id}/main` ? (
          <Link to={""}>Главная</Link>
        ) : (
          <Link to={""} className={s.active}>
            Главная
          </Link>
        )}
        <NavLink to={"video"}>Видео</NavLink>
        <NavLink to={"about"}>О канале</NavLink>
      </div>
    </div>
  );
}
