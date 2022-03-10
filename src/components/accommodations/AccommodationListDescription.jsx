import React from "react";
import {
    IconPetsAllowed,
    IconPetsNotPresent,
    IconPetsPresent,
} from "components/shared/Icons";
import { useTranslation } from "react-i18next";

const AccommodationListDescription = () => {
    const { t } = useTranslation();
    return (
        <article>
            <p>
                <span>
                    <IconPetsNotPresent /> –{" "}
                    {t("accommodation.pets.not_present")};{" "}
                </span>
                <span>
                    <IconPetsPresent /> – {t("accommodation.pets.present")};{" "}
                </span>
                <span>
                    <IconPetsAllowed /> – {t("accommodation.pets.allowed")};{" "}
                </span>
            </p>
        </article>
    );
};

export default AccommodationListDescription;
