import implement, { Interface, type } from 'implement-js';

// 인터페이스 - 실제 배를 다루는 데 필요한 기능들
const Ship = Interface({
    setAngle: type('function'),
    setRudderAngleTo : type('function'),
    setSailConfiguration: type('function'),
    setSailangle: type('function'),
    setCrewWeightTo: type('function')
},
{
    error: true,
    strict: true
  })

// 적응자 - 인터페이스를 사용자의 뜻에 따라 추상화.
// 수많은 기능들을 한번 더 추상화 시켜 배를 조종하기 쉽게 한다.
const ShipAdapter = (function() {
    function ShipAdapter(){
        this._ship = new Ship();
    }

    ShipAdapter.prototype.turnLeft = function(){
        this._ship.setAngle();
        this._ship.setRudderAngleTo();
    }
    ShipAdapter.prototype.turnRight = function(){
        this._ship.setAngle();
        this._ship.setRudderAngleTo();
    }
    ShipAdapter.prototype.goFoward = function(){
        this._ship.setAngle();
    }

    return ShipAdapter;
})();

const ship = new ShipAdapter();

ship.goFoward();
ship.turnLeft();
ship.turnRight();

// 장점 : 인터페이스를 한번 더 필요에 맞게 추상화하기 때문에 활용이 쉬어진다. 
// 한번의 호출로 여러 라이브러리의 메소드를 사용 할 수 있다.
// 단점 : 인터페이스를 한번 더 추상화하는 과정에서 여러 역할이 섞일 수 있다.
// 하나의 클래스가 하나의 책임만을 가져야 한다는 단일책임원칙에 위배될 수 있다.
