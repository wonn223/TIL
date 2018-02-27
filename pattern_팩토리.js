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