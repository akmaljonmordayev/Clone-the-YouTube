import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { useQuery } from "@tanstack/react-query";
import v from "./styles.module.scss";
import { Link } from "react-router-dom";

import Loader from "../../components/loader/index";
import { instance } from "../../utils/axios";
function Menu() {
  const { name } = useParams();

  interface CaptionsMenu {
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
      };
      title: string;
    };
  }
  [];

  // useEffect((): any => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${name}`],
    queryFn: () =>
      instance
        .get(`/search?part=snippet&q=${name}`)
        .then((res) => res?.data?.items),
  });
  if (isLoading) return <Loader />;
  if (error) return <h1>error</h1>;
  console.log(data);
  // }, [name]);
  console.log(name);
  return (
    <>
      <div>
        <Navbar />
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div className={v.videos}>
            {data?.map((item: CaptionsMenu) => (
              <Link
                to={`/single/${item.id.videoId}`}
                onClick={() => {
                  localStorage.setItem(
                    "channelId",
                    `${item.snippet.channelId}`
                  );
                }}
              >
                <div className={v.card}>
                  <h1>{item.snippet.title}</h1>
                  <img src={item.snippet.thumbnails.default.url} alt="" />
                  <h2>{item.snippet.channelTitle}</h2>
                  <p>{item.snippet.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default Menu;
