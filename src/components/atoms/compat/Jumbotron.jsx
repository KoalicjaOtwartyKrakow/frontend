import React from "react";

const Jumbotron = ({ children, onClick }) => {
    return (
        <header onClick={onClick} className="bg-light py-3 pointer">
            {children}
        </header>
    );
};

export default Jumbotron;
