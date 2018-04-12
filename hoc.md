번들링으로 인해 모든 컴포넌트가 `bundle.js`라는 파일로 합쳐진다. 파일이 하나라 서버에 리퀘스트를 보내는 횟수가 줄지만, 파일 용량이 크면 브라우저가 렌더링하는 시간이 늘어날 수 있다. 

그래서 번들 파일을 여러 개의 덩어리(chunk)로 쪼갠 다음, 사용자 요청이 있을 때 컴포넌트를  렌더링시키는 방법을 쓴다. 구체적인 구현은 HOC를 활용한다.

#### HOC(Higher Order Comp)

HOC란?  
컴포넌트를 인자로 받고 컴포넌트를 반환하는 함수를 말한다.
```C
HOC is basically a function, that takes a component, and returns another component. You can use them as normal components in your jsx.
```
#### 예제

```c
src/App.js

class App extends Component {
  render() {
    return (
      <Container />
    );
  }
}
```

```c
src/board.js

const AsyncComp = importComponent => {
    return class extends Component {
        state = {
            component : null;
        };

        componentDidMount(){
            importComponent()
            .then(cmp => {
                this.setState({ component : cmp})
            })
        }

        render{
            C = this.state.component
            return (
                C? <C {...this.props} /> : null
            )
        }
    }
}

const Button = AsyncComp(() => {
    return import('./Button');
})

const Container = _ => {
    const c = this.state.component
    return (
        <h1>the async loaded button</h1>
        <Button />
    )
}
```
코드를 보면 `import`문을 .then으로 받을 수 있는 걸 확인할 수 있다. 웹팩은 `import()`를 보고 Button컴포넌트와 관련된 코드를 chunk.js로 분리시킨다. then으로 어떤 정보가 전달되는지 확인해본 결과 Button.js에서 export한 모듈이 들어가 있었다. default를 설정해놔서 모듈 이름이 default다.

![](../src/img/export_console.png)

`_esModule`은 바벨이 export.default를 컴파일한 결과다. 아래 바벨 문서에서 확인할 수 있다.

https://babeljs.io/docs/plugins/transform-es2015-modules-commonjs/

```c
src/Button.js
const Button = () => {

    const btnStyle = {
        background: 'salmon',
        width: '100px',
        height: '100'
    }

    return (
        <div>
            <button style={btnStyle}>Button</button>      
        </div>
    );
};
```


출처) 
https://medium.com/front-end-hacking/loading-components-asynchronously-in-react-app-with-an-hoc-61ca27c4fda7
