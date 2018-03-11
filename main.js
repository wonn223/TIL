// 데이터 로딩하고 json변환
// const loader = new Loader('data.json');
// loader.load( json => {
    // renderer.send(json);
// })

// 껍데기는 최종적으로 보면 중요하지 않다.

const Data = (_=>{
    return class {
        constructor(){
            Object.assign(this, {
                _title: null, _header: null, _items: null
            })
        };

        async getData(){
            const json = await this._getData();
            const {_title:title, _header:header, _items:items} = this;
            if(title === null || header === null || items === null) {
                throw '_getdata fail';
            }
            return new Info({title, header, items});
        }   

        async _getData(){
            throw 'must be overrided';
        }
    }
})();

const JSONData = class extends Data {
    constructor(data){
        super();
        this._data = data;
    }
    async _getData(){
        let json;
        if(typeof this._data === 'string' || !this._data) {
            const response = await fetch(this._data);
            json = await response.json();
        } else json = this._data;
        const {title: _title, header: _header, items: _items} = json;
        Object.assign(this, {_title, _header, _items});
    }
}
// 렌더러와 데이터가 아무 json데이터를 보내지 않게, 딱 필요한 데이터만 보내게 
// 규약을 정해주는 클래스
// ? 여기서는 왜 심볼을 안 쓸까
const Info = class {
    constructor(json) {
        const {title, header, items} = json;
        console.log('info안', title)
        if(typeof title != 'string') throw 'invalid title';
        if(!Array.isArray(header) || !header.length) throw 'invalid header';
        if(!Array.isArray(items) || !items.length) throw 'invalid items';
        items.forEach( (item, index) => {
            if(!Array.isArray(item) || item.length != header.length){
                throw 'invalid items' + index;
            }
        });
        this._private = {title, header, items};
    }
    //
    get title(){ return this._private.title }
    get header(){ return this._private.header }
    get title(){ return this._private.items }
}

const Renderer = (_=>{
    // const render = Symbol('renderer');
    return class {

        constructor(){
            Object.assign(this, {_title: null, _header: null, _items: null});
        }

        async render(data) {    
            if(!(data instanceof Data)) throw 'invalid type';
            const a = await data.getData();
            const { title, header, items } = a._private;
            console.log('title', title);
            console.log('header', header);
            console.log('items', items);
            Object.assign(this, {_title: title, _header: header, _items: items});
            this._render();
        }

        _render(){
            throw 'must be overrided';
        }
    }
})();

const TableRenderer = class extends Renderer {
    constructor(parent){
        console.log(parent);
        if(!parent || typeof parent != 'string') throw 'invalid parent type';
        super();
        this._parent = parent;
    }

    _render(){
        const parent = document.querySelector('#'+this._parent);
        console.log(parent);
        if(!parent) throw 'invalid parent';
        parent.innerHTML = '';
        const [table, caption] = "table,caption".split(',').map(item => document.createElement(item));
        caption.innerHTML = this._title;
        table.appendChild(caption);
        // 헤더를 thead
        // header가 
        table.appendChild(this._header.reduce( (thead, data) => (
            thead.appendChild(document.createElement("th")).innerHTML = data, thead
        ), document.createElement('thead'))
        );   
        // items를 tr로
        // 부모에 table삽입
        parent.appendChild(
            this._items.reduce( 
                (table,row)=> ( table.appendChild(
                    row.reduce( 
                        (tr,data) => ( tr.appendChild(document.createElement('td')).innerHTML = data, tr), document.createElement('tr'))
                    ), table), 
                table)
        );
    }
}
