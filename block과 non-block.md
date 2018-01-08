#  BLOCK과 NON-BLOCK

제어 흐름을 막고 안 막고의 차이. 기본적으로 프로그램 실행은 도중에 멈추지 않는다. 

예외) 플랫폼에 큰 악영향을 줄 수 있을 때.
``` 
for(const i of (function(){
    let i = 0;
    whilte(true) yield i++;

})()) console.log(i);
```
위와 같은 코드는 무한 루프로 cpu에 큰 무리를 주기 때문에,

브라우저나 OS에서 script timeout 메시지를 던지면서 제어권을 

다시 가져온다. 안드로이드와 iOS에서는 이런 경우를 사전에 방지하고자 

코드 실행을 OS에게 맡기고 있다. 

<!-- 모바일 기기에서 게임을 하다가

전화가 오면 게임 프레임이 사라지는 이유도 전화를 처리하려는 OS의 

강제 제어에 있다. -->

## 블록함수의 특징

배열을 순회해서 아이템을 정렬하거나 DOM 구조에 접근해서 CSS를 
적용하는 등 대부분의 함수가 블록함수다. 블록함수는 무한루프 같은 예외를 제외하고, 함수가 실행을 끝낼 때까지 제어권을 가져올 수 없다.

## 블로킹을 어떻게 피해야할까?

많은 유저가 어플리케이션의 특정 버튼을 연달아 누르면, 버튼에 있는 

이벤트는 연산 단위가 작아도 cpu에 무리를 줄 수 있다. 또 블록 함수가 

중첩되어 있는 경우에는 전체 블로킹의 영향을 파악하는 데 어려움을 겪을 

수 있다. 블록이 아닌 함수를 쓰는 건 어려운 일이기 때문에 블로킹을 

적절히 분산시키는 게 필요하다.

- 타임 슬라이싱
: 코드를 여러 큐(프레임)로 쪼개서 블로킹이 일어나지 않게 함
: 쪼개는 시간을 자동으로 조정할 수도 있다.

```
const sliceTime = (v, f, *f=3*) => {
    <!-- for (let i = 0 ; i < v; i++) f(i); -->
    let i = 0, n = 0;
    const runner = function () {
        while( n < v) {
            if(i++ < f ) {
                f(n++)
            } else {
                i = 0;
                requestanimationframe();
                break;
            }
        }
    }
}
sliceTiME(10, console.log);
```

```
const sliceAuto = (n, f, ms=5000, i) => {
    브라우저의 구동시간을 알 수 있는 함수 호출 및 할당
    const old = performance.now(), curr;
    while(i < n) {
        if(curr - old < ms)
        f(i++)
    } else {
        old = curr;
        requestAnimationTime(runner);
        break;
    }
    requestAnimationTime(runner);
}
```

`performance메소드`는 Date객체가 만드는 시간이란 값을 반환하는데, 퍼포먼스 메소드가 전역변수의 인메모리 형태로 저장되어 있어서 `Date.now()`보다 더 빠르다.

`requestAnimationFrame`함수로 인해 0,1,2번의 함수호출은 자신의 작업을 자기보다 뒤쪽의 프레임으로 넘긴다. 그래서 10번의 루프를 도는 하나의 함수를 4번에 걸쳐 처리한다.

## 시분할 운영체제

순차적인 실행보다 처리 시간은 다소 늦지만, 동시에 여러 작업을 처리할 수 있는 장점이 있다. 인터넷 브라우저를 예로 들면, 브라우저라는 하나의 프로세스에서 여러 개의 스레드를 만들어 놔서 음악, 검색, 이미지 처리와 같은 작업을 분리할 수 있다.

자바스크립의 경우에는 여러 개의 스레드를 두고 스레드마다 처리 영역을 나누고 있다.

## 자바스크립트 쓰레드

- main ui thread
자바스크립트의 기본 뷰 처리를 맡고 있는 스레드. 프레임워크에 쌓여진 코드들이 이 스레드 통과한다.

