const Form = () => {
  const formState = {};

  function register(name, validator = (value) => true) {
    // register시, state에 필드를 등록합니다.
    // 필드 등록 객체는 { value, validator } 입니다.
    // value는 빈 문자열로 초기화됩니다.

    // ! 저장하고 싶은 필드가 `register()` 함수를 거치면, `formState`가 `{ username : validator }`가 되는데, 이때 `validator`는 함수이다. 예를 들면, `(field) => { field.length < 5; }` 처럼 하나의 함수가 들어간다.

    // ! App.js를 참조하면,  `favoriteForm.register("food", (value) => value.length > 1);` 처럼 작성되어 있는데, 즉, `value`인 'food'가 길이가 1보다 큰 값을 반환하는 함수인 `validator`와 함께 register되는 것을 확인할 수 있다.

    formState[name] = {
      value: '',    // 초기화 값 설정 = 빈 문자열
      validator
    };
  }

  function validate() {
    // state의 전체 필드를 검사합니다.
    // `validator(value)`로 value가 유효한지 검사할 수 있습니다.
    // 전체 필드가 유효해야만 폼이 유효합니다.

    // ! App.js를 참조하면, validate 함수가 false를 반환하면, 입력된 값을 확인해달라는 메시지가 나타나게 된다.
    // ! submitButton.addEventListener("click", () => {
    // !   const validationResult = favoriteForm.validate();
    // !   if (!validationResult) {
    // !     result.innerHTML = "입력된 값을 확인해주세요.";
    // !     return;
    // !   }
    // !   result.innerHTML = "제출에 성공했습니다!";
    // ! });

    // ! 이때 Object 객체의 method를 활용한다.(Object.values)
    // formState에는 다음과 같이 데이터가 저장된다. 따라서 Object.values를 통해 { value, validator }인 각각의 객체를 배열로 얻을 수 있다.
    // {
    //   username : { value, validator },
    //   password : { value, validator }
    // }

    return Object
        .values(formState)
        .reduce((flag, {value, validator}) => validator(value) && flag, true)
  }

  function getFormData() {
    // state의 각 필드에 있는 value를 모아 하나의 객체로 반환합니다.
    // `{ name : 'Kim', age: 30 }`의 형식, 즉 `이름과 값 쌍`으로 리턴해야 합니다.
    // 이 경우 `getFormData()`는 `state`의 `value`와 이름을 매칭시키고 하나의 객체를 만드는 함수가 된다.

    // return Object
    //     .entries(formState)        // [[username : { value, validator }], [], [], ...]과 같이 반환
    //     .reduce((formData, [key, {value, validator}]) => ({ ...formData, [key] : value}))
        
    return Object
        .entries(formState)
        .reduce((formData, item) => {
            const [key, {value, validator }] = item
            formData[key] = value
            return formData
        }, {})
  }

  function setValue(name, value) {
    // ! `name`으로 찾은 필드의 `value`를 저장합니다.
    // name에 해당하는 상태는 반드시 있다고 가정합니다.

    // formState에 저장된 객체 중 `name`과 같은 필드를 찾고, 이 필드에는 value, validator가 들어 있다.
    // `...formState[name]`을 통해 둘 모두를 얻을 수 있고, value를 업데이트 하기 위해 value를 넘겨주어야 한다.
    formState[name] = {
        ...formState[name],
        value
    }
  }

  return {
    register,
    validate,
    getFormData,
    setValue,
  };
};

export default Form;