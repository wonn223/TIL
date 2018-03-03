// 1) 단일책임원칙(SRP) : 각각의 클래스는 책임을 하나만 가진다.

// class Guitar {
    // constructor(spec){
        // this.serialNum = serialNum,
        // this.price = price,
        // this.maker = maker,
        // this.type = type,
        // this.model = model,
        // this.backWood = this.backWood,
        // this.topWood = this.topWood,
        // this.stringNum = this.stringNum,
        // this.spec = spec
    // }
// }

// 정보가 많은 부분은 한 곳에 모은다. 응집성이 높아진다.
// 단, 다른 클래스에서 초기화 시에 이 클래스를 참조하므로 결합도 관리가 필요하다.
class GuitarSpec {
    constructor(){
        this.price = price,
        this.maker = maker,
        this.type = type,
        this.model = model,
        this.backWood = this.backWood,
        this.topWood = this.topWood,
        this.stringNum = this.stringNum
    }
}

// 2) 개방 폐쇄 원칙
// 기존 코드를 확장시켜도 기존의 구조에 큰 변화가 일어나선 안 된다.

// Guitar클래스 코드에서 확장? : 기타 말고 여러 악기 클래스가 필요할 때 아래처럼 계속 중복된 코드를 쳐야함. 
class Violin {
    constructor () {
        this.serialNum = this.serialNum,
        this.spec = this.spec
    }
}

class ViolinSpec{
    constructor() {
        this.price = price,
        this.maker = maker,
        this.type = type,
        this.model = model
    }
}

// 확장: 악기 클래스의 공통 부분을 인터페이스로 추상화하자.
// 타입스크립트
// interface Instrument {
//     price : number,
//     maker : string 
// 

// ES6
class Instrument {
    constructor(){
        this.price = price,
        this.maker = maker
    }
}

class InstrumentSpec {
    constructor(){
        this.spec = spec;
    }
}

class Guitar extends Instrument {
    constructor(){
        this.maker = maker,
        this.price = price
    }
}

class Violin extends Instrument {
    constructor(){
        this.maker = maker,
        this.price = price
    }
}

class GuitarSpec extends InstrumentSpec {} 

class ViolinSpec extends InstrumentSpec {}

// 3) 리스코브 치환의 법칙
// 서브 타입은 기반 타입(base class)의 약속한 규약을 지켜야한다.
// 규약을 지키면 서브 타입도 기반 타입을 대신할 수 있어야 함.
class Duck {
    constructor(name, height) {
        this.name = name,
        this.height = height
        this.starve = false
    }

    eat(){
        console('eat');
        this.starve = true;
    }
}

class ToyDuck extends Duck {
    // override하지 않은 경우
    eat(){
        console.log('i am a toy which can\'t eat');
    }
}

// ToyDuck 기반 타입은 Duck
// 하지만 ToyDuck은 기반 타입의 메소드를 동일하게 구현하지 않음.
// 또한 클래스의 의미 상 가짜 Duck은 Duck의 모든 행위를 대신할 수 없다. 따라서 리스코브 치환 법칙에 위배된다.

