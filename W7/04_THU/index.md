# 0518

## 회원 가입 기능

간소화된 회원 가입 절차를 구현하기 위해 ID로 사용될 이메일, 이름, 비밀번호 세 가지 정보만 사용한다.

- 이메일의 경우, 형식이 올바른 지 여부를 파악해야 한다.
- 비밀번호의 경우, 최소 길이 이상인지 여부를 파악하고, 비밀번호와 비밀번호 확인이 동일한 지 여부를 파악해야 한다.
- 비밀번호에 대문자, 숫자, 특수문자를 포함해야 한다는 조건은 어떻게 구현할 지 생각해보자.

### 회원 정보를 데이터베이스에 저장하기

회원이 가입 시 입력한 정보를 데이터베이스에 그대로 저장하는 경우 보안 취약점이 발생할 수 있기 때문에 암호화하여 저장해야 한다.

Hash는 문자열을 되돌릴 수 없는 방식으로 암호화하는 단방향 암호화 방법으로, Hash 출력 값을 이용해 사용자의 비밀번호를 알아낼 수 없다. 따라서, 해당 Hash 값을 데이터베이스에 저장하고, 로그인 시 사용자가 전달한 비밀번호를 동일한 로직으로 Hash하여 저장된 값과 비교해 일치하는 경우 로그인 처리를 할 수 있다.

```javascript
const hash = crypto.createHash("sha1");
hash.update(password);
hash.digest("hex"); // 16진수 문자열로 출력
```

Node.js에서 Hash 값을 만들기 위해서는 기본 제공 module인 `crypto`를 사용하면 되는데, 단순한 sha1이나 보다 강력한 sha224, sha256 등의 알고리즘을 적용할 수 있다.

## 로그인 기능

Express.js 어플리케이션에서 간단하게 사용자 인증 기능을 구현하는 패키지인 passport.js를 활용해 유저 세션 관리 및 다양한 로그인 방식을 추가할 수 있다.

passport.js는 다양한 로그인 방식을 구현하기 위해 strategy라는 인터페이스를 제공하고, 이에 맞게 미리 설계된 여러 구현체가 존재한다. username과 password를 통해 로그인할 수 있게 설계된 passport-local이 대표적이다.

## Session

웹 서버가 클라이언트의 정보를 클라이언트별로 구분해 서버에 저장하고, 클라이언트 요청 시 세션 ID를 통해 정보를 재확인하게 된다. 즉, 클라이언트가 로그인 요청을 하면, 그것을 받은 서버가 하나의 Session을 생성하고, 그 구분자인 Session ID를 클라이언트에 전달한다. 클라이언트는 이를 추후에 요청을 할 때 담아서 함께 전송하고, 서버는 전달받은 ID를 통해 해당 Session을 찾아 요청을 한 클라이언트 정보를 확인한다. 클라이언트가 정보를 저장하고, 요청 시 정보를 보내는 쿠키와는 다르다.

Express.js에서는 express-session 패키지를 통해 간단히 Session 동작을 구현할 수 있다. 다만, Session을 기본적으로 메모리에 저장하므로 해당 프로세스, 즉, 현재 구현된 어플리케이션이 종료되면 Session이 모두 사라져 모든 유저의 로그인이 해제되는 문제가 있다. 또한 서버가 여러 대 있는 경우 서버 간 Session 정보를 공유할 수 없다는 문제도 존재한다.

따라서, Session Store를 사용하여 각각의 Express 어플리케이션을 연결하여 Session을 공유하여 어플리케이션을 종료하더라도 Session을 유지할 수 있다. 이를 위해 여러 방법이 있지만, connect-mongo 패키지를 활용하여 MongoDB를 Session Store로 사용할 수 있다.

## 회원과 게시글 연동 기능

게시글 작성 시 로그인된 회원 정보를 `author` 필드에 추가하고, 게시글과 작성자를 populate하여 사용하도록 구현할 수 있다.

## CSR 댓글 기능

CSR은 페이지 로드 시 필요한 리소스를 클라이언트에 선언하고, 데이터를 비동기적으로 호출받아 화면에 표시하는 것이다.

## [Aggregation](https://www.mongodb.com/docs/manual/meta/aggregation-quick-reference/#stages)

MongoDB에서 Document 들을 가공하고, 연산하는 기능으로, RDBMS에서 SQL로 수행할 수 있는 기능들을 유사하게 구현할 수 있다.

MongoDB의 find는 검색 필터링과 정렬 이외의 기능을 제공하지 않기에 다른 Collection에서 데이터를 가져오거나, 검색된 데이터를 그룹화하는 등의 작업이 필요한 경우 Aggregation을 활용해야 한다.

```js
db.posts.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $match: { sum: { $gt: 10 } } },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "users",
    },
  },
]);
```

aggregation은 Stage들의 배열로 이루어지고 각 Stage는 순차적으로 수행된다. 즉, 작성자별 게시글 수를 취합하고 게시글 수가 10개보다 많은 작성자를 찾아서 해당 작성자를 회원 collection에서 검색하는 순서로 이루어진다.

이러한 aggregation은 MongoDB Compass에서 더 쉽게 확인할 수 있다.
