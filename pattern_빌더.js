const Westeros = {};
// 빌더 패턴
const Game = (function(){
    const Game = function(name) {
        this.name = name;
    }
    return Game;
})();

Westeros.Game = Game;

const Prize = (function(){
    const Prize = function(name) {
        this.name = name;
    }
    return Prize;
})();

Westeros.Prize = Prize;

const Attendee = (function(){
    const Attendee = function(name){
        this.name = name;
    }
    return Attendee;
})();

Westeros.Attendee = Attendee;

const Tournament = (function(){
    // this.events = [];
    function Tournament(){
        this.events = [];
        this.attendee = [];
        this.prizes = [];
    }

    return Tournament;
})()

Westeros.Tournament = Tournament;

const LanisterTournamentBuilder = (function(){
    const LanisterTournamentBuilder = function(){};

    LanisterTournamentBuilder.prototype.build = function(){
        const tournament = new Tournament();

        tournament.events.push(new Game('Joust'));
        tournament.events.push(new Game('Melee'));

        tournament.attendee.push(new Attendee('Jamie'));

        tournament.prizes.push(new Prize('Gold'));

        console.log('lanister tournament', tournament);
        return tournament;
    }
    return LanisterTournamentBuilder;
})();

Westeros.LanisterTournamentBuilder = LanisterTournamentBuilder;

const BaratheonTournamentBuilder = (function(){
    function BaratheonTournamentBuilder(){}

    BaratheonTournamentBuilder.prototype.build = function(){
        const tournament = new Tournament();
        tournament.events.push(new Game('Joust'));
        tournament.events.push(new Game('Melee'));

        tournament.attendee.push(new Game('Melee'));

        tournament.prizes.push(new Game('Melee'));

        return tournament;
    }

    return BaratheonTournamentBuilder;
})();

Westeros.BaratheonTournamentBuilder = BaratheonTournamentBuilder;

const TournamentBuilder = (function(){
    function TournamentBuilder(){}
    
    TournamentBuilder.prototype.build = function(builder){
        return builder.build();
    }

    return TournamentBuilder;
})();

Westeros.TournamentBuilder = TournamentBuilder;

const lanister = new Westeros.LanisterTournamentBuilder();
const tournament = new Westeros.TournamentBuilder();
tournament.build(lanister);