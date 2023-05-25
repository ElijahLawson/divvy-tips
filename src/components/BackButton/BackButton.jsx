import React from 'react';
import { useDispatch } from 'react-redux';

function BackButton(props) {
  const dispatch = useDispatch();
  return (
    <div className='mt-auto mb-auto' onClick={() => dispatch({ type: 'LOGOUT'})}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
          </svg>
    </div>
  );
}

export default BackButton;


