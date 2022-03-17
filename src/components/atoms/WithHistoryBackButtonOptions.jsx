import React from "react";
import { Link, useNavigate } from "react-router-dom";

const withHistoryBackButtonOptions = (Button, options) => {
    const InnerComponent = (props) => {
        const navigate = useNavigate();
        const { to } = options;
        const onClick = () => navigate(-1);
        const buttonOptions =
            navigate.length > 2 ? { onClick } : { tag: Link, to };

        return <Button {...props} {...buttonOptions} />;
    };

    InnerComponent.propTypes = {};

    return InnerComponent;
};

export default withHistoryBackButtonOptions;
