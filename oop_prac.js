// 소비자 객체
const Customer = ( _=> {
    const inventory = [];

    return class {
        constructor(){
            this.inventory = inventory;
        }

        find(sellerType) {
            if((sellerType instanceof NPC) === false) { throw 'Invalid NPC type' };
            this.seller = sellerType;
            console.log('이름은?',this.seller);
            this._find(this.seller);
        }

        _find(){ throw 'must be overrided'; };

        // 비드 형태를 정의하는 타입 
        bid(item, price) {
            if(!(item !== String && price !== Number)) { throw 'invalid bid type';}
            const list = new Info(item, price);
            return this._bid(list); 
        }
    }
})(); 

// 소비자 중 스포츠용품 소비자 객체
const sportsCutsomer = class extends Customer {
    constructor(count){
        super();
        this.count = count;
        this.seller;
    }

    _find(){
        console.log('found :' + this.seller)
        // 위임
        return this.seller.show(this);
    }

    _bid(list){
        // 위임
        return this.seller.sell(list);
    }
}

// 상인
const NPC = class {
    constructor() {
        this.buyer;
    }

    show(customer) {
        this.buyer = customer;
        // The default conversion from an object to string is "[object Object]"
        // 인터폴레이션을 썼더니 [object Object]가 나옴
        return console.log(this._items);
        // Item이 어떤 건지만 확인
        // if(!(item instanceof Item)) throw 'ivalid item type';
    }

    sell(list) {
        let result;
        if((list instanceof Info === false)) {throw 'invalid bid type'}
        console.log('주문 내용', list.item + ' ' + list.price);
        if(!(this._items.hasOwnProperty(list.item))) { throw `${list.item} : 해당 품목이 없습니다.` }
        if(list.price < this._items[list.item] ) { throw '돈이 부족합니다'}
        
        return this._sell(list); 
    }

    _sell(){ throw 'must be overrided'};

    }

// 서울 지역 상인 
const SeoulNPC = class extends NPC {
    constructor(item) {
        super();
        this._items = item.item;
        // this._items = Object.assign({}, super._items);
        console.log('seoulNPC item', this._items);
    }

    _sell(list) {
        console.log('완료되었습니다. inventorty로 이동시킵니다.');
        console.log('바이어', this.buyer);
        // inventory로 이동시키기
        return this.buyer.inventory = Object.assign(this.buyer.inventory, list);
    }
}

// 돈 객체
// 역할 : 상인과 소비자가 상품을 교환할 떄 쓰이는 '돈' 타입 생성
const Currency = class {
    constructor(num) {
        this._num = num;
    }
}

// 아이템 객체
const Item = class {
    constructor(){
        this.item = {
            soccer:  "500",
            clothes:  "1500",
            tree:  "2500",
        }
    }

    add(new_item){
        return this.item.concat(new_item);
    }
}

// 소비자 주문 객체
const Info = class {
    constructor(item, price) {
        this.item = item;
        this.price = price;
    }
}

const sports_A = new sportsCutsomer(new Currency(500));
const seller_Seoul = new SeoulNPC(new Item());

sports_A.find(seller_Seoul); // true
console.log(sports_A.bid('soccer', 500));

// 구매 후
console.log('인벤', sports_A.inventory); // 인벤 [ item: 'soccer', price: 500 ]

// 수정 중..