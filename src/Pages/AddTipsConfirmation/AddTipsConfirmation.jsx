import { useNavigate } from "react-router-dom";

function AddTipsConfirmation() {
  const navigate = useNavigate();

  const onReturnHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <div className="grid grid-cols-1 place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={.8} stroke="currentColor" className="w-48 h-48 text-green-700 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

        <h3 className="text-center text-2xl mb-4">Tips Submitted!</h3>
        <p className="mx-8">All that's left is for someone to run the money and divvy it up!</p>
        <div className="flex justify-center m-8">
          <button className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" onClick={onReturnHome}>Return</button>
        </div>

    </div>
  );
}

export default AddTipsConfirmation;
