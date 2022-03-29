import React from "react";
import { Button } from "reactstrap";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface Props {
    label: string;
    mobileLabel: string;
}

const EntityFormBackToListButton = ({ label, mobileLabel, ...rest }: Props) => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <Button color="secondary" type="button" className="ms-0 ms-md-2" onClick={goBack} {...rest}>
            <FontAwesomeIcon icon={faCaretLeft} className="me-2" />
            <span className="d-inline d-sm-none">{mobileLabel}</span>
            <span className="d-none d-sm-inline">{label}</span>
        </Button>
    );
};

export default EntityFormBackToListButton;
