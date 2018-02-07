
// 템플릿 메소드 패턴
const Renderer = class {
    constructor(col, row, base, background){
        Object.assign(this, {col, row, base, background, blocks:[]});
    }
    clear(){}
    render(data){
        // 렌더링에 쓰기로 정했던 타입 Data인지 체크
        if(data instanceof Data) throw 'invalid data type';
        this._render();
    }
    // 일단 this._render를 호출하려면 초기화가 필요하므로, 아래와 같이 설정해놓는다.
    _render() { throw 'must be overrided'}
}

// 부모 클래스의 메소드(render)는 외부에 노출되는 하나의 템플릿이라 볼 수 있다. 
// 이 영역에서는 모든 자식 클래스가 해야 될 데이터 검증 작업을 대신해주고
// 실제 그림을 그리는 렌더링 작업은 템플릿 안의 메소드라 볼 수 있는 _render에서 이뤄지게끔 했다.
// 단, 부모 클래스에 있는 _render를 그대로 쓰는 게 아니라, 자식 클래스가 각자 스타일에 맞 이 메소드를 오버라이딩한다.


// 자식 클래스
const TableRenderer = class extends Renderer {
    constructor(col, row, base, background){ 
        // 부모와의 상호 작용이 이뤄지는 부분
        // 부모 컨스트럭터가 요구하는 인자를 보내 준다.
        super(col, row, el('td'), background);

        // col, base,blocks도 super를 이용해 부모의 처리 결과물을 받아온 것.
        const { t_col, t_base, blocks} = this;
        // 이렇게 super 키워드 이후로는 자식 클래스가 부모 클래스의 서비스를 이용할 수 있다.
    }
    _render() {
        // ...
    }
}

// 니콜라스 자카스, 객체지향 자바스크립트의 원리
// 모듈 패턴

const thisIsModule = (_=> {

    // 비공개 영역
    // 외부에서 접근할 수 없다.
    let age = 25;
    // 공개 영역
    // 이 리턴 객체가 함수 module과 상호작용할 수 있는 인터페이스가 된다.
    return {
        getAge : () => {
            return console.log(age);
        }
    }

})();

thisIsModule.getAge(); // 25

//  모듈 노출 패턴 : 모든 변수, 메소드를 비공개에 넣고 리턴 객체에 참조시킨다.

const person = (_=> {

    let age = 25;
    
    const getAge = () => {
        return console.log(age);
    }

    const OlderAge = () => {
        return age++;
    }

    return {
        // 내부 메소드를 참조 받을 식별자명은 외부에서 이해하기 쉽게 짓는다.
        getAge: getAge,
        grow: OlderAge
    }

})();

person.getAge();

// 믹스인
// 의사 상속 : 프로토타입을 사용하지 않고 객체의 프로퍼티를 다른 객체에 할당하는 방법.

const mixin = (receiver, supplier) => {
    // 열거 가능한 프로퍼티 검색
    // for .. in 문은 프로토타입 프로퍼티도 검색한다.
    // Object.keys()는 고유 프로퍼티만 검색.
    for(let property in supplier) {
        // 고유프로퍼티를 가졌는지 체크
        if(supplier.hasOwnProperty(property)){
            // 리시버 객체에 똑같은 식별자를 만들고 참조.
            receiver[property] = supplier[property];
        }
    }
    return receiver;
}

