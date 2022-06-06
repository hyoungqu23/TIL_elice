// 메모가 저장되는 배열
let notes = [
  {
      id: 1,
      title: '첫 메모',
      content: '애니가 작성한 첫 메모입니다.',
      author: 'annie',
  },
  {
      id: 2,
      title: '두 번째는 밥이 작성했습니다.',
      content: '안녕하세요 밥입니다.',
      author: 'bob',
  },
  {
      id: 3,
      title: '밥이 한번 더 썼습니다.',
      content: '밥이 작성한 두 번째 메모입니다.',
      author: 'bob',
  },
  {
      id: 4,
      title: '크리스도 메모를 작성했습니다.',
      content: '안녕하세요 크리스입니다.',
      author: 'chris',
  },
];

// 메모 목록을 보내주는 list 함수 (notes 배열 원소의 id, title 값으로 구성된 객체 배열을 반환)
exports.list = () => {
  return notes.map(({ id, title, author }) => ({  // destructing
    id,
    title,
    author
  }));
}

// 메모 상세를 구현하는 get 함수 (notes의 id 값이 동일한 원소를 반환하며, 없는 경우 에러를 반환)
exports.get = (id) => {
  const note = notes.find(  // 콜백이 true인 원소만 반환
    (note) => note.id === id
  );

  if (!note) {
    throw new Error('Note not found');
  }
  return note;
};

// 메모를 작성하는 create 함수 (title, content를 받아 새로운 메모를 생성하고, notes 배열 마지막 요소로 추가)
exports.create = (title, content) => {
  const { id: lastId } = notes[notes.length - 1]; // 마지막 원소 destructing

  // 새로운 note 생성하기
  const newNote = { 
    id: lastId + 1, 
    title, 
    content,
  };

  notes.push(newNote);  // 마지막 원소로 추가

  return newNote;
};

// 메모를 수정하는 update 함수 (id, title, content를 받아, 해당 메모를 찾고, 이를 수정하는 함수)
exports.update = (id, title, content) => {
  const index = notes.findIndex(  // 콜백이 true인 원소의 index만 반환(없으면 -1)
    (note) => note.id === id
  );

  if (index < 0) {  // 해당 id 값의 메모가 없음
    throw new Error('Note not found for update');
  }

  const note = notes[index];  // 수정할 메모 선택

  note.title = title; // 수정
  note.content = content; // 수정
  notes[index] = note;  // 수정한 메모 재할당

  return note;
};

// 메모를 삭제하는 delete 함수 (id 값을 받아 해당 메모를 찾고, 이를 삭제하는 함수)
exports.delete = (id) => {
  if (!notes.some((note) => note.id === id)) {  // 콜백이 true인 원소가 있는 지 여부를 파악해 있으면 true 반환(없으면 false 반환)하는 메서드
    throw new Error('Note not found for delete');
  }

  notes = notes.filter(note => note.id !== id); // 콜백이 true인 원소만 남기고 다른 원소는 제거하는 메서드

  return;
};

exports.authorList = () => {
  const authors = notes.map(({ author }) => author);
  return [...new Set(authors)];
}

exports.findByAuthor = (author) => {
  const notesByAuthor = notes.filter((note) => note.author === author);
  
  if (notesByAuthor.length < 1) {
      throw new Error(`${author} has no note`);
  }
  
  return notesByAuthor;
}