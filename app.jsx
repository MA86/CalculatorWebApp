// Main component //
class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "0",
            output: "0",
            decimalFlag: true
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
        this.handleAC = this.handleAC.bind(this);
        this.handleDecimal = this.handleDecimal.bind(this);
    }
    // Handle inputs
    handleInput(e) {
        let REGEXA = /^0+/;
        let REGEXB = /^[\+\*\/]/;

        // Append input, and remove leading zero and operators
        let input = this.state.input + e.target.value;
        input = input.replace(REGEXA, "");
        input = input.replace(REGEXB, "");

        // Disallow consecutive operators (+, /, *)
        if (input.length > 1) {
            var inputLength = input.length;
            if (
                input[inputLength - 2] == "/" ||
                input[inputLength - 2] == "+" ||
                input[inputLength - 2] == "-" ||
                input[inputLength - 2] == "*"
            ) {
                if (
                    e.target.value == "/" ||
                    e.target.value == "+" ||
                    e.target.value == "*"
                ) {
                    if (
                        input[inputLength - 2] == "-" &&
                        inputLength > 3 &&
                        isNaN(parseInt(input[inputLength - 3]))
                    ) {
                        console.log("PASS");
                        let inputArray = input.split("");
                        inputArray[inputArray.length - 2] = "";
                        inputArray[inputArray.length - 3] = "";
                        input = inputArray.join("");
                    } else {
                        let inputArray = input.split("");
                        inputArray[inputArray.length - 2] = "";
                        input = inputArray.join("");
                    }
                }
            }
        }
        // Allow this expression => example, 3*(-2)
        if (
            e.target.value == "-" &&
            input.length > 1 &&
            input[inputLength - 2] == "-"
        ) {
            let inputArray = input.split("");
            inputArray[inputArray.length - 1] = "";
            input = inputArray.join("");
        }
        // Operators set decimal flag
        if (
            e.target.value == "/" ||
            e.target.value == "+" ||
            e.target.value == "-" ||
            e.target.value == "*"
        ) {
            // Set decimal flag
            this.setState({
                decimalFlag: true
            });
        }
        // Update state with input
        this.setState(function () {
            // If input is empty, set it to zero
            if (input.length == 0) {
                input = "0";
            }
            // Change initial .1 => 0.1
            if (input[0] == ".") {
                input = "0" + input;
            }
            return { output: input, input: input };
        });
    }

    // Equals calculate expression
    handleEqual(e) {
        // TODO: Instead of saying 'INVALID', strip leading zeroes after operators

        let REGEX = /[\+\-\*\/]{1,}0+|[\+\-\*\/]{1,}/g;

        // Check for invalid expression
        if (REGEX.test(this.state.input)) {
            this.setState({
                input: "0",
                output: "INVALID"
            });
        }
        // Evaluate input
        let result = eval(this.state.input);

        // Round result to 10 significant figures for output
        // let output = parseFloat(result).toPrecision(10);

        // Update state with result
        this.setState({
            input: result,
            output: result
        });
    }

    // AC reset state
    handleAC(e) {
        this.setState({
            input: "0",
            output: "0",
            decimalFlag: true
        });
    }

    // Handle decimal input
    handleDecimal(e) {
        // TODO: Add zero before every decimal
        // Remove temp code from InputHandle that sort of does this

        // Ensure only one decimal per number
        if (this.state.decimalFlag == true) {
            // Append decimal
            let input = this.state.input + e.target.value;

            // Update state with decimal
            this.setState({
                output: input,
                input: input,
                // Disallow decimal use again
                decimalFlag: false
            });
        }
    }

    render() {
        return (
            <div className="parent-div animate__animated animate__rollIn">
                <div className="display">
                    <Display output={this.state.output} />
                </div>
                <Buttons
                    handleInput={this.handleInput}
                    handleEqual={this.handleEqual}
                    handleAC={this.handleAC}
                    handleDecimal={this.handleDecimal}
                />
            </div>
        );
    }
}

// Buttons component //
class Buttons extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="buttons-div" className="pad">
                <div className="btn-group mx-1">
                    <button
                        className="btn btn-danger btn-lg"
                        id="clear"
                        value="AC"
                        onClick={this.props.handleAC}
                    >
                        AC
          </button>
                </div>
                <div className="btn-group my-1 mx-1">
                    <button
                        className="btn btn-light btn-lg mr-1"
                        id="seven"
                        value="7"
                        onClick={this.props.handleInput}
                    >
                        7
          </button>
                    <button
                        className="btn btn-light btn-lg mr-1"
                        id="eight"
                        value="8"
                        onClick={this.props.handleInput}
                    >
                        8
          </button>
                    <button
                        className="btn btn-light btn-lg mr-1"
                        id="nine"
                        value="9"
                        onClick={this.props.handleInput}
                    >
                        9
          </button>
                    <button
                        className="btn btn-info btn-lg"
                        id="divide"
                        value="/"
                        onClick={this.props.handleInput}
                    >
                        /
          </button>
                </div>
                <div className="btn-group mb-1 mx-1">
                    <button
                        className="btn btn-light btn-lg mr-1"
                        id="four"
                        value="4"
                        onClick={this.props.handleInput}
                    >
                        4
          </button>
                    <button
                        className="btn btn-light btn-lg mr-1"
                        id="five"
                        value="5"
                        onClick={this.props.handleInput}
                    >
                        5
          </button>
                    <button
                        className="btn btn-light btn-lg mr-1"
                        id="six"
                        value="6"
                        onClick={this.props.handleInput}
                    >
                        6
          </button>
                    <button
                        className="btn btn-info btn-lg"
                        id="multiply"
                        value="*"
                        onClick={this.props.handleInput}
                    >
                        x
          </button>
                </div>
                <div className="btn-group mb-1 mx-1">
                    <button
                        className="btn btn-light btn-lg mr-1"
                        id="one"
                        value="1"
                        onClick={this.props.handleInput}
                    >
                        1
          </button>
                    <button
                        className="btn btn-light btn-lg mr-1"
                        id="two"
                        value="2"
                        onClick={this.props.handleInput}
                    >
                        2
          </button>
                    <button
                        className="btn btn-light btn-lg mr-1"
                        id="three"
                        value="3"
                        onClick={this.props.handleInput}
                    >
                        3
          </button>
                    <button
                        className="btn btn-info btn-lg"
                        id="subtract"
                        value="-"
                        onClick={this.props.handleInput}
                    >
                        -
          </button>
                </div>
                <div className="btn-group mb-1 mx-1">
                    <button
                        className="btn btn-light btn-lg mr-1"
                        id="zero"
                        value="0"
                        onClick={this.props.handleInput}
                    >
                        0
          </button>
                    <button
                        className="btn btn-light btn-lg mr-1"
                        id="decimal"
                        value="."
                        onClick={this.props.handleDecimal}
                    >
                        .
          </button>
                    <button
                        className="btn btn-success btn-lg mr-1"
                        id="equals"
                        value="="
                        onClick={this.props.handleEqual}
                    >
                        =
          </button>
                    <button
                        className="btn btn-info btn-lg"
                        id="add"
                        value="+"
                        onClick={this.props.handleInput}
                    >
                        +
          </button>
                </div>
            </div>
        );
    }
}

// Display component //
class Display extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div id="display">{this.props.output}</div>;
    }
}

// React's virtual DOM handles rendering on actual DOM
ReactDOM.render(<Calculator />, document.getElementById("app"));
