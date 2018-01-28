// 코드 스피츠71 - 디자인 패턴 1회차 중
// https://youtu.be/ymG40FJe2cM

// 즉시실행함수를 구현한 이유
// 코드를 읽을 때 const 변수에 값이 할당되게 하려고. const는 초기화 과정에 값이 반드시 있어야 한다.
// 리턴값이 클래스인데 클래스 인스턴스끼리 공유하는 private/static한 변수를 자바스크립트 스타일로 구현함.

// 인자 자리에 언더스코어(_) 식별자를 자주 쓴다고 한다.
const Table = (_=> {
    // 자유 변수 공간. 
    // 아래 클래스 내부에서만 이 공간의 변수를 참조한다.
    
    // 프로퍼티 키를 읽는 메소드 등 이 공간의 변수를 조회하는 방법은 있지만 직접 참조하긴 어렵다.


    // 심볼을 활용해서 private한 변수 구현  
    // 인자는 디버깅에 도움이 되는 설명을 적는 곳.
    const render = Symbol('render');
    const Private = Symbol('Private');

    // private, static공간

    return class {
        constructor(parent){
            if(typeof parent != 'string' || !parent ) throw 'invalid param';
            // 심볼은 반드시 대괄호. 심볼은 키를 대신 할 수 있다.
            this[Private] = { parent }
            console.log(this[Private]);
        }

        // validation 습관을 들이자 - 런타임을 위한 throw 에러
        // 런타임엔 스택에 코드가 연쇄적으로 쌓이는데, 이렇게 되면 오류가 났을 때 문제의 첫 발생 포인트가 어딘지 알기 어렵다. 그래서 validation으로 에러의 위치를 분명하게 보여준다.

        // 프로미즈를 활용한 load
        // load(url) {
            // AJAX를 대체하는 브라우저 내장 api. 반환값이 프로미즈다
            // fetch(url).then(res => {
                //json 결과도 프로미스.
                // return res.json()
            // }).then(json => {
                // arrow 함수의 this는 load 메소드를 감싸고 있는 바깥 영역의 스코프를 가진다. 그래서 this[render]에 접근 가능하다.
                // * 이제 function 키워드는 es6에서 사용하지 않는다. 클래스 메소드나 애로우 함수로 표현 가능
                // function을 쓰면 브라우저가 호환모드로 인식해서 속도가 느려진다고 한다. es6를 목표로 한다면 es6신택스를 최대한 써야.
                // this._render() || this[render]();
            // })
        // }
        // [render](){

    //    }

        // async/await 활용하기
        // promise보다 async/await가 나은 점
        // 표현이 간결해지고, 상태 검증 후 에러 처리가 보다 용이하다.
        async load(url) {
            const response = await window.fetch(url);
            // .then마다 일일이 .catch를 달아주지 않아도 된다. response의 ok프로퍼티가 false면 에러를 던진다.
            if(!response.ok) throw "invalid response"; 
            const json = await response.json();
            const { title, header, items } = json;
            // items이 없을 경우 에러 던지기
            console.log(items);
            if(!items.length) throw "no items";
            Object.assign(this[Private], {title, header, items});
            this[render]();
        }    
        [render](){
            // 부모와 데이터 체크
            const fields = this[Private], parent = document.querySelector(fields.parent);
            if(!parent) throw "invalid parent";
            if(!fields.items || !fields.items.length) {
                parent.innerHTML = "no data"
                return;
            } else parent.innerHTML = '';
            //table 노드 생성
            const table = document.createElement("table");
            // caption 노드 - table 노드 뒤 선언해야한다.
            const caption = document.createElement("caption");
            // caption 노드에 제목 value 할당
            caption.innerHTML = fields.title;
            // table 노드에 caption 노드 추가 
            table.appendChild(caption);
            table.appendChild(
                // header를 thead에 넣기
                // reduce : 배열을 하나의 '값'으로 만든다.
                fields.header.reduce((thead, data) => {
                    // th 노드 생성
                    const th = document.createElement("th");
                    // data할당
                    th.innerHTML = data;
                    thead.appendChild(th);
                    return thead;
                    // reduce 두 번째 인자 - 초기값 인풋하는 자리. thead 노드 생성
                    // thead 요소는 열의 제목으로 구성된 행의 집합. caption 다음에 위치함.
                }, document.createElement("thead"))
            );
            // tr요소 생성 후 thead 안으로 추가하기
            parent.appendChild(
                fields.items.reduce((table, row) => {
                    table.appendChild(
                        row.reduce((tr, data) => {
                            const td = document.createElement("td");
                            td.innerHTML = data;
                            tr.appendChild(td);
                            return tr;
                        }, document.createElement("tr"))
                    );
                    return table; 
                }, table)
            )
        }
    };
})();


const table = new Table("#data");
table.load("71_1.json");

// 외부에서 Symbol 읽어보기 
// console.log(Object.getOwnPropertySymbols(table)); // [Symbol(Private)], this로 접근한 Priavate만 검색 됨.

// Symbol추가 연습

// 객체 = undefined 초기화 시
const sym = Symbol('test');
const test = '';
test[sym] = 'sym'
console.log(Object.getOwnPropertySymbols(test)); // []



// 객체 = {} 초기화 시
const sym = Symbol('test');
const test = {};
test[sym] = 'sym';
const objj = Object.getOwnPropertySymbols(test);
console.log(objj); // [Symbol(test)]


