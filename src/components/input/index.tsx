import { useState } from "react";
import { useSelectData } from "../../utils/hooks/useGetData";
function Search() {
  const selectDataFunc = useSelectData((state) => state.setSelectData);
  const selectData = useSelectData((state) => state.selectData);
  const [value, setValue] = useState({
    value: "",
  });
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    selectDataFunc(value.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          onChange={(e) => setValue({ ...value, value: e.target.value })}
          placeholder={selectData}
        />
      </form>
    </div>
  );
}
export default Search;
