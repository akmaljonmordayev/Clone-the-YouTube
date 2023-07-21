import { Route, Routes } from "react-router-dom";
import "./App.css";
import Single from "./pages/single";
// import Main from "./pages/main";
import ChanelVideo from "./pages/Channel/chanelVideo";
import ChanelAbout from "./pages/Channel/chanelAbout";
import Channel from "./pages/Channel";
import Menu from "./pages/menu";
import PageNotFound from "./pages/notFound";
import Home from "./pages/home";
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <div style={{ marginBottom: "40px" }}>
        <Navbar />
      </div>
      <Routes>
        <Route path="/single/:id" element={<Single />} />
        <Route path="/chanel/:id/main" element={<Channel />}>
          <Route path="/chanel/:id/main" index element={<ChanelVideo />} />
          <Route path="about" element={<ChanelAbout />} />
          <Route path="video" element={<ChanelVideo />} />
        </Route>
        <Route path="/:selectCategory" element={<Menu />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
