import React from "react";

const Jumbotron = ({ children, onClick }: any) => {
    return (
        <header onClick={onClick} className="bg-light py-2 py-lg-3 pointer">
            {children}
        </header>
    );
};

export default Jumbotron;
