class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.state = {
            options: props.options
        };
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
    }
    componentDidMount() {
        console.log("fetching data");
        try {
            const json = localStorage.getItem("options");
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options }));
            }

        } catch (e) {
            // do nothing at all
        }

    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
            // localStorage.getItem("options")
            console.log("saving data");
        }
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }
    // handleDeleteOptions() {
    //     this.setState(() => {
    //         return {
    //             options: []
    //         };
    //     });
    // }
    // Better syntax
    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }
    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }
    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }
    handleAddOption(option) {
        // From here, we can access the option from the child element
        if (!option) {
            return "Enter valid value to add item";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists";
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
        // We use concat here because we do not want to alter prevState
    }
    render() {
        const subtitle = "Add some randomness in your life!";

        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action 
                hasOptions={this.state.options.length > 0}
                handlePick={this.handlePick}
                />
                <Options 
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                // We want to be able to acces this in the Options component.
                handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                handleAddOption={this.handleAddOption}
                />
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
};

const Header = (props) => {
    return (
        <div>
                <h1>{props.title}</h1>
                {props.subtitle && <h2>{props.subtitle}</h2>}
            </div>
    );
};

Header.defaultProps = {
    title: "Indecision"
};


const Action = (props) => {
    return (
        <div>
                <button 
                onClick={props.handlePick}
                disabled={!props.hasOptions}
                >What should I do?</button>
            </div>
    );
};

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove all</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
                {props.options.length}
                {props.options.map((option) => (
                    <Option 
                    key={option} 
                    optionText={option}
                    handleDeleteOption = {props.handleDeleteOption}
                    />))
            }
        </div>
    );
};

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button 
            onClick={(e) => {
                props.handleDeleteOption(props.optionText);
                // Here we need to pass explicitly the text to this function
                // Otherwise, automatically, that is the event that is passed
            }}
            >
            remove
            </button>
            </div>
    );
};

class AddOption extends React.Component {
    // Here we have 2 different methods:
    // one coming from here
    // one coming from the top this.props.handleAddOption
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        // Above will return undefined if error

        this.setState(() => ({ error }));

        if (!error) {
            e.target.elements.option.value = "";
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                <input type="text" name="option"></input>
                <button>Add option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp options={["option1", "option2"]} />, document.getElementById("app"));