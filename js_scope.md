자바스크립트 함수의 스코프 체인, es6에서의 변화

### 격리 시키기 

함수 스코프를 활용한 모듈은 안정적인 상태 격리를 보장해준다. 모듈을 제대로 사용하려면 함수를 이해해야한다.

기본적으로 함수를 만들 땐 지역변수와 인자에 의존하는 순수함수를 지향한다. 그리고 지역변수와 인자에 들어가는 데이터형은 값의 원본을 훼손하지 않는 Immutable이다. 순수함수에선 상태라는 개념도 없기 때문에 상태로 인한 스레드 동기화, 시계열 디버깅 이슈가 없다.

다른 언어에서는 순수 함수가 객체로 쓰이면 순수함수의 돌연변이 같은 상태 함수가 되는데, 이를 가리켜 클로저라고 한다. 자바스크립트에서 언급되는 클로저와는 다른 개념이란 걸 확인할 수 있다. 자바스크립트의 클로저는 호출되는 함수와 함수 내부 객체가 만드는 스코프 시스템 일체를 말한다. 

### 자바스크립트에서 함수 실행 시 나타는 일들

자바스크립트에서 함수 생성 시점은 런타임에 함수가 호출될 때다. 호출된 함수는 반드시 자신을 감싸는 래퍼 함수가 반드시 존재하는데, 전역이 여기에 해당한다. 코드로 표현하면 아래와 같다.

```c

// 전역 스코프를 나타내는 함수
function GLOBAL() {
    // 내부 코드
}

GLOBAL();

// 해쉬맵(실행 컨텍스트)
const EC_GLOBAL = {};

// GLOBAL 내부 코드 실행

// 내부코드 실행이 완료 되면 소멸
delete EC_GLOBAL;

```

전역에 선언된 어떤 함수를 호출하면, 그 함수를 감싸는 함수의 이름으로 하나의 해쉬맵이 만들어진다. 이를 실행컨텍스트라 한다. 여기선 GLBOAL이란  실행 컨텍스트가 생성되었다.


#### GLOBAL 함수 내부에서 일어나는 일들

EC가 생성되고 나면 함수에 있는 변수를 아래와 같이 정리한다.

- 컨텍스트 객체(함수를 호출한 주체)의 경우 = this
- 호출 시 사용한 함수 인자의 경우 = arguments객체의 값
- 함수의 매개변수 = arguments 객체의 키
- 지역변수의 경우 = 해쉬맵의 키(key)
- 함수 생성 당시의 EC = [[internal변수]]

그 후, 함수 내부의 연산이 끝나면 해쉬맵인 EC(EC_GLOBAL)는 사라진다. 하지만, 래퍼 함수의 내부 함수가 외부에 참조 되면, EC가 소멸되지 않는다. 여기서 클로저를 확인할 수 있다.

```c
function Foo () {
    // const EC_Foo가 존재하는 상태.
    return const foo = _ => {
        // (..생략..)
    }
}

const f = Foo();
```

변수 f는 자신이 생성되면서 Foo의 리턴값(함수 foo)을 할당 받았다. 참조를 가지고 있는 활성화 상태이므로, EC(여기선 FOO가 실행될 때 EC, GLOBAL)는 가바지 콜렉터의 타겟이 아니다. 

#### EC로 구성된 스코프 체인

* 함수의 생성 당시 환경함수의 EC에 포함된 변수를 찾는다.


### es6의 변화

스코프 체인 : 활성화 객체 = 렉시컬 환경 : 환경 레코드

1. [[ scope ]] -> outer
이전에는 특정 컨텍스트의 식별자에 어울리는 값이 없으면 스코프 체인을 활용해 상위 컨텍스트의 변수/활성화 객체를 참조했다. es6에선 LEXICAL ENVIROMENT의 Enviroment Record와 outer를 사용한다. Evrioment Record를 찾아본 후 해당 식별자가 없으면, outer가 참조하고 있는 상위 LEXICAL ENVIROMENT의 Enviroment Record에서 식별자를 찾는다.

