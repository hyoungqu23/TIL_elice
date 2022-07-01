import Chart from '../../icons/Chart.js';
import Computer from '../../icons/Computer.js';
import Calendar from '../../icons/Calendar.js';
import {
  Container,
  Tags,
  Title,
  Description,
  TextsWrapper,
  TextWrapper,
  Text,
  Image,
  LanguageWrapper,
  Language,
  SeperatorLine,
  FreeCost,
  CostWrapper,
  CurrentCost,
  OriginalCost,
  DiscountRate,
} from '../UI/Card';

const CourseCard = ({
  tags,
  title,
  summary,
  description,
  imgUrl,
  languages,
  isFree,
  currentCost,
  originalCost,
  discountRate,
}) => {
  return (
    <Container>
      <Tags>{tags.join('﹒')}</Tags>
      <Title>{title}</Title>
      <Description>{summary}</Description>
      <TextsWrapper>
        <TextWrapper>
          <Chart />
          <Text>난이도: {description.level}</Text>
        </TextWrapper>
        <TextWrapper>
          <Computer />
          <Text>수업: {description.course}</Text>
        </TextWrapper>
        <TextWrapper>
          <Computer />
          <Text>기간: {description.term}</Text>
        </TextWrapper>
      </TextsWrapper>
      <Image src={imgUrl} />
      <LanguageWrapper>
        {languages.map((language, index) => {
          return (
            <Language key={`${language}-${index}-${title}`} language={language}>
              {language}
            </Language>
          );
        })}
      </LanguageWrapper>
      <SeperatorLine />
      {isFree ? (
        <FreeCost>무료</FreeCost>
      ) : (
        <CostWrapper>
          <CurrentCost>{currentCost.toLocaleString()}원</CurrentCost>
          <OriginalCost>{originalCost.toLocaleString()}원</OriginalCost>
          <DiscountRate>{discountRate}%</DiscountRate>
        </CostWrapper>
      )}
    </Container>
  );
};

CourseCard.defaultProps = {
  tags: ['JavaScript', 'React.js'],
  title: 'React.js로 만드는 Article 저장소',
  summary: 'React.js로 당신을 위한 기록의 중요성을 느껴보세요.',
  description: {
    level: '초급',
    course: '온라인',
    term: '무제한',
  },
  imgUrl: 'logo192.png',
  languages: ['JavaScript', 'React.js', 'HTML/CSS'],
  isFree: false,

  currentCost: 42000,
  originalCost: 57000,
  discountRate: 35,
};

export default CourseCard;
