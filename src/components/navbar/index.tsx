import c from "./styles.module.scss";
import imga from "./images/2222.webp";
import { Link, useLocation } from "react-router-dom";
import Search from "../../components/input";
function Navbar() {
  const loc = useLocation();

  return (
    <>
      <div className={c.wrap}>
        <div className={c.logo}>
          <Link to={"/"}>
            <img src={imga} alt="" />
          </Link>
        </div>
        {loc.pathname === "/" ? (
          <div className={c.input}>
            <Search />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Navbar;
