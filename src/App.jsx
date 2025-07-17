import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./header/header";
import Banner from "./banner/banner"
import Pages from "./page/ideas"
import "./index.css";

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Banner />
      <Pages /> 
    </BrowserRouter>
  );
}

export default App;
