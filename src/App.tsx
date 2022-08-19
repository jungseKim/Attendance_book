import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AttendanceShow from './pages/AttendaceShow';
import Attendances from './pages/Attendances';
import Main from './pages/main';
import NotFound from './pages/notfound';
function App() {
  // let location = useLocation();

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);
  return (
    // <BrowserRouter>
    <div
      // style={{ backgroundColor: location.pathname === "/" ? "#eee6c4" : "" }}
      style={{ backgroundColor: '#eee6c4' }}
      className={'flex h-screen'}
    >
      {/* <div className="m-auto "> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Attendances" element={<Attendances />} />
        <Route path="/Attendances/:attendancesId" element={<AttendanceShow />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
      {/* </div> */}
    </div>
    // </BrowserRouter>
  );
}

export default App;
