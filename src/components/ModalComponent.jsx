import React from "react";
import styled from "styled-components";
import Comment from "./Comment";
import ModalPortal from "./Portal";
import modal_image from "../image/modal_image.png";
import heartBtn from "../image/heart.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCompById } from "../redux/modules/complimentSlice";
import { useState } from "react";
import { __getCommment, __postComment } from "../redux/modules/commentSlice";

const ModalContainer = styled.div`
  /* height: 500px; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const ModalSize = styled.div`
  width: 500px;
  height: 800px;
  margin-bottom: 200px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  position: absolute;
  top: -900px;
  box-shadow:  0px 0px 20px #000;;
`;
const ModalLayoutCenter = styled.div`
  height: 750px;
  padding: 2.5rem;
`;

const ModalImage = styled.div`
  width: 450px;
  height: 380px;
  margin-left: -15px;
  background-image: url(${modal_image});
  background-size: cover;
`;
const ModalPropsContent = styled.div`
  width: 400px;
  height: 60px;
  text-align: center;
  padding: 1rem;
  font-size: 24px;
  font-weight: 800;
`;

const ModalInputs = styled.div`
  width: 400px;
  height: 60px;
  background-color: lightgray;
  display: flex;
`;

const Inputbox = styled.input`
  height: 30px;
  margin: auto;
  margin-right: 10px;
`;
const InputButton = styled.button`
  width: 45px;
  height: 45px;
  background-image: url(${heartBtn});
  background-size: cover;
  background-color: lightgray;
  border: none;
  margin-right: 10px;
  margin-top: 5px;
  cursor: pointer;
`;
const BackButton = styled.button`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 10px;
  bottom: 10px;
  border-radius: 20px;
  background-color: lightblue;
  cursor: pointer;
`;

const CommentList = styled.div`
  width: 450;
  height: 150px;
  overflow-y: auto;
`

const ModalComponent = () => {
  const dispatch = useDispatch();

  const comp = useSelector((state) => state.compliments.comp); // compliments의 리스트들
  const comm = useSelector((state) => {
    return state.comments.comments;
  }); // 댓글의 리스트들

  const { id } = useParams();

  useEffect(() => {
    dispatch(getCompById(Number(id)));
    dispatch(__getCommment());
  }, [dispatch, id]);

  const [fromWho, setFromWho] = useState("");
  const [commentContent, setCommentContent] = useState("");

  const postId = Number(id);

  const onSubmitComment = () => {
    if ((fromWho === "") & (commentContent === "")) return;
    dispatch(__postComment({ fromWho, commentContent, postId }));
    setFromWho("");
    setCommentContent("");
  };

  return (
    <ModalPortal>
      <ModalContainer>
        <ModalSize>
          <ModalLayoutCenter>
            <ModalImage />
            <ModalPropsContent>
              <p>
                {comp.content} - {comp.toWho}
              </p>
            </ModalPropsContent>
            <ModalInputs>
              <Inputbox
                onChange={(e) => {
                  setFromWho(e.target.value);
                }}
                placeholder="작성자"
                style={{ width: "80px" }}
                value={fromWho}
              />
              <Inputbox
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
                placeholder="댓글"
                style={{ width: "200px" }}
                value={commentContent}
              />
              <InputButton
                onClick={() => {
                  onSubmitComment();
                }}
              />
            </ModalInputs>
            {/* Comment 컴포넌트는 댓글창입니다 */}

            <CommentList >
              {comm.map((com, i) => {
                if (com.postId === postId) {
                  return <Comment com={com} i={i} postId={postId} />;
                } else {
                  return null;
                }
              })}
            </CommentList>
          </ModalLayoutCenter>

          <BackButton>
            <Link to="/main">
              <FontAwesomeIcon icon={faRotateLeft} />
            </Link>
          </BackButton>
        </ModalSize>
      </ModalContainer>
    </ModalPortal>
  );
};

export default ModalComponent;
