import styled from 'styled-components';
import footerimage from '../image/footer.png';

const Footer = () => {
  return <FooterContainer></FooterContainer>;
};

export default Footer;

const FooterContainer = styled.div`
  max-width: 1400px;
  height: 200px;
  background: url(${footerimage});
  background-position: center;
  background-size: cover;
  justify-content: center;
  overflow: hidden;
`;
