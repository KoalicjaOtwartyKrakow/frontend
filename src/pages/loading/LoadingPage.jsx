import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import PropTypes from "prop-types";

const LoadingPage = ({ visible }) => {
    const className = classNames(
        "h-100 align-items-center justify-content-center",
        { "d-flex": visible },
        { "d-none": !visible }
    );

    // const addBodyClass = (className) => document.body.classList.add(className);
    // const removeBodyClass = (className) =>
    //     document.body.classList.remove(className);

    useEffect(() => {});

    return (
        <Container className={className}>
            <span className="h2 text-muted">
                <FontAwesomeIcon icon={faSpinner} pulse={true} />
            </span>
        </Container>
    );
};

LoadingPage.propTypes = {
    visible: PropTypes.bool.isRequired,
};

export default LoadingPage;
