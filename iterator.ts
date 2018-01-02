// es6에 내장된 표준 인터페이스 2가지 : Iterable / Iterator


// 덕 타이핑을 허용한다.
//인터페이스를 구현한 클래스의 인스턴스가 아니더라도 느슨하게 인터페이스의 내부를 구현했다면, 그것도 인터페이스의 구상체로 본다.


//ㄱ. 이터레이터 인터페이스
// 타입스크립트 제네릭 문법 에러 *https://github.com/Microsoft/TypeScript/issues/11375
interface Iterator {
    next(): IteratorResult;
};

interface IteratorResult {
    value: any;
    done: boolean;
};

// 인터페이스 구현
const IIterator = class {
    data: [1, 2, 3, 4];
    next() {
      return {
        done: this.data.length === 0,
        value: this.data.pop()
      };
    }
  };

//인터페이스가 요구하는 것? next라는 메소드를 키로 가지고,  boolean타입의 done과 any타입의 value를 반환해야한다. 반환되는 객체를 iteratorResultObject라 부른다.
//두 프로퍼티가 필요한 이유? done은 next를 계속 호출할지 말지 판정하는 데 쓰려고, value 반복을 진행하는 그때 그때마다 값을 얻으려고.


//ㄴ. 이터러블 인터페이스
interface Iterable<T> {
    [Symbol.iterator]() : Iterator<T>;
}

// 구현
const IIterable =  {
    // Symbol은 es6에서 나온 프리머티브 타입. 이 타입을 오브젝트의 키로 쓰고 싶다면
    // 대괄호와 이터레이터 프로퍼티가 필요하다.
    // 내장된 Symbol이라고 해서 well-known Symbol이라고 한다. 문자열로도 대체 가능하다.
    [Symbol.iterator]: function() {
      return new Iterator();
    },
    // 오브젝트 메소드 리터럴. 위와 동일하다.
    // [Symbol.iterator]() {
    // }
  
    // Symbol key를 문자열로도 정할 수 있다. 기존 자바스크립트의 변수 명명규칙과 어긋나서 대괄호와 따옴표를 쳤다.
    // 대괄호를 없애도 json형식으로 인식해서 에러가 나지는 않는다.
    // ["@@iterator"]
  }
  
//인터페이스가 요구하는 것? [Symbol.iterator]라는 키를 요구하고, 이 키는 함수를 밸류로 갖는다. 함수의 형태는
//이터레이터에 있던 next메소드를 요구한다.
//필요한 이유? 이터레이터가 한번 반복과정을 거치면 소멸되는데, 이를 방지하고자 원본은 지킨 채로 새로운 복사값을 계속 만들어낸다. 이터러블이 그 역할을 한다.


// while'문'을 next 메소드의 반환'값'으로 구현한 이터레이터 인터페이스
const arr = [1, 2, 3, 4];
while (arr.length > 0) {
    console.log(arr.pop());
  }
  
const Iterator = class {
    data: [1, 2, 3, 4];
    next() {
      return {
        done: this.data.length === 0,
        value: this.data.pop()
    };
  }
};
  
// while'문'은 기본적으로 휘발성이다. 처리되는 타이밍도 머신의 성능에 따라 달라진다.
// 값으로 표현 되면서, 처리 흐름을 의도에 맞게 통제할 수 있다.(여기선 next() 호출을 언제 할 것인가로 루프 타이밍을 조절할 수 있다.)
// 조건문을 이용한 지연 / 연산자를 이용한 지연 / 함수에 격리(값이나 객체로)시키는 방법을 통한 지연이 있다.
// 연산 지연 : 연산자를 활용해서 다른 방향으로 갈 수 있는 제어 흐름을 통제한다.
// b가 true값일 때, c는 읽지 않는다. b가 fal2y가 되어야 c를 읽는다.
const flow = 'b' || 'c';
  
  
