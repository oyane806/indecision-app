import React from "react";

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

export default Option;
// We use this method to have a valid component name in the dev tool.