import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDog,
    faHandDots,
    faWheelchair,
    faParking,
    faAmbulance,
} from "@fortawesome/free-solid-svg-icons";
import { faDog as faDogNotPresent } from "@fortawesome/pro-light-svg-icons";
import React from "react";
import { nanoid } from "nanoid";
import { UncontrolledTooltip } from "reactstrap";
import { useTranslation } from "react-i18next";
import {
    faBaguette,
    faCheeseSwiss,
    faTurkey,
} from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";

const getDomId = () => `icon-${nanoid(10)}`;

const IconContainer = ({ children }) => <span>{children}</span>;

const IconStackWrapper = ({ children, className, id }) => {
    const iconStackWrapperClassName = classNames(
        "fa-layers fa-fw fa-lg me-1",
        className
    );
    return (
        <span className={iconStackWrapperClassName} id={id}>
            {children}
        </span>
    );
};

const IconTooltip = ({ label, target }) => {
    return (
        <UncontrolledTooltip placement="top" target={target}>
            {label}
        </UncontrolledTooltip>
    );
};

const IconPetsPresent = () => {
    const id = getDomId();
    const { t } = useTranslation(["accommodation"]);
    return (
        <IconContainer>
            <IconTooltip
                target={id}
                label={t("accommodation:common.pets.present")}
            />
            <IconStackWrapper id={id}>
                <FontAwesomeIcon icon={faDog} />
            </IconStackWrapper>
        </IconContainer>
    );
};

const IconPetsNotPresent = () => {
    const id = getDomId();
    const { t } = useTranslation(["accommodation"]);
    return (
        <IconContainer>
            <IconTooltip
                target={id}
                label={t("accommodation:common.pets.notPresent")}
            />
            <IconStackWrapper id={id}>
                <FontAwesomeIcon
                    icon={faDogNotPresent}
                    className="text-muted"
                />
            </IconStackWrapper>
        </IconContainer>
    );
};

const IconPetsAllowed = () => {
    const id = getDomId();
    const { t } = useTranslation(["accommodation"]);
    return (
        <IconContainer>
            <IconTooltip
                target={id}
                label={t("accommodation:common.pets.allowed")}
            />
            <IconStackWrapper id={id}>
                <FontAwesomeIcon icon={faDog} className="text-success" />
            </IconStackWrapper>
        </IconContainer>
    );
};

const IconPetsNotAllowed = () => {
    const id = getDomId();
    const { t } = useTranslation(["accommodation"]);
    return (
        <IconContainer>
            <IconTooltip
                target={id}
                label={t("accommodation:common.pets.notAllowed")}
            />
            <IconStackWrapper className="fa-sr-only" id={id}>
                <FontAwesomeIcon icon={faDog} className="text-danger" />
            </IconStackWrapper>
        </IconContainer>
    );
};

const iconFoodColor = "text-guest-trait";

const IconFoodAllergy = () => {
    const id = getDomId();
    const { t } = useTranslation(["guest"]);
    return (
        <IconContainer>
            <IconTooltip target={id} label={t("guest:traits.food.allergy")} />
            <IconStackWrapper id={id}>
                <FontAwesomeIcon icon={faHandDots} className={iconFoodColor} />
            </IconStackWrapper>
        </IconContainer>
    );
};

const IconFoodMeatFree = () => {
    const id = getDomId();
    const { t } = useTranslation(["guest"]);
    return (
        <IconContainer>
            <IconTooltip target={id} label={t("guest:traits.food.meatFree")} />
            <IconStackWrapper id={id}>
                <FontAwesomeIcon icon={faTurkey} className={iconFoodColor} />
            </IconStackWrapper>
        </IconContainer>
    );
};

const IconFoodLactoseFree = () => {
    const id = getDomId();
    const { t } = useTranslation(["guest"]);
    return (
        <IconContainer>
            <IconTooltip
                target={id}
                label={t("guest:traits.food.lactoseFree")}
            />
            <IconStackWrapper id={id}>
                <FontAwesomeIcon
                    icon={faCheeseSwiss}
                    className={iconFoodColor}
                />
            </IconStackWrapper>
        </IconContainer>
    );
};

const IconFoodGlutenFree = () => {
    const id = getDomId();
    const { t } = useTranslation(["guest"]);
    return (
        <IconContainer>
            <IconTooltip
                target={id}
                label={t("guest:traits.food.glutenFree")}
            />
            <IconStackWrapper id={id}>
                <FontAwesomeIcon icon={faBaguette} className={iconFoodColor} />
            </IconStackWrapper>
        </IconContainer>
    );
};

const iconAccommodationTraitsColor = "text-muted";

const IconDisabledPeopleFriendly = () => {
    const id = getDomId();
    const { t } = useTranslation(["accommodation"]);
    return (
        <IconContainer>
            <IconTooltip
                target={id}
                label={t("accommodation:common.disabledPeopleFriendly")}
            />
            <IconStackWrapper id={id}>
                <FontAwesomeIcon
                    icon={faWheelchair}
                    className={iconAccommodationTraitsColor}
                />
            </IconStackWrapper>
        </IconContainer>
    );
};
const IconParkingPlaceAvailable = () => {
    const id = getDomId();
    const { t } = useTranslation(["accommodation"]);
    return (
        <IconContainer>
            <IconTooltip
                target={id}
                label={t("accommodation:common.parkingPlaceAvailable")}
            />
            <IconStackWrapper id={id}>
                <FontAwesomeIcon
                    icon={faParking}
                    className={iconAccommodationTraitsColor}
                />
            </IconStackWrapper>
        </IconContainer>
    );
};
const IconEasyAmbulanceAccess = () => {
    const id = getDomId();
    const { t } = useTranslation(["accommodation"]);
    return (
        <IconContainer>
            <IconTooltip
                target={id}
                label={t("accommodation:common.easyAmbulanceAccess")}
            />
            <IconStackWrapper id={id}>
                <FontAwesomeIcon
                    icon={faAmbulance}
                    className={iconAccommodationTraitsColor}
                />
            </IconStackWrapper>
        </IconContainer>
    );
};

export {
    IconFoodAllergy,
    IconFoodGlutenFree,
    IconFoodLactoseFree,
    IconFoodMeatFree,
    IconPetsAllowed,
    IconPetsNotAllowed,
    IconPetsNotPresent,
    IconPetsPresent,
    IconDisabledPeopleFriendly,
    IconParkingPlaceAvailable,
    IconEasyAmbulanceAccess,
};
