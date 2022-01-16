import PropTypes from "prop-types";

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