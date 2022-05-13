# 0513

## MongoDB

대표적인 No-SQL 데이터베이스이자, Document 데이터베이스로, 대용량 데이터를 처리하기 좋은 데이터베이스이다.

**No-SQL 데이터베이스**는 다음과 같은 특징을 갖는다.

- 구조화된 질의어를 사용하지 않는다.
- 자료 간의 관계에 초점을 두지 않는다.
- 데이터를 구조화하지 않고 유연하게 저장한다.

이와 다르게 관계형 데이터베이스(RDB, Relational Database)는 자료들의 관계를 주요하게 다루고, SQL 질의어를 사용하기 위해 필수적으로 DDL(Data Definition Language)을 사용하거나 데이터를 구조화해 저장한다. 즉, 스키마에 정의된 데이터가 아니면 저장할 수 없다.

```sql
-- 데이터베이스 생성
CREATE DATABASE sample_data

-- 테이블 생성 및 구조 작성
CREATE TABLE posts (
  id NOT NULL AUTO INCREMENT
  title VARCHAR(30),
  content TEXT,
  PRIMARY KEY(id)
);

-- 데이터 추가
INSERT INTO posts (title, content) VALUES
('first title', 'first content'),
('second title', 'second content'),
```

```mongodb
use sample_data

<!-- 바로 데이터베이스의 collection에 저장 -->
db.post.insert([
  {
    title: 'first title',
    content: 'first content'
  },
  {
    title: 'second title',
    content: 'second content'
  }
]);
```

따라서 사전에 데이터 구조화 작업이 없이 데이터베이스를 사용할 수 있기 때문에 데이터베이스 작업에 크게 관여치 않고 프로젝트를 빠르게 진행할 수 있다는 점에서 No-SQL 데이터베이스가 많이 사용된다.

이러한 No-SQL 데이터베이스에는 대표적으로 자료를 Document로 저장하는 Document 데이터베이스가 일반적이지만, 이외에도 key-value, Graph, large collection 등의 No-SQL 데이터베이스가 존재한다.

### MongoDB의 기본 구조

1. **Database**

   하나 이상의 Collection을 가질 수 있는 저장소.

2. **Collection**

   하나 이상의 Document가 저장되는 공간으로, Document의 구조를 정의하지는 않는다.

3. **Document**

   MongoDB에 저장되는 자료로, 구조의 제약 없이 유연하게 저장할 수 있으며, BSON을 통해 다양한 자료형을 지원한다.

   ObjectID는 각 Document의 유일한 key 값으로 하나씩 증가하는 것이 아니라 Document를 생성할 때 자동으로 난수로 생성되는 값(timestamp + random value + auto increment)이다.

## Mongoose ODM

ODM은 Object Data Modeling의 약어로, 데이터를 객체로 모델화하여 관리할 수 있게 해주는 방식이다. Mongoose ODM은 MongoDB의 Collection에 집중해서 관리할 수 있도록 도와주는 패키지로, Collection을 모델화해, 관련 기능들을 쉽게 사용할 수 있도록 도와준다. 즉, Collection을 JavaScript의 모델로 만들어 둔 후 이를 통해 MongoDB의 데이터에 쉽게 접근하고, 수정하고 사용할 수 있도록 도와주는 패키지이다.

- 연결 관리

  MongoDB는 기본적으로 Node.js와 연결할 수 있는 기본 드라이버를 제공하지만, 이것만으로 데이터베이스와 코드 사이의 연결 상태를 관리하기는 어렵다.

  Mongoose를 활용해 간단하게 데이터베이스와 코드의 연결 상태를 관리할 수 있다.

- 스키마 관리

  No-SQL은 스키마를 정의하지 않는 것이 장점이지만, 데이터 형식을 어느 정도 미리 정의해야 코드를 작성하고, 프로젝트를 관리하는 데 유용하다.

  Mongoose는 MongoDB에서 정의되지 않는 데이터 형식을 코드 레벨에서 스키마를 정의하고 관리할 수 있게 해준다.

- Populate

  MongoDB는 관계형 데이터베이스의 특징인 Join을 제공하지 않는다. 따라서 이와 유사한 기능을 활용하려면, 복잡한 aggregate 쿼리를 제공하고 있다.

  Mongoose는 Populate를 제공하여, 이를 통해 Join 기능을 간단하게 구현할 수 있다.

### Mongoose ODM 사용 순서

#### 데이터 스키마 정의하기

Collection에 저장될 Document의 스키마를 코드 레벨에서 관리할 수 있도록 스키마를 작성할 수 있다.

```js
// ./models/schemas/board.js

// Mongoose 패키지에서 Schema 클래스 가져오기
const { Schema } = require("mongoose");

// PostSchema 객체 생성
const PostSchema = new Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  }
);

module.exports = PostSchema;
```

데이터 스키마를 정의할 때 다양한형식을 미리 지정해 데이터의 생성, 수정 작업 시 데이터 형식을 체크해주는 기능을 제공하며, 추가로 `timestamps` 옵션을 활용하면 생성, 수정 시간을 자동적으로 기록해준다.

#### 정의된 스키마를 사용해 모델 만들기

작성된 스키마를 Mongoose에서 사용할 수 있는 모델로 만들어야 한다. 이때 모델의 이름을 지정하여, Populate 등에서 해당 이름으로 모델을 호출할 수 있다.

