


class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputNum: '0',
            inputSign: '',
            current: '',
            result: ''
        }
        this.numberClick = this.numberClick.bind(this)
        this.clear = this.clear.bind(this)
        this.signClick = this.signClick.bind(this)
        this.current = this.current.bind(this)
        this.clearInputNum = this.clearInputNum.bind(this)
        this.clearInputSign = this.clearInputSign.bind(this)
        this.equalsSign = this.equalsSign.bind(this)
    }

    current() {
        if (this.state.result) {
            return
        } else {
            this.setState(state => ({
                current: state.inputNum
            }))
        }

    }

    clearCurrent() {
        this.setState({
            current: ''
        })
    }

    clearInputNum() {
        this.setState(state => ({
            inputNum: ''
        }))
    }



    numberClick(e) {
        this.clearInputSign()
        if (this.state.inputNum == '0') {
            this.clearInputNum()
        }
        this.setState(state => ({
            inputNum: state.inputNum + e.target.value,
        }))
        this.current()
        this.resultAddSign()
    }

    resultAddNum() {
        this.setState(state => ({
            result: state.result + state.inputNum
        }))
    }

    resultAddSign() {

        this.setState(state => ({
            result: state.result + state.inputSign
        }))

    }

    resultRemoveSing() {
        this.setState(state => ({
            result: state.result.slice(0, state.result.length - 1)
        }))
    }

    clearInputSign() {
        this.setState({
            inputSign: ''
        })
    }

    signClick(e) {
        if (this.state.inputSign) {
            this.resultRemoveSing()
        }
        this.stateInputSign(e)
        this.resultAddNum()
        this.resultAddSign()
        this.clearInputNum()
        this.clearCurrent()
    }

    stateInputSign(e) {
        this.setState(state => ({
            inputSign: e.target.value,
        }))
    }

    equalsSign(e) {
        
        this.stateInputSign(e)
        this.resultAddNum()
        this.resultAddSign()
        this.clearInputNum()
        this.clearCurrent()


    }


    componentDidMount() {

    }
    clear() {
        this.setState({
            inputNum: '0',
            inputSign: '',
            current: '',
            result: ''
        })
        
    }
  

    render() {

       
        
        return (
            <div id="calculator" className="row p-1 h-50">

                <div id="current" >{this.state.current ? this.state.current : this.state.result}</div>
                <div id="display">{this.state.inputNum ? this.state.inputNum : this.state.inputSign}</div>
                <button id="clear" onClick={this.clear} className='btn btn-danger col-6'>AC</button>
                <button id="divide" value="/" onClick={e => this.signClick(e, "value")} className='btn btn-light col-3'>/</button>
                <button id="multiply" value='*' onClick={e => this.signClick(e, "value")} className='btn btn-light col-3'>*</button>

                <button id="seven" value="7" onClick={e => this.numberClick(e, "value")} className="btn btn-light col-3">7</button>
                <button id="eight" value='8' onClick={e => this.numberClick(e, "value")} className="btn btn-light col-3">8</button>
                <button id="nine" value='9' onClick={e => this.numberClick(e, "value")} className="btn btn-light col-3">9</button>
                <button id="subtract" value='-' onClick={e => this.signClick(e, "value")} className='btn btn-light col-3'>-</button>

                <button id="four" value='4' onClick={e => this.numberClick(e, "value")} className="btn btn-light col-3">4</button>
                <button id="five" value='5' onClick={e => this.numberClick(e, "value")} className="btn btn-light col-3">5</button>
                <button id="six" value='6' onClick={e => this.numberClick(e, "value")} className="btn btn-light col-3">6</button>
                <button id="add" value='+' onClick={e => this.signClick(e, "value")} className='btn btn-light col-3'>+</button>

                <button id="one" value="1" onClick={e => this.numberClick(e, "value")} className="btn btn-light col-3">1</button>
                <button id="two" value='2' onClick={e => this.numberClick(e, "value")} className="btn btn-light col-3">2</button>
                <button id="three" value='3' onClick={e => this.numberClick(e, "value")} className="btn btn-light col-3">3</button>
                <button id='equals' value='=' onClick={e => this.equalsSign(e, "value")} className="btn btn-light col-3">=</button>

                <button id="zero" value='0' onClick={e => this.numberClick(e, "value")} className="btn btn-light col-6">0</button>
                <button id="decimal" value='.' onClick={e => this.signClick(e, "value")} className='btn btn-light col-3'>.</button>
            </div>
        )
    }
}



//ReactDOM.render(<MyApp />, document.getElementById('my-app'))
