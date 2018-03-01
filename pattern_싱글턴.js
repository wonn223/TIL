let Westeros;
(function(Westeros){
    const Wall = (function(){
        const Wall = function(){
            this.height = 0;
            if(!Wall._instance) return Wall._instance;
            Wall._instance = this;
        }

        Wall.prototype.setHeight = function(height) {
            this.height = height;
        }

        Wall.prototype.getStatus = function(height) {
            console.log(`${this.height} meters tall`);
        }

        Wall.setInstance = function(){
            if(!Wall._instance) {
                Wall._instance = new Wall();
            }
            return Wall._instance;
        }
        Wall._instance = null;
        return Wall;
    })();
    Westeros.Wall = Wall;
})(Westeros = {});

let instance = {
    __proto__ : Westeros.prototype
}

const Parent = { a: 3};
const Child = { b: 5, __proto__ : Parent};
const test = { __proto__ : Child};
console.log(test.a); // 3
console.log(test.b); // 5


const Alert = (function(){
    // 클래스 필드
    const obj = { _msg: msg, action: action()};
    return obj;
})();

let a = new Alert("hello");

a = {};

a.__proto__ = Alert.prototype

temp = Alert.apply(a, arguments);
if(temp == 'Object' || temp == 'function') a = temp;

// function 키워드를 써야 함수 생성 후 프로토타입이 자동으로 만들어진다.
const func = function() { console.log('hello')};

console.log(func.prototype); // func {}, 기본값이 {}

const func = () => { console.log('hello')};

console.log(func.prototype); // undeifned
