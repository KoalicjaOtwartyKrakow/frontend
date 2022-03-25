import React from "react";
import {
    IconDisabledPeopleFriendly,
    IconEasyAmbulanceAccess,
    IconParkingPlaceAvailable,
    IconPetsAllowed,
    IconPetsNotPresent,
    IconPetsPresent,
    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/shared/Icons' or it... Remove this comment to see the full error message
} from "components/shared/Icons";
import { useTranslation } from "react-i18next";

const AccommodationListDescription = () => {
    const { t } = useTranslation(["accommodation"]);
    return (
        <article>
            <p>
                <span>
                    <IconPetsNotPresent /> – {t("accommodation:common.pets.notPresent")};{" "}
                </span>
                <span>
                    <IconPetsPresent /> – {t("accommodation:common.pets.present")};{" "}
                </span>
                <span>
                    <IconPetsAllowed /> – {t("accommodation:common.pets.allowed")};{" "}
                </span>
                <span>
                    <IconDisabledPeopleFriendly /> – {t("accommodation:common.disabledPeopleFriendly")};{" "}
                </span>
                <span>
                    <IconParkingPlaceAvailable /> – {t("accommodation:common.parkingPlaceAvailable")};{" "}
                </span>
                <span>
                    <IconEasyAmbulanceAccess /> – {t("accommodation:common.easyAmbulanceAccess")};{" "}
                </span>
            </p>
        </article>
    );
};

export default AccommodationListDescription;
