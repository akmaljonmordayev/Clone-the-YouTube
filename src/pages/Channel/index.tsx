import { Outlet, useLocation, useParams } from "react-router-dom";

import DetailBanner from "./chanelDetail";

export default function Channel() {
  const { id } = useParams();

  return (
    <div>
      <DetailBanner id={id} />
      <Outlet />
    </div>
  );
}

// http://localhost:5173/chanel/UCOlB8safm5fOwL_2uzr3JDA/main
