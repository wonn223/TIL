### IndexedDB.

#### 웹 스토리지와 다른 점? 

IndexedDB는 말 그대로 데이터 베이스.웹 스토리지보다 더 많은 데이터를 체계적으로 관리할 수 있다. [files, blob타입의 데이터도 넣을 수 있다](https://gist.github.com/robnyman/1894032). 프레임워크 생명주기처럼 트랜잭션 함수를 활용해서 데이터를 수정할 수 있다.

데이터 구조 형태

- 웹스토리지는 데이터 구조가 키와 값이 1:1인 형태만 가능함. 값 타입도 스트링으로 제한되어있다.

- IndexedDB도 기본 형태는 키와 값이지만 값으로 오브젝트를 받는다. 오브젝트는 프로퍼티에 계속 객체를 형성할 수 있으므로 다층 데이터 구조가 생긴다.

```c
<!-- 웹스토리지 데이터 선언 -->
// 바로 키, value 선언
localStorage.setItem('access_token', JSON.stringify(authObj.access_token));

<!-- IndexedDB 데이터 선언 -->
// 일단 db 열기
const request = indexedDB.open("library"[, version : number]);

// 이벤트 핸들러에 맞춰 데이터베이스 설계
request.onupgreadneeded = () => {
    db = request.result;
    // 스토어 설계
    const objectStore = db.createObjectStore('blahblah')
    ...(생략)
}
```

### IndexedDB의 데이터 계층과 기본 단위

상위 -> 하위

IndexedDB > IndexObjectStore > IndexList

- IndedxedDB에서 데이터는 `record`라 부르며 record가 모인 곳을 store라 한다. 데이터베이스 안에는 최대한 하나 이상의 스토어가 존재한다. `keyPath`는 레코드라면 반드시 가져야 할 프로퍼티를 알려준다.

#### 인덱스 리스트 만들기
```c
const store = db.createObjectStore("books", { keypath: "isbn"});
const titleIndex = store.createIndex('by_title', 'title', {unique: true});
const authorIndex = store.createIndex('by_author', 'author');
```

books라는 스토어를 생성하고 여기에 키패스로 `isbn`을 지정해놨다. 키패스가 있으므로 스토어 안에 모든 레코드는 isbn을 프로퍼티로 가지고 있어야 한다. 없으면 에러가 발생한다. 현재 스토어 안에 title과 author프로퍼티가 존재하는데, createIndex를 활용하면 각각을 기준으로 레코드 테이블 뷰를 바꿀 수 있다. 첫 번째 인자가 인덱스 이름, 두 번째 인자가 keypath, 마지막 인자는 unique여부로서 값이 true가 들어가 있으면 데이터 값이 서로서로 달라야 한다. 같으면 에러 뜬다.


### 트랜잭션으로 데이터베이스 수정하기(html파일 참고)

기존 데이터 구조에 있는 레코드를 추가하거나 수정하는 메소드(add, put, delete 등)는 오브젝트 스토어에 있다.

https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore

#### syntax
```c
const tx = db.transaction('ObjectStoreName:string[]'[, mode:string]);
```

ObjectStoreName에는 objectStore 식별자를 하나 혹은 여러 개 넣을수 있다. 

mode 기본값은 string인 'readonly'. 'readwrite'가 있지만 추천하지 않는다.

* onsuccess와 oncomplete의 차이
onsuccess : when the result of a request is successfully returned.

oncomplete : db에 transaction이 연결된 후, 여러 request.onsuccess가 끝났을 때. 

처리된 데이터가 사용자 디스크로 옮겨가기 직전에 발생.

인덱스db문제점? 데이터를 그대로 저장할 것인가의 문제. 있는 그대로의 정보를 넣는다는 건 보안의 관점에서 문제될 수 있는 부분이다. 

https://github.com/google/lovefield/blob/master/demos/todo/README.md

코드가 몽구스 스키마 설계와 비슷하다.

* 참고) 다른 브라우저 저장소와 간단한 비교 

|  <center>이름</center> |    <center>용량제한</center> |
|:--------|:--------:|--------:|
| IndexedDB | 브라우저마다 다르나 150mb 정도 |
| WEB Storage | 5mb |
|Cookie | 4kb |
* 쿠키는 페이지 기준 20개, 전체페이지 기준 300개를 만들 수 있다.( 300개면 1.2MB )