- background thread
네트워크 등 프로세스 뒷쪽에서 처리를 맡고 있는 스레드.

- web worker thread
백그라운드 스레드의 일종이나, 개발자가 웹 워커를 활용해 스레드를 통제할 수 있다. 자바스크립트를 실행하는 엔진은 원 쓰레드에서 실행하나 또 하나의 스레드를 웹워커를 활용해 만들 수 있다. 쿠키나 디스크에서 파일을 불러 올 때 로딩 화면이 끊끼지 않게 하려면, 웹 워커를 사용해야한다.

단, 이전에는 웹 워커의 영역으로 처리하고 싶은 데이터를 보낼 때, 데이터를 웹워커에 주고 다시 받아오는 과정에서 부담이 생길 수 있었다. 이를 해결하고자 es7/8에서는 atomix라는 객체를 내놓았다.

```
const backRun = (f, end, ...arg) => {
    const blob = new Blob(['
    <!-- 빌트인 onmessage 객체에 메시지 리스너 할당, postMessage도 빌트인 메소드 -->
      onmessage = e => postMessage((${f})(e.data));
      <!-- 파일의 MIME타입  -->
    '], {type:'text/javascript'});

    <!-- 블롭 객체에 url을 만들어주는 메소드를 적용. -->
    <!-- 웹 워커는 url을 인식하기 때문에 -->
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    worker.onmessage = e => end(e.data);
    worker.onerror = e => end(null);
    worker.postMessage(arg);
}

backRun( v => v[0], console.log, 3, 5);


```
worker.postMessage(arg) 
// arg가 postMessage로 넘어가면 함수 `(${f})(e.data)`를 실행시킨다.

 worker.onmessage = e => end(e.data);
 // 위 함수의 값이 워커의 onmessage로 오고 end 인자에 들어가는 콘솔 로그가 e.data를 출력한다.

- blob : 바이너리 파일의 최소 단위.

## Non-blocking
서브루틴이 실행되도 제어권이 즉시 넘어오는 상태. 논 블로킹을 적용할 줄 알면 순차적인 흐름에 한계를 두지 않는 병행성 프로그래밍이 가능하다.


- sync와 async
서브루틴이 리턴을 값(객체)으로 주느냐, 콜백 함수의 리턴값을 활용하느냐에 따라 sync와 async 나뉜다.

```
//sync
const a = v => v*2
console.log(a);

//async
const a = (v,f) => f(v*2);
a(2, console.log) // 4
```

- sync + block
(설명 추가 필요)
```
const async = (n) => {
    for(let i = 0; i < n; i++ ) {
        console.log(i);
    }
}

aysnc(4);
```

- sync + non-block
<!-- 서스펜션 패턴 -->
```
const sum = n => {
    const result = {isCompleted: false};
    requestAnimationFrame( _ => {
        let sum = 0;
        for(let i = 0; i <= n; i++) {
            sum += i;
        }
        result.complete = true;
        result.value = sum;
    })
}

// sum(100)이 계산 되기 전에 제어권이 다음으로 넘어간다.
const result = sum(100);
// 하지만, 다음 블로킹 함수에서 무한 루프가 걸려 위 코드가 제대로 작동하지 않는다 
while(!result.isCompleted);
console.log(result.value); 
```

- async + block 
```
const sum = (n,f) => {
    let sum = 0;
    for( i = 0; i < n; i++) {
        sum += i;
    }
    return f(sum);
}

sum(10, console.log)
console.log(123)
// 55 -> 123
```
형태 상 async. 반환값이 함수이긴 하나, sum 함수가 블록킹의 형태라서 제어권이 다음 줄로 넘어가지 않는다.


- async + non-block
 (가장 이상적인 형태)
```
const sum = (n,f) => {
    requestAnimationFrame = (_) => {
      let sum = 0;
      for( i = 0; i < n; i++) sum += i;
      return f(sum);
    }
}

sum(10, console.log)
console.log(123);
// 123 -> 55
```