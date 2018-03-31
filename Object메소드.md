#### Object 인스턴스
인스턴스? 공통 메소드를 가지지만 값은 다른 객체

인스턴스가 가진 중요한 상태를 지키려면, 아래와 같은 메소드를 적절히 사용해야한다.s

### Object.defineProperty
1) 다른 객체의 프로퍼티를 원하는 객체로 복사 할 수 있다. 
2) 이미 존재하는 객체에 게터와 세터를 설정할 때 사용한다.

기본적으로 enumerable: false다.

```c
let obj = {};

Object.defineProperty(obj, "book", {
    value: 123,
    enumerable: true
});

for (const name in obj) {
    console.log(name); // book
}
// 프로퍼티 book이 enumerable 성질이 있어서 for ... in에 노출됨.
```

### 프로퍼티 디스크립터 getter / setter
```c
let obj = {};

Object.defineProperty(obj, "book", {
    set: param => bookVal = param,
    get: param => bookVal
})

obj.book = 123; // set

console.log(obj.book); // 123, get
```

### Object.getOwnPropertyDescriptor()

객체가 가진 프로퍼티 정보(디스크립터, 설명자)를 알고 싶을 때 사용한다. 상속받은 객체는 나타나지 않는다.

```c
let obj = {};

Object.defineProperty(obj, "book", {
    value: 'javascript',
    enumerable: true,
    writable: true
})

const desc = Object.getOwnPropertyDescriptor(obj, "book");

console.log(desc); 

//  { 
//   value: 'javascript',
//   writable: true,
//   enumerable: true,
//   configurable: false 
//  }
```

### Object.getOwnPropertyNames();

```c
let obj = Object.defineProperties({}, {
    soccer : {
        value: 'soccer',
        enumerable: true
    },
    baseball : {
        value: 'baseball',
        enumerable: false
    }
});

const result = Object.getOwnPropertyNames(obj);

console.log(result); // [ 'soccer', 'baseball' ]

const keys = Object.keys(obj); 

console.log(keys); // [ 'soccer' ]
```

#### Object.freeze() / .seal() / .preventExtensions

### Object.preventExtensions()

1) 이름 그대로 프로퍼티 추가를 막는다. 단 기존의 프로퍼티 값은 수정 가능하고 delete 키워드도 쓸 수 있다.

2) 이 메소드를 거쳐간 메소드는 1)을 계속 유지한다.

```c
let abab = { book : 'boooooook'};

Object.preventExtensions(abab);

abab.video = 'video';
console.log(abab.video); // undefined

abab.book = 'asdf'
console.log(abab.book); // asdf

delete abab.book;
console.log(abab); // {}

```

### Object.seal()

1) `Object.preventExtensions`와 달리 기존 프로퍼티에 delete 연산자를 사용할 수 없다. 

2) 처음 프로퍼티를 초기화 할 때  `writable:true`면 사용이 기존 프로퍼티도 수정이 가능하다.

* 추가 금지는 오브젝트 단위고 삭제 금지는 프로퍼티 단위다.

```c
const obj = Object.defineProperty({}, "swim", {
    value: '수영',
    writable: true,
    configurable: true,
    enumerable: true
})

Object.seal(obj);
console.log(Object.isSealed(obj)); // true

obj.swim = 'swimmmmming';
console.log(obj.swim); // 수영


delete obj.swim;
console.log(obj.swim); // 수영
```

### Object.freeze()

1) 기존 프로퍼티에 delete 연산, 새 프로퍼티 추가 불가능
2) 단, 프로퍼티가 객체인 경우에는 변경(수정/삭제)에 자유롭지 못하다.

```c

let obj = Object.defineProperties({}, {
    soccer : {
        value: { a: 2 },
    },
    baseball : {
        value: 'baseball',
        enumerable: true
    }
});

Object.freeze(obj);

obj.soccer.a = 'changed';
console.log(obj.soccer.a); // changed

delete obj.soccer.a;
console.log(obj.soccer.a); // undefined
```