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
