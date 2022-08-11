// import { url } from 'inspector'
import React from "react";
import styled from "styled-components";
// import modifyBtn from '../image/modifybutton.png'
// import deleteBtn from '../image/deletebutton.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { __deleteComment, __editComment } from "../redux/modules/commentSlice";
import { useState } from "react";

const CommentBox = styled.div`
  width: 400px;
  height: 50px;
  border-bottom: 1px solid lightgray;
`;
const CommentForm = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
`;
const CommentUser = styled.div`
  display: flex;
  font-weight: 600;
  font-size: 19px;
`;

const CommentUsename = styled.div`
  width: 70px;
  margin-left: 10px;
`;

const CommentContent = styled.div`
  width: 180px;
`;
const CommentButtonsContainer = styled.div``;

const CommentButton = styled.button`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border: none;
  background-color: white;
  background-image: url(${(props) => props.backgroundUrl});
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const CommetInput = styled.input`
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  font-size: 15px;
`

function Comment({ com, i }) {
  const dispatch = useDispatch();

  const [cmEditToggle, setCmEditToggle] = useState(false);
  const [cmEditContent, setCmEditContent] = useState("");

  const id = com.id;

  const toggleEdit = () => {
    setCmEditToggle(!cmEditToggle);
  }; // 댓글 입력창 열고 닫기

  const onDeleteComment = (id) => {
    dispatch(__deleteComment(id));
  };

  const onFinishEditComment = () => {
    if (cmEditContent === "") return;
    dispatch(__editComment({ id, cmEditContent }));
    setCmEditToggle(false);
    setCmEditContent("");
  };

  return (
    <CommentBox i={i}>
      <CommentForm>
        😀
        {cmEditToggle === false ? (
          <CommentUser>
            <CommentUsename>{com.fromWho}</CommentUsename>
            <CommentContent>{com.commentContent}</CommentContent>
          </CommentUser>
        ) : (
          <CommentUser>
            <CommentUsename>{com.fromWho}</CommentUsename>
            <CommentContent>
              <CommetInput
                type="text"
                onChange={(e) => {
                  setCmEditContent(e.target.value);
                }}
                placeholder="다른 댓글을 써봅시다 ㅎㅎ"
                value={cmEditContent}
                />
            </CommentContent>
          </CommentUser>
        )}
        <CommentButtonsContainer>
          {cmEditToggle === false ? (
            <CommentButton
              onClick={() => {
                toggleEdit();
              }}
            >
              <FontAwesomeIcon icon={faPencil} size="2x" />
            </CommentButton>
          ) : (
            <CommentButton
              onClick={() => {
                onFinishEditComment();
              }}
            >
            <FontAwesomeIcon icon={faCheck} size="2x"/>
            </CommentButton>
          )}

          <CommentButton
            onClick={() => {
              onDeleteComment(com.id);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} size="2x" />
          </CommentButton>
        </CommentButtonsContainer>
      </CommentForm>
    </CommentBox>
  );
}

export default Comment;
