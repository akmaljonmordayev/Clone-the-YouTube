import { useSelectData } from "../../utils/hooks/useGetData";
import listItems from "../icons";
import s from "./styles.module.scss";
function Sidebar() {
  const selectDataFunc = useSelectData((state) => state.setSelectData);
  return (
    <div>
      <div className={s.wra}>
        {listItems.map((items, index: number) => (
          <div
            onClick={() => selectDataFunc(items.name)}
            key={index}
            className={s.icon}
          >
            <h1>{items.name}</h1>
            <i className={items.icon}></i>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Sidebar;