```js
// ./model/index.js

const mongoose = require("mongoose"); // Mongoose 패키지 불러오기
const PostSchema = require("./schemas/board"); // 작성한 스키마 불러오기

// 작성한 스키마(PostSchema)를 "Post" 이름을 가진 모델로 만들고, 이를 Post 이름으로 내보내기
exports.Post = mongoose.model("Post", PostSchema);
```

#### 데이터베이스 연결하기

`connect` 함수를 활용해 간단히 데이터베이스에 연결할 수 있다. Mongoose는 자동으로 연결을 관리해주기 때문에 직접 연결 상태를 체크하지 않아도 모델 사용 시 연결 상태를 확인해 사용이 가능할 때 비동기적으로 작업을 실행해준다.

```js
// index.js

const mongoose = require("mongoose");
const { Post } = require("./models");

mongoose.connect("mongodb://localhost:27017/myapp");

// 이후 Post를 바로 활용할 수 있다. 연결되지 않아도 에러가 발생하지 않고 연결될 때까지 기다렸다가 Post가 실행이 된다.
```

#### 모델을 통해 데이터 사용하기

작성된 모델을 이용해 CRUD를 수행할 수 있다. Mongoose는 CRUD를 수행하기 위한 다양한 함수를 제공하고 있다.

- CREATE: `create`
- READ: `find`, `findById`, `findOne`
- UPDATE: `updateOne`, `updateMany`, `findByIdAndUpdate`, `findOneAndUpdate`
- DELETE: `deleteOne`, `deleteMany`, `findByIdAndDelete`, `findOneAndDelete`

##### CREATE

`create` 함수를 사용해 Document를 생성할 수 있다. 인자로 Document Object나 Document Object Array를 전달하는데, 각각 단일 Document, 복수 Document를 생성할 수 있다. `create` 함수는 생성된 Document를 반환하므로, 이를 받아 다음 코드에 사용할 수 있다.

```js
// index.js

const { Post } = require("./models");

async function main() {
  const created = await Post.create({
    title: "first title",
    content: "first content",
  });

  const multipleCreated = await Post.create({[
    item1,
    item2,
    item3,
  ]})
}
```

##### READ

`find` 관련 함수를 사용해 Document를 검색할 수 있다. query를 사용해 검색하거나 `findById` 함수를 사용하면 ObjectID 값으로 Document를 검색할 수 있다.

```js
// index.js

const { Post } = require("./models");

async function main() {
  const listPost = await Post.find(query);
  const onePost = await Post.findOne(query);
  const postById = await Post.findById(id);
}
```

> [Query](https://docs.mongodb.com/manual/reference/operator/query/)
> MongoDB에서도 SQL의 where 문과 유사한 조건절 기능을 사용할 수 있다.
> MongoDB의 Query는 JSON과 유사한 형태를 가진 BSON 형식으로, 기본 문법 그대로 mongoose에서도 사용할 수 있다.
> {key: value}로 전달되는 exact match를 사용할 수 있고, `$lt`, `$gt`, `$lte`, `$gte`를 사용해 range query를 작성할 수 있다. 또한 `$in`으로 다중 값을 검색하고, `$or`로 다중 조건 검색을 할 수 있다.
> Mongoose에서는 Query 값으로 배열이 주어지면, 자동으로 `$in` Query를 생성해준다.

```js
Person.find({
  name: "elice",
  // and
  age: {
    $lt: 20,
    $gte: 10,
  },
  // and
  languages: {
    $in: ["ko", "en"], // 둘 중 하나
  },
  // or
  $or: [{ status: "ACTIVE" }, { isFresh: true }], // 둘 중 하나
});
```

##### UPDATE

`update` 관련 함수를 사용해 Document를 수정할 수 있다. `find~` 접두사를 가진 함수들은 검색된 Document를 업데이트하여 반환해주고, `update~` 함수들은 쿼리의 결과 정보를 반환한다.

Mongoose의 update는 기본적으로 $set Operator를 사용하여, Document를 통째로 변경하지 않는다.(존재하는 속성이면 수정, 존재하지 않는 속성이면 추가)

```js
// index.js

const { Post } = require("./models");

async function main() {
  const updateResult = await Post.updateOne(query, {...});
  const updateResults = await Post.updateMany(query, {...});
  const postById = await Post.findByIdAndUpdate(id, {...});
  const onePost = await Post.findOneAndUpdate(query, {...});
}
```

##### DELETE

delete 관련 함수를 사용해 Document를 삭제할 수 있다. `find~` 접두사를 가진 함수들은 검색된 Document를 반환해주고, `delete~` 함수는 삭제 결과를 반환한다.

```js
// index.js

const { Post } = require("./models");

async function main() {
  const deleteResult = await Post.deleteOne(query);
  const deleteResults = await Post.deleteMany(query);
  const postById = await Post.findByIdAndDelete(query);
  const onePost = await Post.findOneAndDelete(query);
}
```

##### Populate

Mongoose는 Populate를 제공하여, 이를 통해 Join 기능을 간단하게 구현할 수 있다.

Document 내부에 Document를 담지 않고, ObjectID를 가지고 reference할 수 있는 방법을 제공한다. Document에는 reference되는 ObjectID를 담고, 이를 사용할 때 populate해서 마치 하위 Document처럼 사용할 수 있게 해준다.

```js
// populate.js

const Post = new Schema({
  ...
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",  // 모델
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment", // 모델
  }],
});

const post = await Post.find().populate(['user', 'comments']);

// post.user.name, post.comments[0].content 등을 사용할 수 있다.
```
