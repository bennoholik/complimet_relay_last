import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { __deleteComps, __editComp } from '../redux/modules/complimentSlice';

import commentbtn from '../image/combtn.png';
import modifybtn from '../image/editbutton.png';
import deletebtn from '../image/delbutton.png';
import bubble1 from '../image/bubble1.png';
import bubble2 from '../image/bubble2.png';
import peaker1 from '../image/peaker1.png';
import peaker2 from '../image/peaker2.png';
import modifycheck from '../image/modifycheck.png';
import editinput from '../image/editinput.png';

function ComplimentCard({ comp, i }) {
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  const [editedContent, setEditedContent] = useState('');

  const id = comp.id;

  const onDeleteCompliment = (id) => {
    dispatch(__deleteComps(id));
  };

  const toggleEdit = () => {
    setEdit(true);
  };

  const onFinishEdit = () => {
    if (editedContent === '') return;
    dispatch(__editComp({ id, editedContent }));
    setEdit(false);
    setEditedContent('');
  };

  const onCancelEdit = () => {
    setEdit(false);
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onFinishEdit();
    }
  };

  return (
    <StCompBox i={i}>
      <Peaker i={i} />

      {edit === true ? (
        <EditBox>
          <Editinput
            type="text"
            onKeyPress={onKeyPress}
            onChange={(e) => {
              setEditedContent(e.target.value);
            }}
            placeholder="다른 칭찬?"
            value={editedContent}
          />
          <EditButton
            onClick={() => {
              onCancelEdit();
            }}
          ></EditButton>
        </EditBox>
      ) : (
        <>
          <Textbox>
            <Good>{comp.content}</Good>
            <Who> - {comp.toWho}님 에게 </Who>
          </Textbox>

          <Buttonbox>
            <Link to={`/main/${id}`}>
              <Listbutton img={commentbtn} />
            </Link>

            <Listbutton
              onClick={() => toggleEdit()}
              img={modifybtn}
            ></Listbutton>

            <Listbutton
              onClick={() => onDeleteCompliment(comp.id)}
              img={deletebtn}
            ></Listbutton>
          </Buttonbox>
        </>
      )}
    </StCompBox>
  );
}

export default ComplimentCard;

const StCompBox = styled.div`
  width: 100%;
  height: 12.5rem;

  background: url(${({ i }) => (i % 2 === 1 ? bubble2 : bubble1)});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 1.25rem;
  position: relative;
`;

const Peaker = styled.div`
  width: 10%;
  height: 100px;
  margin: 0;
  position: absolute;
  background: url(${({ i }) => (i % 2 === 1 ? peaker2 : peaker1)});
  top: 50px;
  left: ${({ i }) => (i % 2 === 1 ? '1020px' : '270px')};
  /* right: ${({ i }) => (i % 2 === 0 ? '0px' : '270px')}; */
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Listbutton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: url(${(props) => props.img});
  background-size: contain;
  background-repeat: no-repeat;

  cursor: pointer;
`;

const Textbox = styled.div`
  width: 70%;
  height: 140px;
  padding: 50px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const EditBox = styled.div`
  width: 70%;
  height: 170px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const Editinput = styled.input`
  width: 300px;
  height: 40px;
  margin: auto;
  margin-top: 50px;
  border: none;
  border-radius: 10px;
  font-family: 'Bazzi';
  font-size: 20px;

  background: url(${editinput});
  background-color: white;
  background-repeat: no-repeat;
  background-position: 3%;
  background-size: 35px 35px;
  padding-left: 50px;
`;

const EditButton = styled.button`
  width: 50px;
  height: 50px;
  border: none;
  margin: auto;

  background: url(${modifycheck});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const Good = styled.span`
  font-family: 'Bazzi';
  font-size: 50px;
`;

const Who = styled.span`
  font-family: 'Bazzi';
  font-size: 20px;
`;

const Buttonbox = styled.div`
  width: 16%;
  height: 70px;
  margin: auto;
  display: flex;
  justify-content: space-around;
`;
