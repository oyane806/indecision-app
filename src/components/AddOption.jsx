import React from "react";

export default class AddOption extends React.Component {
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