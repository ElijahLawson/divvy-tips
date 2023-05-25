import React from "react";

function HamburgerButton(props) {

    const onDrawerClick = (event) => {
        event.preventDefault();

        props.drawerClosed
    }

    return (
        <>
            <button className="mb-auto mt-auto" onClick={onDrawerClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 text-white h-12 border border-white mt-auto mb-auto mr-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
        </>
    )
}

export default HamburgerButton;