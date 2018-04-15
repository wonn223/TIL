#### transform과 polyfill

바벨(`babel-core`패키지)의 transform은 새로운 언어 syntax를 기존 syntax(보통 자바스크립트에선 ES5)로 바꾸는 기능을 한다. 

단, `babel-core`가 새로운 syntax를 대체할 만한 방법을 찾지 못해 trasnform이 어려운 경우가 있다. 이 때 `babel-polyfill`이나 `babel-runtime`같은 polyfil패키지가 필요하다.

ex) ES6의 Arrow Function은 transform이 가능지만, Array.from()이나 Array.prototype.values()는 babe-polyfill이나 babel-runtime 패키지가 필요하다.

* 최근엔 새로운 syntax 중 자주 쓰는 부분만 transform을 도와주는 `preset`이 나왔다. 필요한 부분만 있어서 사용 빈도가 높고, 다른 바벨 패키지에 비해 가볍기 때문에 자주 쓴다. 주의할 점은 바벨의 오버라이딩이다. 브라우저가 새 syntax를 지원하기 시작했는데도, 계속해서 바벨의 복잡한 코드를 쓰는 경우가 발생할 수 있다. [이럴 땐 `env`가 들어간 preset을 활용해, 브라우저 상황 별 tranform을 설정한다.](http://2ality.com/2017/02/babel-preset-env.html)


#### `babel-polyfill`과 `babel-runtime`의 차이
둘다 폴리필 라이브러리인 `core.js`를 활용해 새 문법이 작동할 수 있는 환경을 만들어 주는데, 그 구현방식이 다르다. 

babel-poliyfill은 전역이나 네이티브 객체의 프로토타입에 자신의 polyfill코드를 덮어 씌운다. `import`처럼 모듈을 직접 불러올 필요가 없어 간편하다. 단, 전역 오염 이슈가 발생한다.

babel-runtime은 오버라이딩이 아니라 라우팅을 이용한다. `definitions.js`라는 파일 안에 [새 syntax를 core.js에 있는 식별자와 매핑시켜서](https://github.com/babel/babel/blob/472ad1e6a6d4d0dd199078fdb08c5bc16c75b5a9/packages/babel-plugin-transform-runtime/src/definitions.js), 원하는 객체나 메소드를 임포트한다.

```c
// babel/packages/babel-plugin-transform-runtime/src/definitions.js
  methods: {
    Array: {
      concat: "array/concat",
      copyWithin: "array/copy-within",
      entries: "array/entries"
      ....
    },
    Object: {
      assign: "object/assign",
      create: "object/create",
      ....
    }
```

```c
// babel/packages/babel-runtime/scripts/build-dist.js

const coreDefinitions = require("@babel/plugin-transform-runtime").definitions;

const paths = ["is-iterable", "get-iterator"];

// definitions에서 매핑한 객체 키를 가져온다.
Object.keys(coreDefinitions.methods).forEach((key) => {
  // Array, Object 등등
  const props = coreDefinitions.methods[key];

  // Array, Object 객체 안의 키를 가져온다.
  Object.keys(props).forEach((key2) => {
    // concat, assign 등등
    const path = props[key2];
    // paths에 할당
    paths.push(path);
  });
});

// 뽑아낸 키로 모듈 임포트 문을 생성한다.
paths.forEach(function(path) {
  writeFile(
    "core-js/" + path + ".js",
    defaultify(`require("core-js/library/fn/${path}")`)
  );
});

function defaultify(name) {
  return `module.exports = ${name};`;
}
```

전역오염 이슈는 없지만, 인스턴스가 호출의 주체일 때는 babel-runtime이 인스턴스 타입을 제대로 파악하지 못할 때가 있다. 이렇게 되면 원하는 메소드를 쓰지 못한다. 

```c
// babel-runtime에선 인식이 안 될 수 있는 코드
[0, 1, 2].includes(1)

"!!!".repeat(3)
```

<!-- #### babel-runtime에서 runtime의 의미?

스크립트가 실행되기 전(컴파일 타임)에 ES6 방식의 모듈이 실행된다. 이 때 중요한 점은 export한 모듈 중에 import한 모듈만 스크립트에 남게된다는 것이다. 

babel-polyfill은 컴파일 과정에 자바스크립트 네이티브 객체 자체에 폴리필 코드를 덮어씌우기 때문에 모듈을 부르는 과정이 없다.

https://maurobringolf.ch/2017/11/compile-time-versus-runtime-and-what-runs-at-compile-time/

https://medium.freecodecamp.org/javascript-modules-part-2-module-bundling-5020383cf306 -->