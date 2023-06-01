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
    <div >
      <div className=" mb-5">
        {/* <h1 className="text-6xl text-center m-4">Divvy Tips</h1> */}
        {/* <p>
          Divvy Tips is a mobile-focused responsive web application that looks at
          alleviating the pain and time-consuming task of having to calculate the
          hours, credit card and cash tips, and bar back cut for bartenders that
          are “running” the money at the end of the night. It allows bartenders to
          log in, submit their hours, and submit their credit card tips for their
          respective drawer. This information is stored so, whoever is running the
          money, will be able to press a couple buttons and receive a detailed
          quick divvy table. This application can save up to three hours,
          depending on the bar size, at the end of a long bartending shift.
        </p> */}
      </div>
      <div >
        <div className="grid grid-cols-1 items-center m-8">
          <h3 className="text-center text-2xl mb-3">First Time Bar User</h3>
          <button className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900" onClick={submitNewBar}>Register Location</button>
        </div>

        <div className="grid grid-cols-1 items-center m-8">
          <h3 className="text-center text-2xl mb-3">First Time User</h3>
          <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800" onClick={submitRegister}>Register User</button>
        </div>

        <div className="grid grid-cols-1 items-center m-8">
          <h3 className="text-center text-2xl mb-3">Already Registered?</h3>
          <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={submitLogin}>Log In</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
