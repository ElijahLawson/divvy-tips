import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function AddTipsConfirmation() {
  const navigate = useNavigate();

  const onReturnHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <div>
        <h3>Tips Submitted!</h3>
        <p>All that's left is for someone to run the money and divvy it up!</p>
        <button onClick={onReturnHome}>Return</button>
      </div>
    </div>
  );
}

export default AddTipsConfirmation;
