import React from "react";
import Modal from "react-modal";

const OptionModal = (props) => (
	<Modal
		isOpen={!!props.selectedOption} // !! to convert string and undefined in boolean
		onRequestClose={props.handleClearSelectedOption} // When esc
		contentLabel="Selected Option"
	>
		<h3>Selected Option</h3>
		{props.selectedOption && <p>{props.selectedOption}</p>}
		<button onClick={props.handleClearSelectedOption}>Okay</button>
	</Modal>
	);

export default OptionModal;