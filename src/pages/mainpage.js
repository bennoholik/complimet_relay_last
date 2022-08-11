import ComplimentList from "../components/ComplimentList";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InputCompliment from "../components/InputCompliment";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

function Mainpage() {
  return (
    <MainContainer>
      <Header />
      <InputCompliment />
      <ComplimentList />
      <Outlet></Outlet>
      <Footer />
    </MainContainer>
  );
}

export default Mainpage;

const MainContainer = styled.div`
  max-width: 1370px;
  height: 100vh;
  margin: auto;
`;
