
// 흐름 제어 목적의 Label

// labe의 형식: 식별자와 콜론 그리고 블록
dd: 각주 대신 이렇게 label을 이용하기도 한다;

// label set의 종류
// 1.label set
k:{
    // 자유변수 
    // 자유변수가 함수 내 동일한 식별자를 가진 변수로 인해 적용 우선순위에서 밀리는 것을
    // 쉐도잉이라한다. 쉐도잉효과는 레이블에서도 일어난다.
    let a = 4;
    const b = () => {
        let a = 3;
        k: {
            break k; 
            console.log(37); // 콘솔 출력 x
        }
        console.log(a); // 3
    }
    b();

}

d: {
console.log('k블록 탈출');
}

// 격벽 역할을 하는 다른 label으로 인해 다음과 같은 경우에는 에러 발생한다.
k2:{
    let a = 4;
    const b = () => {
        let a = 3;
        k: {
            break k2; // 에러 발생. label k의 영역이 labelk2의 점프를 막음.
            console.log(37);
        }
        console.log(a);
    }
    b();
}


// 2.iteration set
// continue는 iteration set에서만 작동한다. 어떤 조건문(while,for)이냐에 따라 continue가 제어하는 흐름이 다르다

for(let i of [1,2,3,4,5]) {
    if (i === 3) continue; // for문에서 continue는 { }내부에서 자신이 적용된 조건의 다음을 다시 실행
    console.log(i); // 1, 2, 4, 5
}

// while문에서는 루프의 맨 처음 조건으로 제어흐름이 이동한다.
var i = 0;
var n = 0;

while (i < 5) {
  // continue 이후 제어의 흐름이 여기서 시작됨 
  i++;

  if (i === 3) {
    continue;
  }

  n += i;
}

// iteration set에서 break를 사용할 때, label 이름을 구체적으로 선언하지 않아도 자동으로 형성된다.
for(let i of [1,2,3,4,5]) {
    if (i === 3) break;
    console.log(i); // 1, 2
}

// quiz 아래의 정답은?
let i = 0, j = 0;
outerLoop:
for(i; i < 10 ; i++) {
    innerLoop:
    for(j; j<10; j++) {
        if (j > 3) break;
        if ( i === 2) break innerLoop;
        if ( i === 4) break outerLoop;
        console.log('innerloop i', i);
        console.log('innerloop j', j);
    }
}
console.log( i + j);

// 3.switch label
// switch ( 표현식 ) { 문장 } 여기서 중괄호는 특수 label block을 나타낸다. 이 블럭 안에서 특수 label을 만든다. 
// 표현식의 값과 일치하는 값이 case에 있으면, 그 위치부터 아래로 쭉 코드를 실행한다.
// 병행 조건의 예외가 있으므로, 예외의 경우 defalut 아래에 설정한 (식)문을 실행한다.

let i = 6, b = 0;
switch (true) {
    // case label : case 식 콜론(:)으로 구성되고, 하나의 점프 구간이 된다.
    case i > 3: console.log('1번째'); break;
    case i > 4: console.log('2번쨰'); break;  
    case i > 5: console.log('3번째'); break;
    default:
    console.log('default'); break;
}

// 예시에서 `case: 표현식`을 썼지만 사실 case label엔 할당이나 함수호출 같은 표현식은 쓰지 않는 게 좋다. 표현식의 결과로 나오는 부수효과도 고려해야 되고,
// 모든 case가 실행되는 것도 아니기 때문에 간단하게 값을 설정하는게 낫다.

// label, break, continue 등을 잘 사용하면 불필요한 함수 사용을 줄일 수 있다.
// 현대에는 if, for와 같은 조건/반복문으로 명시적인 goto구문(break와 contiune)ㄴ없이도 흐름을 제어한다.

// quiz 정답 14;
