import Chart from '../../icons/Chart.js';
import Computer from '../../icons/Computer.js';
import Calendar from '../../icons/Calendar.js';
import * as Card from '../UI/Card';

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
    <Card.Container>
      <Card.Tags>{tags.join('﹒')}</Card.Tags>
      <Card.Title>{title}</Card.Title>
      <Card.Description>{summary}</Card.Description>
      <Card.TextsWrapper>
        <Card.TextWrapper>
          <Chart />
          <Card.Text>난이도: {description.level}</Card.Text>
        </Card.TextWrapper>
        <Card.TextWrapper>
          <Computer />
          <Card.Text>수업: {description.course}</Card.Text>
        </Card.TextWrapper>
        <Card.TextWrapper>
          <Calendar />
          <Card.Text>기간: {description.term}</Card.Text>
        </Card.TextWrapper>
      </Card.TextsWrapper>
      <Card.Image src={imgUrl} />
      <Card.LanguageWrapper>
        {languages.map((language, index) => {
          return (
            <Card.Language
              key={`${language}-${index}-${title}`}
              language={language}
            >
              {language}
            </Card.Language>
          );
        })}
      </Card.LanguageWrapper>
      <Card.SeperatorLine />
      {isFree ? (
        <Card.FreeCost>무료</Card.FreeCost>
      ) : (
        <Card.CostWrapper>
          <Card.CurrentCost>{currentCost.toLocaleString()}원</Card.CurrentCost>
          <Card.OriginalCost>
            {originalCost.toLocaleString()}원
          </Card.OriginalCost>
          <Card.DiscountRate>{discountRate}%</Card.DiscountRate>
        </Card.CostWrapper>
      )}
    </Card.Container>
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
