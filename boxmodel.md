코드스피츠72 - CSS Rendering 2회차 1/2

#### 박스 모델 
  엘리먼트가 가진 네 종류의 박스를 일컫는 개념. (마진, 보더, 패딩, 컨텐츠) 똑같은 `width`,`height`값을 가지고 있어도 박스 속성에 따라 화면에 나타나는 결과가 다르다.

 CSS2.1에서는 컨텐츠 박스에 너비와 높이를 적용하기로 결정했었다.
 그러다 최근 들어 보더 박스,패딩 박스, 컨텐츠 박스 중 개발자가 원하는 곳에 높이와 너비를 적용할 수 있게끔 기준을 바꿔놓았다. CSS 속성 중 `box-sizing`을 활용하면 원하는 박스를 선택할 수 있다.
 
 ```
 // 보더박스 - 패딩 적용X, 보더 영역을 포함해서 100px 상자가 나온다.
.box1 {
    width: 100px;
    height: 100px;
    padding: 10px;
    box-sizing : border-box;
    background: red;
 }

// 컨텐츠 박스 100px + 패딩 40px = 140px 상자가 나온다.
.box2 {
    width: 100px;
    height: 100px;
    padding: 10px;
    background: blue;
 }
 ```

 보더 박스, 컨텐츠 박스의 경우 대부분의 브라우저에서 지원하고 있으나 패딩 박스의 경우 파이어폭스만 지원하고 있다. 여기까지 고전 박스 모델의 내용이며, 고전 박스 모델은 css레이아웃 상자를 만들어내기 때문에 css 리플로우 & 리페인트 작업에 영향을 준다.

 #### 언제 보더 박스 / 컨텐츠 박스를 쓸까? 

 `%`로 변화시키고 싶은 박스가 컨테츠 바깥인지, 보더 내부인지에 따라`box-sizing`값이 달라진다. 

 컨텐츠 박스 : 어떤 요소 안에 자식 요소를 배치하고 싶으면 컨텐츠 박스를 쓴다. 컨텐츠 박스 크기가 정해지면 그 사이즈를 기준으로 `%`단위의 패딩/보더를 적용할 수 있다.

 보더 박스 : 어떤 CSS 맥락에 새로운 요소를 배치시키고 싶을 때 쓴다. 컨텐츠 바깥 박스인 보더의 박스가 정해져 있는 상태이므로, 패딩/컨텐츠 박스를 %단위로 조정할 수 있다. 보더 박스에서는 보더 영역이 패딩을 대신할 수 있어서, `padding`속성을 많이 쓰지 않는다.


 * 보더 박스 모델:  왼쪽이 보더가 5px일 때, 오른쪽이 20px일 때
 ~~~
<body style="padding:0px; margin:0px">
    <div style="display:inline-block;margin: 10px; width: 100px; height:100px; background:blue; box-sizing:border-box; border: 5px solid black;"></div>
    <div style="display:inline-block; margin: 10px; width: 100px; height:100px; background:blue; box-sizing:border-box; border: 20px solid black;"></div>
</body>
~~~

 #### 고전 박스 모델 + 확장된 CSS 모듈
 전체 레이아웃에 영향을 주지 않으면서, 박스 주변에 테두리를 그릴 수 있는 방법이 소개되었다.

1. box-shadow

보더 박스 바로 바깥 쪽 혹은 안 쪽에 그림자를 그려준다.
 css레이아웃에 영향을 미치지 않으므로, 옆에 있는 요소가 그림자로 인해 다음 줄로 밀리는 현상은 없다. 다만 `outline`속성이나 `position:relative`를 가진 다른 요소로 인해 겹쳐질 수는 있다. shadow에게 영역을 주고 싶다면 shadow로 늘어진 영역만큼 박스에 마진값을 주면 된다. 만약 보더 안쪽에 shadow를 적용하고 싶다면, box-shadow 적용 시 inset을 입력하면 된다. 그러면 아래와 같은 결과를 볼 수 있다.

* 보더 안쪽에 적용한 모습
~~~
    <body style="padding:0px; margin:0px">
        <div style="box-shadow: inset 0 0 10px 10px purple; margin: 10px; width: 100px; height:100px; background:blue; box-sizing:border-box; border: 10px solid black;"></div>
    </body>
~~~
* position:relative로 인해 shadow가 뒤로 밀린 모습

    여기서 노멀 플로우(position:static)를 따르는 속성의 z-index 를 relatvie 속성으로 바꿀 수 있다는 점을 알 수 있다.
    
~~~
    <style>
    div { width:100px; 
          height:100px;
          display: inline-block;
        }
    </style>

    <div style="background:brown; position:relative;">
    </div><div style="box-shadow: 0 0 10px 10px purple; background:blue;"></div>
~~~

* outline으로 겹쳐진 모습

    ~~~
    <div style="box-shadow: inset 0 0 10px 10px purple; margin: 10px; width: 100px; height:100px; background:blue; box-sizing:border-box; border: 10px solid black; outline: 5px solid white;"></div>
    ~~~
2. outline

 보더 바깥 영역에 테두리를 그릴 수 있는 방법 중 하나. box-shadow로 나온 테두리를 덮는다.

http://jsbin.com/wuvuwebela/1/edit?html,css,output

* 참고) 인라인 블록 사용 시, HTML 태그 사이에 생긴 빈 칸을 없애줘야 한다. 인라인 포맷팅 컨텍스트(IFC)에서 공백을 하나의 텍스트 엘리먼트로 인식하기 때문에 그 자리에 HTML의 폰트 사이즈만큼 빈 칸을 넣는다.


```
<!-- 공백 제거 -->
<div style="background:brown">
</div><div style="background:olive;"></div>
```

https://www.youtube.com/watch?v=msoT99yzukE&t=1272s


* HTML문서에서 공백 제거 후
~~~
<!-- 공백 제거 -->
<div style="background:brown; width:100px; 
          height:100px;
          display: inline-block;">
</div><div style="background:olive; width:100px; 
          height:100px;
          display: inline-block;"></div>
~~~
#### border의 dashed속성
`solid`와 다르게 점선으로 표현되는데, 이 속성을 적용하고 나면 baackground가 보더 영역까지 적용되는 것을 알 수 있다. 