import "./App.css";
import Navibar from "./Components/Navibar";
// import Banner from "./Components/Banner";
import Movies from "./Components/Movies";
import WatchList from "./Components/WatchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Carousel from "./Components/Carousel";
function App() {
  return (
    <BrowserRouter>
      <Navibar />
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <Carousel />
              {/* <Banner /> */}
              <Movies />
            </Fragment>
          }
        />
        <Route path="/WatchList" element={<WatchList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
