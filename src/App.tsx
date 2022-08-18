import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/main";
import NotFound from "./pages/notfound";
function App() {
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    // <BrowserRouter>
    <div
      style={{ backgroundColor: location.pathname === "/" ? "#eee6c4" : "" }}
      className={"flex h-screen"}
    >
      <div className="m-auto ">
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <Route path='/' element={<Home />} /> */}
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </div>
    </div>
    // </BrowserRouter>
  );
}

export default App;
