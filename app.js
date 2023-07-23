const keyboard = [
    { key: 'clear', value: 'AC' },
    { key: 'divide', value: '/' },
    { key: 'multiply', value: '*' },
    { key: 'seven', value: '7' },
    { key: 'eight', value: '8' },
    { key: 'nine', value: '9' },
    { key: 'subtract', value: '-' },
    { key: 'four', value: '4' },
    { key: 'five', value: '5' },
    { key: 'six', value: '6' },
    { key: 'add', value: '+' },
    { key: 'one', value: "1" },
    { key: 'two', value: '2' },
    { key: 'three', value: '3' },
    { key: 'zero', value: '0' },
    { key: 'decimal', value: '.' },
    { key: 'equals', value: '=' }
]

const Display = ({ input, output }) => {
    return (
        <div id="screen">
            <div className="output">{output}</div>
            <div id="display" className="input">{input}</div>
        </div>
    )

}

const Keyboard = ({ handleClick }) => {
    return (
        <div id='keys'>
            {keyboard.map((el, ind) => <button id={el.key} key={'key-' + ind} value={el.value} onClick={e => handleClick(e, "value")}>{el.value}</button>)}
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '0',
            output: ''
        }
        this.handleClick = this.handleClick.bind(this)

    }


    // ========================================================= start state manipulate ++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    newInputValue = (val) => {
        this.setState((state) => ({
            input: val
        }))
    }
    //add to input new val
    addToInputNewVal(val) {
        this.setState((state) => ({
            input: state.input + val
        }))
    }

    //add to otput
    addToOutput(val) {
        this.setState((state) => ({
            output: state.output + val
        }))
    }
    // new value for otput

    newOutputValue(val) {
        this.setState((state) => ({
            output: val
        }))
    }

    // add result output new value
    addResulToOutput(val) {
        this.setState((state) => ({
            output: state.output + '=' + val
        }))
    }

    // delete last symball from output
    deleteLastSymOutput(quantity, outputLength) {
        this.setState((state) => ({
            output: state.output.slice(0, outputLength - quantity)
        }))
    }

    //========================================================================================== end state manipulate +++++++++++++++++++++++++++++++++++++++++++++++++++++


    // add number ===============================
    addNumber(val) {
        const lastOutput = this.state.output[this.state.output.length - 1]
        const input = this.state.input
        if (input === '0' || lastOutput === '-') {
            this.newInputValue(val)
        } else {
            this.addToInputNewVal(val)
        }
        this.addToOutput(val)
    }
    // addOperator===============================
    addOperator(val) {
        const output = this.state.output;
        const outputLength = output.length;
        const regexEqual = /=/gi;
        const input = this.state.input;
        const regexOperators = /[^0-9]/gi;
        const lastOutput = output[outputLength - 1]
        const lastByOneSymbOutput = output[outputLength - 2]
        const regex = /[\/*+]/gi

        if (regex.test(lastByOneSymbOutput) && lastOutput === '-') {

            this.deleteLastSymOutput(2, outputLength)
        }

        if (output.match(regexEqual)) {
            this.newOutputValue(input)
        }

        if (lastOutput.match(regexOperators)) {

            this.deleteLastSymOutput(1, outputLength)
        }

        this.addToOutput(val)
        this.newInputValue(val)
    }
    // decimal ============================
    addDecimal(val) {
        const input = this.state.input;
        const regexDecimal = /\./gi;
        if (input.match(regexDecimal)) {
            this.newInputValue(input)
        } else {
            this.addToOutput(val)
            this.addToInputNewVal(val)
        }

    }
    // equls =================================
    equals(val) {
        const result = eval(this.state.output)
        this.setState({
            input: result
        })
        this.addResulToOutput(result)

    }
    //clear ===============
    clear(val) {
        this.setState({
            input: '0',
            output: ''
        })
    }
    // minus===============
    addMinus(val) {
        const outputLenght = this.state.output.length;
        const lastOutput = this.state.output[outputLenght - 1]
        if (val === lastOutput) {
            this.deleteLastSymOutput(1, outputLenght)
        }
        this.addToOutput(val)
    }

    handleClick(e) {
        const val = e.target.value;
        const number = val.match(/[0-9]/gi) || false;
        const regex = val.match(/[\/*+]/gi) || false
        switch (val) {
            case (number[0]):
                this.addNumber(val);
                break;

            case ('='):
                this.equals(val);
                break;
            case ('.'):
                this.addDecimal(val);
                break;
            case ('-'):
                this.addMinus(val);
                break;
            case ('AC'):
                this.clear(val)
                break;
            case (regex[0]):
                this.addOperator(val);
                break;
        }

    }



    render() {
        return (
            <div id="calculator">
                <Display output={this.state.output} input={this.state.input} />
                <Keyboard handleClick={this.handleClick} />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('my-app'))
