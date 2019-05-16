import React from "react";
import Option from "./Option.jsx";

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

export default Options;
