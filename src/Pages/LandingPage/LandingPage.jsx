import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const submitNewBar = (event) => {
    navigate("/register-bar");
  };

  const submitRegister = (event) => {
    navigate("/register-user");
  };

  const submitLogin = (event) => {
    navigate("/login");
  };

  return (
    <div>

      <p>
        Divvy Tips is a mobile-focused responsive web application that looks at
        alleviating the pain and time-consuming task of having to calculate the
        hours, credit card and cash tips, and bar back cut for bartenders that
        are “running” the money at the end of the night. It allows bartenders to
        log in, submit their hours, and submit their credit card tips for their
        respective drawer. This information is stored so, whoever is running the
        money, will be able to press a couple buttons and receive a detailed
        quick divvy table. This application can save up to three hours,
        depending on the bar size, at the end of a long bartending shift.
      </p>

      <h3>First Time Bar User</h3>
      <button onClick={submitNewBar}>Register Location</button>

      <h3>First Time User</h3>
      <button onClick={submitRegister}>Register User</button>

      <h3>Already Registered?</h3>
      <button onClick={submitLogin}>Log In</button>
    </div>
  );
}

export default LandingPage;