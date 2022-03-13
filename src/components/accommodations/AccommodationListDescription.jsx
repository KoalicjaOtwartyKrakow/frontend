import React from "react";
import {
    IconPetsAllowed,
    IconPetsNotPresent,
    IconPetsPresent,
} from "components/shared/Icons";
import { useTranslation } from "react-i18next";

const AccommodationListDescription = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <article>
            <p>
                <span>
                    <IconPetsNotPresent /> –{" "}
                    {t("accommodation:common.pets.notPresent")};{" "}
                </span>
                <span>
                    <IconPetsPresent /> –{" "}
                    {t("accommodation:common.pets.present")};{" "}
                </span>
                <span>
                    <IconPetsAllowed /> –{" "}
                    {t("accommodation:common.pets.allowed")};{" "}
                </span>
            </p>
        </article>
    );
};

export default AccommodationListDescription;
