import React from "react";
import classNames from "classnames";

const HorizontalLine = ({ className }) => {
    const elementClassNames = classNames("bg-light border-1 border-top border-dark", className);
    return <hr className={elementClassNames} />;
};

export default HorizontalLine;
