import React from "react";
import {
    IconPetsAllowed,
    IconPetsNotPresent,
    IconPetsPresent,
} from "components/shared/Icons";
import { useTranslation } from "react-i18next";

const GuestListDescription = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <article>
            <p>Not description yet</p>
        </article>
    );
};

export default GuestListDescription;
