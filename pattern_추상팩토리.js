// 팩토리 함수

// 팩토리 함수? 리턴값이 객체인 함수
const createJelly = function(){
    return {
        type: 'jelly',
        scoops: 3
    }
}

const createIceCream = function(){
    return {
        type: 'iceCream',
        scoops: 5
    }
}

const createDessert = function(){
    return {
        type: 'dessert',
        bowl: [
            createJelly(),
            createIceCream()
        ]
    }
}

const IceJelly = createDessert();
console.log(IceJelly); // { type: 'dessert', bowl: [ { type: 'jelly', scoops: 3 }, { type: 'iceCream', scoops: 5 } ] }

// ES6 class 키워드를 사용할 때
// const KingJoffrey = class {
//     constructor(){}
//     makeDecision() {}
//     marry(){}
// }


// 추상 팩토리 패턴
const KingJoffrey = (_ => {
    const KingJoffrey = function() {
        console.log('KingJoffrey presented');
    };

    KingJoffrey.prototype.makeDecision = function(){
        console.log('KingJoffrey made a decision');
    };

    KingJoffrey.prototype.marry = function(){};

    return KingJoffrey;
})();

const LordTywin = (function(){
    function LordTywin(){}

    LordTywin.prototype.makeDecision = function(){
        console.log('LordTywin made a decison');
    };

    return LordTywin;
})();

// 구체 팩토리
const LanisterFactory = (function(){
    function LanisterFactory(){}

    LanisterFactory.prototype.getKing = function(){
        return new KingJoffrey('Lanister');
    };

    LanisterFactory.prototype.getHandOfKing = function(){
        return new LordTywin();
    };
    return LanisterFactory;
})();


const CourtSession = (function(){
    const CourtSession = function(abstractFactory) {
        this.abstractFactory = abstractFactory;
        this.complaint_threshold = 10;
    }

    CourtSession.prototype.complaintPresented = function(complaint){
        if(complaint.severtiy < this.complaint_threshold) this.abstractFactory.getHandOfKing().makeDecision();
        else this.abstractFactory.getKing().makeDecision();
    }  
    return CourtSession;
})()

const courtSession = new CourtSession(new LanisterFactory);
console.log(courtSession.complaintPresented({severtiy : 8})); // LordTywin made a decison. LordTywin 구현체 생성 
console.log(courtSession.complaintPresented({severtiy : 11})); // KingJoffrey presented, KingJoffrey made a decision KingJoffrey 구현체 생성
