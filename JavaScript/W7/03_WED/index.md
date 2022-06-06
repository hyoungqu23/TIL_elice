# 0518

## intro

1. 로그인 기능 구현하기
   비밀번호 관리(보안 상 개인정보 침해 문제 해결하기) -> hash(여러 복호화 알고리즘이 있음.. sha256 aws 등에서 활용) 함수(복호화)를 활용
   <https://www.functions-online.com/hash.html>

   <https://blockchaindemo.io/>
   블록체인 여러개를 연결하여 전체 데이터의 보안..

   email validation(잘못된 이메일 기입 시 처리 방식 결정하기)
   cookie session

### 로그인 기능 구현하기

[express-validator](https://www.npmjs.com/package/express-validator): [공식 문서](https://express-validator.github.io/docs/), [bcrypt](https://www.npmjs.com/package/bcrypt) 패키지 설치하기
