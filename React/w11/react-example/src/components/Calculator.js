import React from 'react';
import styled from 'styled-components';

function Calculator() {
  return (
    <Container>
      <Screen>0</Screen>
      <Buttons>
        <Button>7</Button>
        <Button>8</Button>
        <Button>9</Button>
        <OrangeButton>/</OrangeButton>
        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
        <OrangeButton>*</OrangeButton>
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <OrangeButton>-</OrangeButton>
        <Button>0</Button>
        <Button>.</Button>
        <Button>()</Button>
        <OrangeButton>+</OrangeButton>
      </Buttons>
    </Container>
  );
}

export default Calculator;

const Container = styled.div`
  width: 300px;
  padding: 30px;
  border-radius: 7px;
  background-color: black;
  color: white;
  border: 5px solid darkgray;
  box-shadow: 5px 7px 20px rgba(0, 0, 0, 0.3);
`;

const Screen = styled.div`
  height: 60px;
  display: flex;
  justify-content: flex-end;
  font-size: 40px;
  margin-bottom: 15px;
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Button = styled.div`
  width: 25%;
  height: 50px;
  text-align: center;
`;

const OrangeButton = styled(Button)`
  color: orange;
`;
