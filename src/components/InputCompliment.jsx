import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { __postComps } from '../redux/modules/complimentSlice';
import bton from '../image/bton.png';
import { useForm } from 'react-hook-form';

function InputCompliment() {
  const [toWho, setToWho] = useState('');
  const [content, setContent] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();

  const onSubmitCompliment = () => {
    if ((toWho === '') & (content === '')) return;
    dispatch(__postComps({ toWho, content }));
    setToWho('');
    setContent('');
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSubmitCompliment();
    }
  };

  return (
    <>
      <StForm>
        <form onSubmit={handleSubmit(onSubmitCompliment)}>
          <label for="Who"></label>
          <StInput
            id="Who"
            {...register('Who', {
              required: true,
              maxLength: {
                value: 3,
                message: '이름은 3자 이하로 입력하여 주시길 바랍니다.',
              },
            })}
            inputsize="200px"
            onChange={(e) => {
              setToWho(e.target.value);
            }}
            placeholder="누구에게"
            value={toWho}
          />
          <div className="errorMessage">
            {errors.Who?.type === 'required' &&
              '이름을 필수 조건으로 입력하시길 바랍니다'}
            {errors.Who?.type === 'maxLength' && errors.Who.message}
          </div>

          <lable for="comp"></lable>
          <StInput
            id="comp"
            {...register('comp', {
              required: true,
              maxLength: {
                value: 10,
                message: '칭찬은 10자 이하로 입력하여 주시길 바랍니다.',
              },
            })}
            inputsize="500px"
            onKeyPress={onKeyPress}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="대놓고 칭찬을?"
            value={content}
          />
          <div className="errorMessage">
            {errors.comp?.type === 'maxLength' && errors.comp.message}
          </div>
          <StButton type="submit">바통터치</StButton>
        </form>
      </StForm>
    </>
  );
}

const StForm = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 30px;
`;

const StInput = styled.input`
  width: ${(props) => props.inputsize};
  height: 50px;
  border: 1px solid black;
  border-radius: 10px;
  margin: 20px;

  padding-left: 60px;
  font-size: 15px;
  font-family: 'a15';

  background: url(${bton});
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
`;
const StButton = styled.button`
  width: 150px;
  height: 50px;
  margin: 15px;
  background-color: black;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 30px;
  font-family: 'a19';
`;

export default InputCompliment;
