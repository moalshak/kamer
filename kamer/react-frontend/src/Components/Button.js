import PropTypes from "prop-types";

/**
 * A default template for a button with an onCLick function.
 * 
 * @param {*} param0 an object containing the function the button text as well as the form to be spawned.
 * @returns a custom html button
 */
function Button({ text, form, onButtonClick }) {
    function onButtonClickLocal() {
        onButtonClick(form);
    }

    return (
        <div className="SpawnButton">
            <button className='btn' onClick={onButtonClickLocal}>{text}</button>
        </div>
    );
}

// through this we define what the type of the parameters is for the functions
Button.propTypes = {
    text: PropTypes.string.isRequired,
    form: PropTypes.string,
    onButtonClick: PropTypes.func.isRequired,
}

export default Button;