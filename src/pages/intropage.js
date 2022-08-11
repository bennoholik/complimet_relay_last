import styled from 'styled-components';
import titleimage from '../image/main_title.png';
import mainimage from '../image/main_img.png';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Intropage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Maincontainer>
        <Header />

        <Title>
          <TitleImg />
          <StartButton
            onClick={() => {
              navigate('/main');
            }}
          >
            <Startfont>릴레이 시작!</Startfont>
          </StartButton>
        </Title>

        <MainImg />
      </Maincontainer>
    </>
  );
};

export default Intropage;

const Maincontainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const Title = styled.div`
  max-width: 1370px;
  height: 300px;
  display: flex;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const TitleImg = styled.div`
  background: url(${titleimage});
  width: 600px;
  height: 660px;
  background-size: cover;
  background-position: center;
`;

const StartButton = styled.button`
  width: 250px;
  height: 90px;
  margin-top: 10px;

  border: none;
  background: #ffda8f;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #f29539;
  }
`;

const Startfont = styled.span`
  font-size: 20px;
  color: white;
  font-weight: bold;
`;

const MainImg = styled.div`
  background: url(${mainimage});
  background-position: center;
  background-size: cover;
  max-width: 1370px;
  height: 529px;
  display: flex;
  margin: auto;
  margin-top: 10px;
`;
