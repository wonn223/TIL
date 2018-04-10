#### 커스텀 엘리먼트와 웹 컴포넌트

내장 객체 `Element`에는 `.attachShadow()`라는 메소드가 있다. 이 메소드는 `ShadowRoot`라는 걸 반환하는데, 리액트의 shadowDOM처럼 또 하나의 DOM트리를 만들 수 있는 root엘리먼트역할을 한다.

#### Shadow DOM 특징

- 전역이 아닌 HTML템플릿/CSS/JS를 만들 수 있다. 

ShadowRoot아래 생기는 DOM트리는 브라우저가 렌더링하고 있는 전역 DOM과 다른 스코프를 가진다. 그래서 외부 요소와 같은 식별자를 써도 영향이 없다. 여러 번 쓸 수 있는 구조가 있다면 ShadowDOM을 활용하는 것이 좋다. 

단, 모든 엘리먼트에서 shadowDOM을 사용할 수 있는 건 아니다. `<textarea>나 <input>`처럼 이미 엘리먼트 내부에서 shadowDOM DOM을 사용하고 있다거나, 보안 이슈가 생길 수 있는 요소에는 적용이 안 된다. [사용가능한 엘리먼트를 여기서 확인할 수 있다.](
https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)

만약 hadowRoot가 달릴 host 엘리먼트에 상속이 가능한 css속성(background, color, font-family 등)이 있으면 그 속성은 shadowDOM 내부에 적용될 수 있다.

#### slot
```c
    <div id="slot-test">
        쉐도우 돔 영역입니다.
        <span slot="title">TITLE</span>
    </div>
```

`slot`은 자신의 하위 요소로 shadowDOM을 삽입할 수 있다는 걸 뜻한다. slot이 있는 엘리먼트로 접근해서 원하는 외부 DOM을 slot의 서브 트리로 추가할 수 있다.

- 한번 만들면 지울 수 없다.

수정은 할 수 있지만, 다시 지우지 못한다.


#### howto-checkbox

#### 웹 컴포넌트
this로 클래스 인스턴스(DOM)를 호출자로 지정한다음 원하는 DOM API를 사용하면 된다. HTML엘리먼트를 상속받기 때문에 기존의 DOM API르 사용할 수 있다. HTML파서가 커스텀 엘리먼트란 것을 인식해야하므로 요소 이름에 대시(-)부호가 있어야 한다.

(continue)