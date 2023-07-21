import style from "./styles.module.scss";
import { Link } from "react-router-dom";
function PageNotFound() {
  let a: string = "Page not found 🚫🔕😒";
  return (
    <>
      <h1 className={style.h1}>{a}</h1>
      <Link to={"/"}>back to</Link>
    </>
  );
}
export default PageNotFound;
