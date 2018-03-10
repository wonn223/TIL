
### 빌트인 객체

HTML 파싱 중에 첫 `script` 태그를 만나면, 자바스크립트 엔진에서 빌트인 객체를 생성한다.  빌트인 객체가 미리 만들어지기 때문에 `new 생성자` 없이  값 타입, 연산자, 오브젝트(Array나 Object)를 에디터에서 바로 사용할 수 있다. MDN에서 [전체 빌트인 객체](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)를 확인할 수 있다.

### 네이티브 객체
ECMA International란 단체에서 스크립트 언어라면 따라야 할 표준을 정했는데 이를 ECMAScript라 부른다. 자바스크립트는 이 표준을 따르는 스크립트 언어며, 표준에 따라 만든 객체를 네이티브 객체라 한다. 지금도 ECMAScript를 따르는 공식 네이티브 객체를 여러 번의 검증을 거쳐 만들고 있다. 

단, 자바스크립트를 읽고 활용하는 브라우저 별로 모든 네이티브 객체를 활용하는 건 아니다. 브라우저 벤더의 의도와 역량에 따라 빌트인 객체로 사용하는 네이티브 객체가 다르다.

### 호스트 객체
웹 브라우져나 NodeJS 등 자바스크립트가 실행되는 환경(host)에서 지원하는 객체를 말한다. 근본적으로 ECMAScript 표준을 따른 네이티브 객체와 다르다. 팝업창, 대화상자, textarea, 쿠키를 포함해 `window`, `global`, `document` 등이 있다. 호스트 객체가 있어서 사용자 이벤트에 맞춰 자바스크립트 코드를 실행시킬 수 있다.

```c
window.addEventListener('click', () => {})
```


또 자바스크립트 오브젝트(네이티브 오브젝트)가 아닌 것(웹 api, DOM 등)을 자바스크립트 객체(오브젝트란 개념을 코드로 표현했을 때)처럼 쓸 수 있다. 자바스크립트 확장성이 뛰어난 이유가 호스트 오브젝트에 있다고 볼 수 있다.


```c

<div id="a"></div>

const hostObj = document.getElementById('a');

let a =[];
for(let i = 0; i< 3; i++){
    a.push(hostObj.nodeName);
    i++;
}
console.log(a); // ["DIV", "DIV"]

````
`document`란 호스트 오브젝트가 있어서 DOM 객체(divElement)에 자바스크립트 for문을 적용할 수 있다. 다른 언어에서 똑같은 결과를 만드려면, `document`의 메소드를 쓰지 않고, 직접 new 생성자로 div엘리먼트를 5번 만들어야 했다.

