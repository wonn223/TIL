// 데코레이터 패턴
// 기존의 코드 위에 새로운 기능을 얹고 싶을 때 쓴다.
// to work with the object from a base or superclass object and progressively add decorator objects which provide the additional capabilities.

// 간단한 예제
// base object
const Vehicle = class {
    constructor(vehicleType){
        this.vehicleType = vehicleType || 'car';
        this.model = 'default';
        this.license = '01234';
    }
}

const truckInstance = new Vehicle('truck');

// decorate method1
truckInstance.setModel = modelName => {
    this.model = modelName;
}

// decorate method2
truckInstance.setColor = color => {
    this.color = color;
}
// 인스턴스가 가지고 있던 기존의 프로퍼티를 건드리지 않고 setter역할을 하는 함수를 추가했다.


// 간단한 예제 2
// base object
const MacBook = class {
    cost(){
        return 120;
    }

    screenSize(){
        return 13;
    }
}

// 데코레이터1
const addMemory = macbook => {
    let v = macbook.cost();
    console.log('1',v); // 120

    macbook.cost = _ => {
        return v + 100;
    }
    console.log('2', v); // 120
}

const addInsuarnce = macbook => {
    let v = macbook.cost();
    console.log('3',v); // 220

    macbook.cost = _ => {
        return v + 50; 
    }
    console.log('4',v); // 220
}

const MacThirteen = new MacBook();
addMemory(MacThirteen);
addInsuarnce(MacThirteen);

console.log(MacThirteen.cost()); // 270


// 간단한 예제3
// pseudo interface code
const MacInterface = class {
    constructor() {}

    static ensureImplements(a){
        if( !(a instanceof MacInterface)){ throw 'invalid instance'} 
        console.log(`type validated`);
        return true;
    }
}

const MacBookPro = class extends MacInterface {
    constructor() {
        super()
    }
    
    add4GBRam(){
        return 'add 4GB';
    }
    add8GBRam(){
        return 'add 8GB';
    }
    addCase(){
        return 'add Case';
    }
    addParellels(){
        return 'add window OS';
    }
    getPrice(){
        // BASE price
        return 200;
    }
}

const MacBookDecorator = ( _ => { 

    let total = 0;

    return class {
        constructor(macbook){
            // 인스턴스 체크
            // 이 인스턴스가 새 기능을 추가하는 곳이 맞는지 검사.
            if(!this.checkType(macbook)) throw 'invalid mac type';
            this.macbook = macbook;
        }
    
        checkType(macbook){
            return MacInterface.ensureImplements(macbook);
        }
    
        add4GBRam(){
            total += 70;
            return console.log(this.macbook.add4GBRam() + `: $70`);
        }
        add8GBRam(){
            total += 120;
            return console.log(this.macbook.add8GBRam() + `: $120`);
        }
        addCase(){
            total += 30;
            return console.log(this.macbook.addCase() + `: $30`);
        }
        addParellels(){
            total += 55;
            return console.log(this.macbook.addParellels() + `: $55`);
        }
        getPrice(){
            return console.log(this.macbook.getPrice() + total);
        }
    }
})();

const myMac = new MacBookPro();
myMac.getPrice(); // 200

const UpgradedmyMac = new MacBookDecorator(myMac); // type validated

UpgradedmyMac.add4GBRam(); // add 4GB: $70
UpgradedmyMac.add8GBRam(); // add 4GB: $120
UpgradedmyMac.addParellels(); // add window OS: $55
UpgradedmyMac.getPrice(); // 445
