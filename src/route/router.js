import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mainpage from "../pages/mainpage";
import Intropage from "../pages/intropage";
import ModalComponent from "../components/ModalComponent";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intropage />} />
        <Route path="main" element={<Mainpage />}>
          <Route path=":id" element={<ModalComponent />} />
        </Route>
        <Route path="*" element={<div>404 바보</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
