const Religion = {};
const WateryGod = (function(){
    function WateryGod (){}

    WateryGod.prototype.prayTo = function(){ console.log('watery god presented')}

    return WateryGod;
})()

Religion.WateryGod = WateryGod;

const AncientGod = (function(){
    function AncientGod(){}

    AncientGod.prototype.prayTo = function(){console.log('ancient god presented')}

    return AncientGod;
})();

const DefaultGod = (function(){
    function DefaultGod(){}

    DefaultGod.prototype.prayTo = function(){console.log('default god presented')}

    return DefaultGod;
})();

Religion.AncientGod = AncientGod;

const GodFactory = (function(){
    function GodFactory(){}

    GodFactory.prototype.Build = function(godName){
        if(godName === "Watery") return new WateryGod();
        if(godName === "Ancient") return new AncientGod();
        if(godName === "Default") return new DefaultGod();
    }
    
    return GodFactory;
})();

const GodDeterminant = (function(){
    function GodDeterminant(god, purpose){
        this.god = god;
        this.purpose = purpose;
    }

    return GodDeterminant;
})()

const Prayer = (function(){
    function Prayer(god, purpose){
        this.godName = new GodDeterminant(god, purpose);
    }

    Prayer.prototype.pray = function(){
        return GodFactory.prototype.Build(this.godName.god).prayTo();
    }
    return Prayer;
})()

const citizen = new Prayer('Ancient', 'j');
console.log(citizen.pray()); // 'ancient god presented'

// 팩토리 패턴은 전략 패턴과 같이 사용한다.
const TravelResult = (function(){
    function TravelResult(durationInDays, death, cost){
        this.durationInDays = durationInDays,
        this.death = death,
        this.cost = cost
    }

    return TravelResult;
})();

const SeaGoingVessel = (function(){
    function SeaGoingVessel(){}

    SeaGoingVessel.prototype.Travel = function(){
        console.log('Traveling on a vessel');
        return new TravelResult(6, 0.20, 100);
    }

    return SeaGoingVessel;
})()

const Horse = (function(){
    function Horse(){}

    Horse.prototype.Travel = function(){
        console.log('Traveling with horse');
        return new Horse(16, 0.30, 80);
    }

    return Horse;
})();

const currentMoney = 200;
let traveler;

const method = {
    vessel : new SeaGoingVessel(),
    horse : new Horse()
}

traveler = method.vessel;
const travelResult = traveler.Travel(); 
console.log(travelResult); // { durationInDays: 6, death: 0.2, cost: 100 }
