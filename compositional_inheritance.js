// Youtube Fun Fun Function Composition over Inheritance(컴포지션 > 상속)
// https://youtu.be/wfMtDGfHWpA

// 클래스 상속 구조를 잘못 활용한 예

// 어떤 게임에서 다음과 같은 동물 클래스를 구현했다.
class Animal {
    poop(){}
}

class Cat extends Animal {
    meow(){

    }
}

class Dog extends Animal {
    bark(){
    }
}

// 여기서 poop메소드가 없고 kill 메소드가 있는 Dog로봇이 필요하다면?

// Animal과 Robot이 bark를 공유해야해서 최상위 클래스 메소드로 bark()를 지정

class GameObject {
    bark(){};
}

class Robot extends GameObject {
    drive(){};
    clean(){};
}

class MurderRobot extends Robot {
    kill(){};
}

class MurderRobotDog extends MurderRobot {
    // 이 클래스의 인스턴스는 bark, drive, clean같은 불필요한 메소드까지 가지게 된다.(바나나를 가진 고릴라)
}


// 컴포지션 패턴을 이용해서 상속하기

// 컴포지션 패턴은 행동을 기준으로 객체를 구성한다
// 행동 별 객체 분류
// dog = pooper + barker
// cat = pooper + meower
// murderRobot = driver + killer
// murderRobotDog = driver + killer + barker


// 킬러 도그 로봇 만들기

const pooper = (state) => ({
    poop: () => {
        console.log(`${state.name} pooped!`);
    }
})

const barker = (state) => ({
    bark : () => {
        console.log(`${state.name} barked!`);
    }
})

const killer = (state) => ({
    kill : () => {
        console.log(`${state.name} did`);
    }
})


const murderRobotDog = (name) => {
    let state = {
        name,
        speed: 100,
        position: 0
    }
    // bark와 kill 메소드가 있는 객체를 빈 객체({})에 복사한다. => 킬러 도그 로봇 
    return Object.assign (
        {},
        barker(state),
        killer(state)
    )
}

murderRobotDog('Dog robot1').bark(); // Dog robot1 barked!
murderRobotDog('Dog robot1').kill(); // Dog robot1 did

// 언제 컴포지션/상속을 사용하는지?

// 컴포지션을 선호. 상속은 상속 이후의 상황까지 고려해야되서 디자인 비용이 많이 들어가고, 디자인 설계 시 예측하지 못한
// 상황까지 발생할 수 있다.