### NPM(Node Package Manager)

원래는 서버 쪽 자바스크립트 환경인 node.js를 위한 패키지 매니저. 프론트 엔드 영역까지 확쟁했다. 패키지 매니저가 없으면 매번 패키지를 만든 사이트를 찾아가 파일을 직접 다운로드 해야 된다. npm을 사용하면 터미널에서 패키지 매니저를 구동시킨 다음 원하는 패키지를 다운받거나 업데이트를 할 수 있다. 편리한 패키지 관리가 가능하다.

```c
"dependencies": {
"moment": "^2.19.1"
  }
```

패키지 매니저에서 `npm i <패키지명>` 커맨드로 패키지를 다운 받으면, 디펜던시에 다운로드 항목이 추가된다. 항목에 올라가면 패키지에 관한 새로운 소식을 계속해서 받을 수 있다.  다운 받은 패키지는 node_modules라는 폴더에 차곡차곡 쌓인다. 그리고 html에 패키지의 디렉토리를 선언하면 된다.

```c
<head>
<metacharset="UTF-8">
<title>JavaScript Example</title>
<scriptsrc="node_modules/moment/min/moment.min.js"></script>
<scriptsrc="index.js"></script>
</head>
```

* —save-dev 커맨드는 개발 환경에만 쓰이고 서버에 호스팅 된 상태에선 쓰이지 않는 프로그램이란 뜻이다.

하지만 여전히 패키지를 사용하려면 패키지 경로를 위와 같이 script 링크에 넣어야 한다. 패키지 수가 늘어나면 HTML은 길어질 수 밖에 없다. 이 불편함을 해소해준 프로젝트가 CommonJS다. 이 프로젝트에서 패키지 파일을  불러오고 내보낼 수 있는 `require( )`가 탄생했다. 이 함수를 적용한 자바스크립트 환경이 바로 node.js다.

```c
// index.js
var moment = require('moment');
```

moment.js 파일을 직접 index.js 안으로 불러왔다.

단, 실질적으로 자바스크립트를 사용하는 브라우저는 node.js와 다른 실행 환경이라 require 같은 파일 시스템이 없다. 이 문제점을 모듈 번들러가 해결해준다. 브라우저가 스크립트를 읽기 전에, 스크립트 내부에 추가적인 파일과 관련된 export, import작업이 있는지 체크한 다음, 거기에 맞는 작업을 마친 하나의 js파일을 내놓는다. 이 역할을 `webpack`이 수행한다.

*Browserify