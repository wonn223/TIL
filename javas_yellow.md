#### DOM
문서를 계층화해서 개발자가 문서 컨트롤을 보다 쉽게 만들어줌. 젤 처음 돔이 나왔을 땐 DOM코어 DOM에 메소드를 넣어주는 DOM html이 있었다.

#### script async와 defer
인라인에는 적용이 안 됨. 외부 스크립트 파일에만 가능. 바디<body> 태그를 만나면 HTML파싱이 시작되는데 스크립트에 헤더가 많으면 그만큼 파싱이 늦어진다. defer를 사용하면 헤더에 있는 스크립트를 바로 다운 받는 대신 문서 파싱이 끝난 뒤</html> 해석이 이뤄지게 한다.

async는 말 그대로 스크립트 태그를 만나자마자 다운을 하고 HTML과 함께 파싱을 해나간다. 이 때 중요한 점은 문서에 선언된 스크립트의 순서대로 파싱 순서가 정해지지 않는다는 점이다. 만약 특정 자바스크립트 파일이 의존하고 있는 패키지를 불러온다면 async는 사용하지 않는 게 좋다.

36p 문(expression)을 쓸 때 세미콜론을 반드시 붙이는 게 좋다. 아니면 미니파이 하는 과정에서 문과 문이 붙어서 오류가 날 수 있다.
```c
let a = 1
let b = 2;
// a=1b=2; -> error
```

#### null
null은 빈 객체를 가리키는 포인터. 그래서 `typeof`를 쓰면 object가 나온다. null == undefined가 참인 이유는 연산자로 인한 강제 타입변환 때문. 빈 객체를 만들고 싶으면 식별자 = null로 먼저 선언하자. undefined는 null보다 늦게 공식 스펙으로 나왔다.

#### 독타입
브라우저에는 표준 모드와 퀵모드가 있다. 독타입에 따라 브라우저가 문서와 스크립트를 읽는 기준이 달라진다.

####
```c
const object = 1;
if(object){
    alert('hello');
}
```
true로 인식하는 이유. 불리언 참/거짓은 true/false로만 결정되는 게 아니다. 타입마다 true/false 판별 기준이 있는데, 조건문을 읽을 때 알아서 이 판별을 해준 것.

참고로 자바스크립트 정수는 8진법,16진법 표기가 가능하다. 스트릭트에서는 8진법 표기는 안된다.

#### parsetInt/parestFloat
공통점 : 10진수 처리 가능. 매개변수 자리에 문자열과 넘버가 섞여 들어오면 넘버만 처리
```c
parseInt('1234blue'); // 1234
parseFloat('1234blue'); // 1234
```

Int는 8진수,16진수 모두 처리하나, Float은 10진수만 인식
```c
parseInt('0xA'); // 10
parseFloat('0xA'); // 0
```

#### 증감연산자와 피연산자의 위치
증감연산자가 피연산자 뒤에 있으면 피연산자 처리가 먼저 이뤄진 후 증감이 적용되기 때문에 아래와 같은 일이 발생할 수 있다.
```c

let num = 2;
let num2 = 10;
// let num3 = num-- + num2;
let num3b = --num + num2;
console.log(num3); // 12
console.log(num3b); // 11
```

단항 증감 +/-는 `Number`객체를 불러오는 것과 같다.
```c
let num = -25;
console.log(-num); // 25;
```

#### 시프트
방향 대로 비트를 늘리고 그 곳에 0을 넣는 연산.
```c
let num = 64;
console.log(num << 5) // 2048
console.log(num >> 5) // 2
```
64는 2의 6승 이진수로 나타내서 그 앞에 0 5개를 붙이는 것이므로 2의 1승이 되는 것과 같다.

* 단 부호-가 있을일 때는 다르다.
```c
let num = -64;
//부호 있는(>>>)
console.log(num >>> 5) // 134217726
```
자바스크립트에서는 32비트가 최대 숫자의 단위다.
64를 2진수로 바꾸면 26자리는 0이 되고 나머지 6자리만 1이 되는데, -가 붙으면 보수로 인식해야 되므로 26자리를 1로 인식하게 된다. 그 값에서 0을 앞쪽에 5개 두게 되면 굉장히 큰 정수값이 나오게 된다.

#### 비교 연산자
```c
console.log(true > false); // true
console.log(true > 0); // true
```
불리언이 비교 대상이 되면 숫자로 치환 후 비교가 이뤄진다. 비교 대상 중 넘버 객체가 있어도 마찬가지

#### 리턴이 없어도 변수의 값을 바꾸는 법
```c

const modify = (obj) => {
    obj.value = 'modified';
  }
  
  let objOuter = {value: 'original'};
  
  console.log('The original value is ' + objOuter.value); //original
  modify(objOuter);
  console.log('The modified value is ' + objOuter.value); //modified

  const a = modify(objOuter);
  console.log(a); // undefined
```

함수 호출 값을 할당받는 a는 함수가 리턴이 없는 서브루틴이라 undefined이다. 하지만 함수가 실행 되는 바디 내부에서는 매개변수로 들어간 objOuter의 프로퍼티 참조가 달라지므로, objOuter변경 사항을 함수가 끝난 뒤에도 인식한다.

#### 매개변수에는 참조가 아니라 값이 들어간다
```c
const obj = new Object();
const a = (o) => {
    o.name = 'nicholas';
    o = new Object();
    o.name = 'clone';
}

console.log(a(obj)); // nicholas
```
만약 obj '참조'가 매개변수로 들어갔다면, obj의 이름이 clone으로 달라져야한다. 하지만 외부에서 확인한 값은 nicholas다.

```c
const makeclosure = () => {
    
    const doStuff = _ => {
        console.log('hello');
    }
    // 클로저
    return doStuff();
}

const instance = makeclosure();

// 참조 제거. 단 바로 메모리가 반환되는 게 아니라
// 다음 가비지 콜렉팅에서 메모리가 사라진다.
instance = null;
```

클로저 doStuff가 가비지 콜렉팅의 대상이 되려면 
위와 같이 참조값을 바꿔줘야한다. 이런 문제를 해결하려면 클로저로 자유변수를 참조하지 말고 자유변수를 바깥으로 빼내 호출한다.

```c
const doStuff = _ => {
    console.log('hello');
}

const makeclosure = () => {
    return doStuff();
}

// doStuff 실행되고 전부 스택에서 사라짐
const instance = makeclosure();
```

#### Object 내장메소드로 객체를 immutable하게 만들 때
```c
    
let person = {
    name: ''
};
Object.defineProperty(person,'name', {
    configurable : false,
    value: 'nicholas'
})

delete person.name;
console.log(person); { name: 'nicholas' }
person.name = '1';
console.log(person.name); // 1

TypeError: Cannot redefine property: name
Object.defineProperty(person,'name', {
    configurable : true,
    value: 'nicholas'
})
```
`Object.defineProperty`을 활용해서 configurable 속성을 false로 바꾸면
값을 지킬 수 있다. 단, 해당 프로퍼티는 똑같은 메소드를 반복해서 프로퍼티를 수정할 수 없게 된다. 위와 같은 에러가 나온다.
