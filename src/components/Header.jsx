import styled from 'styled-components';
import headerimage from '../image/main_logo.png';

const Header = () => {
  return (
    <HeaderLayout>
      <HeaderImg />
      <HeaderText>대놓고 칭찬</HeaderText>
    </HeaderLayout>
  );
};

export default Header;

const HeaderLayout = styled.div`
  max-width: 1370px;
  height: 300px;
  display: flex;
  margin: auto;
  height: 50px;
  padding: 10px;
`;

const HeaderImg = styled.div`
  background: url(${headerimage});
  width: 110px;
  height: 150px;
  background-size: cover;
  background-position: center;
`;

const HeaderText = styled.span`
  padding-top: 25px;
  font-size: 28px;
  font-family: 'HSFont';
`;
