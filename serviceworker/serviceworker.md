### 서비스 워커란?
캐시와 함께 브라우저 백그라운드에서 특정 작업을 하는 스레드(?)

브라우저가 쓰는 캐시는 로컬/세션스토리지, 인덱스DB, 쿠키, 캐쉬 스토리지 등등 여러 가지가 있는데 대부분의 예제에서는 캐쉬 스토리지를 사용하고 있다. 로컬스토리지는 동기 작업의 결과물을 저장하기 때문에 서비스 워커에서는 사용할 수 없다.


특정 작업이란, 클라이언트 요청/응답에 맞는(혹은 요청/응답에 사용할 것 같은) 데이터를 캐시에서 꺼내 주고, 필요한 게 캐시에 없으면 서버에게 필요한 부분을 `fetch API`로 요청해줌.

그 외는 [MDN에서 Other Use Cases 참조](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)


### 왜 쓰는가?
- Push Notification

    웹 앱에 접속하지 않아도 새로운 소식을 알람으로 받을 수 있다.

- 오프라인 퍼스트
    1) 네트워크 통신이 어려워도 웹앱에서 기존의 사용자 경험을 최대한 주고 싶을 때

    2) 통신이 끊껴서 전달하지 못한 데이터를 통신이 연결됐을 때 처리해준다.

        [동기화 데모 확인](https://developers.google.com/web/updates/2015/12/background-sync?hl=ko)


<!-- ### 순서
Register 
```c
if(navigator.servcieWorker in window) {
    console.log('installing');
    window.addEventListener('load', _ => 
        navigaton.serviceWorker.register('/sw.js').then(registration => swReg = registration)

    )
}
``` -->

### 주의할 점

1.로컬호스트/HTTPS에서만 사용 가능하다.

서비스 워커가 서버와 클라이언트 사이에서 요청과 응답을 낚아채기 때문에 오용하면 보안 문제가 생길 수 있다.

* 기본적으로 http 통신은 요청과 응답이 정확히 어디서 온 것인지 알 수 없을 때가 있어, 보안 문제에 취약하다.


2.서비스워커가 선언된 경로에 따라 서비스 워커가 미치는 범위가 달라진다.

```
Root/
  Index.html
  JS/
    app.js
    Serviceworker.js
  STYLES/
    Main.css
```
main.css나 index.html은 서비스 워커의 영역(scope)에 벗어나서, 서비스 워커로 캐쉬에 저장할 수 없다.

3. 브라우저 아닌 곳(백그라운드)에서 작동하기 때문에 window객체를 쓰지 못하고 비동기 처리만 가능하다.
그래서 서비스 워커 내의 코드를 보면
```c
self.addEventListener('push', function(event)...// 생략

navigator.serviceWorker.register('sw.js').then( ...// 생략
```
비동기 함수가 주를 이룬다. `self1는 sw.js의 전역이 window가 아니라 `ServiceWorkerGlobalScope`란 것을 보여준다. self는 this와 다르게 정적으로 단 하나의 컨텍스트를 가리키는데, 여기서는 self 컨텍스트가 전역을 가리키고 있다.
