import styled from 'styled-components';

export const Container = styled.div`
  width: 296px;
  height: 407px;
  padding: 28px 24px 20px;

  display: flex;
  flex-direction: column;

  position: relative;
  box-sizing: border-box;

  border-radius: 8px;
  border: 1px solid #f0f1f3;

  background: #ffffff;
`;

export const Tags = styled.p`
  margin-bottom: 9px;

  font-weight: 700;
  font-size: 12px;
  line-height: 17px;

  color: #5d59ad;
`;

export const Title = styled.h5`
  margin-bottom: 18px;

  font-weight: 700;
  font-size: 18px;
  line-height: 25px;

  color: #151618;
`;

export const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;

  color: #5e5f61;
`;

export const TextsWrapper = styled.div`
  margin-top: auto;
`;

export const TextWrapper = styled.div`
  height: 20px;

  display: flex;
  align-items: center;

  + div {
    margin-top: 8px;
  }
`;

export const Text = styled.p`
  margin-left: 8px;

  font-weight: 500;
  font-size: 12px;
  line-height: 22px;

  color: #7d7e80;
`;

export const Image = styled.img`
  width: 56px;
  height: 56px;

  position: absolute;
  right: 24px;
  bottom: 158px;
`;

export const LanguageWrapper = styled.div`
  display: flex;
  margin-top: 24px;
`;

const getColorByLanguage = (language) => {
  if (language === 'Python') return '#477DB1';
  if (language === 'HTML/CSS') return '#DE561D';
  if (language === 'JavaScript') return '#F3CB39';
  if (language === 'React.js') return '#61DAFB';
};

export const Language = styled.p`
  position: relative;

  padding: 4px 6px;

  font-weight: 700;
  font-size: 12px;
  line-height: 12px;
  color: ${(props) => getColorByLanguage(props.language)};

  + p {
    margin-left: 8px;
  }

  ::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 2px;
    background-color: ${(props) => getColorByLanguage(props.language)};
    opacity: 0.2;
  }
`;

export const SeperatorLine = styled.div`
  width: 296px;
  height: 1px;

  position: absolute;
  left: 0px;
  top: 343px;

  background-color: #ececec;
`;

export const CostWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  margin-top: 44px;
`;

export const CurrentCost = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;

  color: #151618;
`;

export const OriginalCost = styled.p`
  margin-left: 9px;

  font-weight: 400;
  font-size: 14px;
  line-height: 19px;

  text-align: right;
  text-decoration-line: line-through;

  color: #a8a9ab;
`;

export const DiscountRate = styled.p`
  margin-left: auto;

  font-weight: 700;
  font-size: 16px;
  line-height: 22px;

  color: #f94669;
`;

export const FreeCost = styled.div`
  margin-top: 44px;

  font-weight: 700;
  font-size: 16px;
  line-height: 22px;

  color: #34ab53;
`;
