import PropTypes from "prop-types";
import styles from "./styles/Button.module.css";

function Button({ text }) {
    function spawnSearchPanel() {
        // todo: implement this
    }

    return (
        <div className="SpawnButton">
            <button className={styles.btn} onClick={spawnSearchPanel}>Search By {text}</button>
        </div>
    );
}

// through this we define what the type of the parameters is for the functions
Button.propTypes = {
    text: PropTypes.string.isRequired,
}

export default Button;