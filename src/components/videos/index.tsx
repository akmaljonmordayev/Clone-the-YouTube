import vid from "./styles.module.scss";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader";
import { useSelectData } from "../../utils/hooks/useGetData";
import { useNavigate } from "react-router-dom";
import { instance } from "../../utils/axios";
interface Captions {
  id: {
    key?: string;
    videoId?: string;
  };
  kind?: string;
  snippet: {
    channelId?: string;
    channelTitle?: string;
    description?: string;
    publishTime?: string;
    thumbnails: {
      default: {
        url: string;
      };
      high: {
        url: string;
      };
    };
    title: string;
  };
}
function Videos() {
  const selectData = useSelectData((state) => state.selectData);
  [];
  const navigate = useNavigate();
  const { isLoading, error, data } = useQuery({
    queryKey: [selectData],
    queryFn: () =>
      instance
        .get(`/search?part=snippet&q=${selectData}`)
        .then((res) => res?.data?.items),
  });
  console.log(data, "lkjhgf");

  if (isLoading) return <Loader />;
  if (error) return <h1>error</h1>;
  return (
    <div className={vid.videos}>
      {data?.map((item: Captions, index: number) => (
        <div
          className={vid.wrapper}
          onClick={() => navigate(`/single/${item?.id?.videoId}`)}
          key={index}
        >
          <img src={item.snippet.thumbnails.high.url} alt="" />
          <h1>{item.snippet.title}</h1>
          <h2>{item.snippet.channelTitle}</h2>
        </div>
      ))}
    </div>
  );
}
export default Videos;
