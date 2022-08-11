import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { __getComps } from "../redux/modules/complimentSlice";
import ComplimentCard from "./ComplimentCard";

function ComplimentList() {
  const dispatch = useDispatch();
  const { isLoading, error, comps } = useSelector((state) => state.compliments);

  useEffect(() => {
    dispatch(__getComps());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div>
        <h1>로딩 중....</h1>
      </div>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <ListContainer>
      {comps.map((comp, i) => (
        <ComplimentCard comp={comp} i={i} />
      ))}
    </ListContainer>
  );
}

export default ComplimentList;

const ListContainer = styled.div`
  max-width: 1370px;
  display: block;
  margin: auto;
  height: 570px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
