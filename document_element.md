#### document.createDocumentFragment()
브라우저가 사용 중인 DOM트리 외에 또 다른 DOM트리를 메모리 상에 만드는 것.
원하는 Fragment를 만들어 놓고 거기에 필요한 노드를 집어넣은 다음 사용 중인 DOM트리에 추가할 수 있다.
```c
 // 버튼 엘리먼트를 가진 Fragment 생성 
  const template = document.createDocumentFragment();
  const btn = document.createElement('button');
  btn.textContent = "click me";
  template.appendChild(btn);
```

```c
  const divElem = document.querySelector('div');
  // 생성한 Fragment 돔 트리를 메모리 상에 유지하려면 복사값을 사용 중인 DOM트리 넘겨준다.
  const clone = template.clondeNode(true);
  divElem.appendChild(clone);
```

리액트 가상 DOM이 Fragment와 유사하다. 리액트에선 사용자 이벤트로 인한 DOM트리, 상태 변화를 브라우저 렌더링 트리에 바로 적용시키는 게 아니라 Fragment 성격의 가상 DOM에 적용시킨다. 업데이트 할 내용을 모은 다음 한번에 렌더링 트리에 적용시켜 브라우저의 렌더링 과정을 최소화 시킨다.

#### textContent와 innerText, innerHTML 차이
엘리먼트에 텍스트를 넣을 때는 세 개 모두 사용 가능하다.

- innetHTML은 그 외 문자열로 된 HTML syntax를 인식한다.
- textContent와 innerText의 기능은 똑같다. 텍스트를 엘리먼트에 쓰거나 엘리먼트의 텍스트를 읽을 수 있다.
- 표준화된 메소드는 textContent. innerText는 IE가 만듦.
- textContent는 숨겨진 엘리먼트의 텍스트도 읽을 수 있다.

```c
<span>Hello <span style="display: none;">World</span></span>
innerText : 'Hello'
textContent : 'Hello World'
```