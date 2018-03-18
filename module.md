일반적으로 `script`로 불러온 스크립트 파일은 window라는 하나의 컨텍스트를 공유하기 때문에 1) 변수 식별자가 똑같거나 2) 참조하고 있던 디펜던시가 순서상 늦게 로딩되는 경우 에러가 발생한다. 

### ES6이전 자바스크립트에서 모듈을 만든 방식

노출 모듈 패턴 : 1)즉시실행함수와 2)리턴문 사용하기
```c

1. 즉시실행함수
()는 함수를 표현식으로 만들어준다. 표현식이 함수를 반환하면 마지막 줄에 있는 호출 기호(())로 함수를 호출한다.

(function a = () => {
    console.log('hello');
})();

2. 클로저 - 리턴 문에 반환시키기
var a = (function(){
  function sayHello(){
    return  console.log('hello');
  }

  return {
      sayHello : sayHello
  }
})();

a.sayHello(); // 'hello'
```

전역 스코프에 모듈 식별자(`a`) 하나만 노출했기 때문에, 식별자 중복을 크게 줄여준다. 단 이 패턴은 모듈을 내보내거나 의존성 모듈은 불러올 순 없다. 이렇게 모듈의 형식과 의존성 관리에 필요한 기준이 분명하지 않았다.

### 모듈 형식 정하기
이 부분을 해결하기 위해 CommonJS , AMD가 나왔다. 이 둘은 모듈을 내보내고 받을 수 있는 문법을 정했다. 이 문법을 따르는 스크립트는 선언한 모듈만 바라보게 된다.

#### Common JS 
```c
//private 변수
const dev = require('./dev1');
dev.func();
const a = 1;
const b = 2;

// 외부에 공개할 부분(캡슐화)
module.exports = {
    a,
    b
}
```
#### [AMD](https://github.com/codepink/codepink.github.com/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88,-%EB%AA%A8%EB%93%88-%ED%8F%AC%EB%A7%B7,-%EB%AA%A8%EB%93%88-%EB%A1%9C%EB%8D%94%EC%99%80-%EB%AA%A8%EB%93%88-%EB%B2%88%EB%93%A4%EB%9F%AC%EC%97%90-%EB%8C%80%ED%95%9C-10%EB%B6%84-%EC%9E%85%EB%AC%B8%EC%84%9C)

```c
//Calling define with a dependency array and a factory function
define(['dep1', 'dep2'], function (dep1, dep2) {

  //Define the module value by returning a value.
  return function () {};
});
```

#### ES6의 모듈 형식
ECMAScript에서도 이러한 포맷을 정식 개념으로 등록했다. ES6에서는 모듈 키워드로 import/export 를 사용한다.

```c
import React from 'react';
import { render } from 'react-dom';
```

export하는 방식은 여러가지다
```c
//1.js
export b = 3;  
export { a } = 1; // 객체에 담기
export const c = 2; // 선언 + 초기화 동시에 export
export default b; // 

//2.js
import d, { a, c } from './1.js'  
```

default는 import를 할 때 괄호가 필요없고, 식별자도 원하는 대로 바꿀 수 있다. default를 제외한 두 export 방식은 중괄호가 필요하다.

브라우저가 ES6의 import,export키워드를 읽지 못하는 경우를 대비해서 바벨이란 컴파일러를 추가적으로 사용한다. 바벨은 ES6를 이전 버전으로 바꿔준다.

( 바벨에도 ES6를 대체할 객체가 없을 수 있으므로 `babel-polyfill`같은 디펜던시를 필요로 한다. 처음부터 `babel-preset-env`패키지를 받으면 폴리필을 설치하지 않아도 된다.)

- [노드JS에서 사용하는 export방식은 또 다르다](http://poiemaweb.com/nodejs-module).

- 리액트에서는 웹팩과 바벨 cofig 설정을 정해놓고 건드리지 못하게 숨겨놨다. webpack.config같은 파일을 직접 수정하고 싶으면 명령어 `npm run eject`로 config파일을 노출시킨다. 단, 명령어를 한번 실행시키면 다시 되돌릴 수 없다. 이 방법이 싫으면 직접 node modules에 있는 `react-scripts`로 찾아 들어가 config파일을 확인할 수 있다.


#### 모듈 번들러
위와 같은 형식에 맞춰 모듈을 정의하면, 런타임에 모듈 해석이 이뤄진다. 이 역할을 하는 RequireJS나 System JS 모듈 로더가 있었으나 최근에는 `browserify`나 `webpack`을 활용해 모듈 로딩 기능과 함께 여러 모듈을 하나의 모듈로 모아주는 번들링 기능을 동시에 해결하고 있다. 

특히 웹팩은 플러그인 기능이 있어 다양한 방향으로 확장할 수 있다.  바벨로더를 활용하면 바벨의 트랜스파일링 기능을 웹팩에서도 구현할 수 있고, css로더를 활용하면 스타일시트(css) 파일도 번들링이 가능하다.

#### webpack.config.js 설정
webpack에서 `소스 맵 설정`을 사용하면 원래의 파일 구조를 확인할 수 있다. 아래와 같이 설정하고 브라우저 개발자 도구를 켜면 기존의 파일 디렉토리를 확인할 수 있다.
```c
module.exports = {  
    ... 
    devtool: '#inline-source-map'
}
```