import NavBar from "../NavBar/NavBar";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function TipConfirmation() {

    const history = useHistory();

    const onReturnHome = () => {
        history.push('/home');
    }

    return(
        <div>
            <NavBar />
            <div>
                <h3>Tips Submitted!</h3>
                <p>All that's left is for someone to run the money and divvy it up!</p>
                <button onClick={onReturnHome}>Return</button>
            </div>
        </div>
    )
}

export default TipConfirmation;