2. Enviroment Record
es3의 변수 객체/활성화객체와 같은 개념이다. 선언적 환경 레코드와 오브젝트 환경 레코드로 나뉘는데, 기본적으로 선언적 환경 레코드 유형을 가진다. (오브젝트 레코드의 역할?) 레코드에 this, super바인딩을 관리하고 있다.

예제 )  LEXICAL ENVIROMENT의 Enviroment Record
```c
const x = 10
const foo = () => {
    const y = 20;
}
```

```c
// 선언적 환경 레코드의 ER구성
globalEnv = {
    enviromentRecord : {
        // 빌트인
        Object: function,
        Array: function,

        (...)

        //custom binding
        x: 10,
        foo: <Function>
    },
    outer : null
}

fooEnv = {
    enviromentRecord : {
        // custom binding
        y: 20
    },
    outer : globalEnv
};

```


```c
global['a'] = 'this is a';
global['hello world'] = 'hello world';

console.log(a); // 'this is a'
console.log(hello world); // syntax error
```



```c
// 오브젝트 레코드의 ER구성
globalEnv = {
    // storage
    enviromentRecord = {
        // 식별자가 아닌 프로퍼티명은 포함되지 않는다.
        bindingObject = {
            // storage
            a : 'this is a'
        }
    },
    outer : null
}
```

3. Lexical Enviroment와 Variable Enviroment

es6의 실행 문맥을 보면 위 두 개념이 나오는데, 기본적으로 이 둘은 똑같은 내용을 지닌다. 렉시컬 환경이 변수 환경의 복사본이기 떄문이다. 컨텍스트가 활성화 되면 렉시컬 환경에 변수 환경의 복사가 이뤄진다. 그 뒤 식별자가 가리키는 값을 찾는데 렉시컬 환경을 사용한다.


하지만 함수 선언문 코드가 실행되면 `with`문과 `catch`문으로 이뤄진 문법이 렉시컬 환경을 활용한다. 이 때 코드의 컨텍스트가 변경이 되는데, 코드 실행이 끝나고 돌아갈 렉시컬 환경을 보존하려고 똑같은 복사본을 Variable Enviroment에 두는 것이다. 코드가 함수 표현식의 형태를 띄었다면, 사용되는 환경은 변수 환경이고 보존되는 건 렉시컬 환경이다.

 FE saves LexicalEnvironment, since it’s needed the dynamic bindings created during the with execution, and FD saves VariableEnvironment since, by the spec cannot be created inside a block at all and is hoisted to the top.

 함수 표현식은 식별자가 먼저 호이스팅을 받고, 할당 받을 객체를 동적 할당으로 받는데 이런 방식에는 변수환경을 사용하는가보다. 반대로 식별자와 값이 한번에 호이스팅 되는 경우에는 렉시컬 환경을 쓴다.

 ```c
 const a = 10;
 
 // 함수 선언식, lexcial env를 쓴다.
 function foo(){
     console.log(a);
 }


 with({a: 20}) {

    // 함수 표현식
    const bar = () => {
        console.log(a);
    }

    foo(); // 10, from variable enviroment
    bar(); // 20  from lexcial enviroment
 }
 ```

```c
// foo 초기화 시점
foo.[[scope]] = globalContext.[[VariableEnviroment]];

// with문 실행 시점
previousEnviroment = globalContext.[[LexicalEnviroment]]

globalContext.[[LexicalEnviroment]] = {
    enviromentRecord : { a : 20 },
    outer : previousEnviroment
}

bar.[[scope]] = globalContext.[[LexicalEnviroment]];

globalContext.[[LexicalEnviroment]] = previousEnviroment
```

#### 코드 실행 시점에 일어나느 일
```c
console.log(x);

const x = 10;

console.log(x);
x = 20;
console.log(x);

function x () {};
```

참고

http://meetup.toast.com/posts/86

https://byron1st.github.io/2016/06/21/javascript-execution/
