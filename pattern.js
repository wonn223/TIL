
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
// 단, 부모 클래스에 있는 _render를 그대로 쓰는 게 아니라, 자식 클래스가 각자 스타일에 맞게 이 메소드를 오버라이딩한다.


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

