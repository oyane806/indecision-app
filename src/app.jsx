import React from "react";
import ReactDOM from "react-dom";
import AddOption from "./components/AddOption.jsx";
import Option from "./components/Option.jsx";

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


ReactDOM.render(<IndecisionApp options={["option1", "option2"]} />, document.getElementById("app"));




// // import "./utils.jsx"
// // It executes but I cannot call functions
// // When big thing, import as default
// import subtract, { square, add } from "./utils.jsx"
// console.log("test");

// console.log(square(4));

// console.log(add(3, 100));

// console.log(subtract(10, 2));

// // Import third-party libraries
// // install => import => use

// import validator from "validator";

// console.log(validator.isEmail("test"));

// Loader: how the file is transformed when webpack uses it.
// Need to install babel-core, babel-loader
// Be careful! In this case we need to install babel-loader@7.1.1
// Add inside the webpack config file the module
// Create a babel config file

// Common practice to put each React component in a file.
