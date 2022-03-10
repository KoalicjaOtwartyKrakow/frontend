import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { faDog as faDogNotPresent } from "@fortawesome/pro-light-svg-icons";
import React from "react";
import { nanoid } from "nanoid";
import { UncontrolledTooltip } from "reactstrap";
import { useTranslation } from "react-i18next";

const getDomId = () => `icon-${nanoid(10)}`;

const IconContainer = ({ children }) => <span>{children}</span>;

const IconTooltip = ({ label, target }) => {
    const { t } = useTranslation();
    return (
        <UncontrolledTooltip placement="top" target={target}>
            {t(label)}
        </UncontrolledTooltip>
    );
};

const IconPetsPresent = () => {
    const id = getDomId();
    return (
        <IconContainer>
            <IconTooltip target={id} label="accommodation.pets.present" />
            <span className="fa-layers fa-fw fa-lg" id={id}>
                <FontAwesomeIcon icon={faDog} />
            </span>
        </IconContainer>
    );
};

const IconPetsNotPresent = () => {
    const id = getDomId();
    return (
        <IconContainer>
            <IconTooltip target={id} label="accommodation.pets.not_present" />
            <span className="fa-layers fa-fw fa-lg" id={id}>
                <FontAwesomeIcon
                    icon={faDogNotPresent}
                    className="text-muted"
                />
            </span>
        </IconContainer>
    );
};

const IconPetsAllowed = () => {
    const id = getDomId();
    return (
        <IconContainer>
            <IconTooltip target={id} label="accommodation.pets.allowed" />
            <span className="fa-layers fa-fw fa-lg" id={id}>
                <FontAwesomeIcon icon={faDog} className="text-success" />
            </span>
        </IconContainer>
    );
};

const IconPetsNotAllowed = () => {
    const id = getDomId();
    return (
        <IconContainer>
            <IconTooltip target={id} label="accommodation.pets.not_allowed" />
            <span className="fa-layers fa-fw fa-lg fa-sr-only" id={id}>
                <FontAwesomeIcon icon={faDog} className="text-danger" />
            </span>
        </IconContainer>
    );
};

export {
    IconPetsAllowed,
    IconPetsNotAllowed,
    IconPetsPresent,
    IconPetsNotPresent,
};
