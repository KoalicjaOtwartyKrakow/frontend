import React from "react";
import {
    IconPetsAllowed,
    IconPetsNotPresent,
    IconPetsPresent,
} from "components/shared/Icons";
import { useTranslation } from "react-i18next";
import GuestPriorityStatusBadge from "components/guest/GuestPriorityStatusBadge";
import { GuestPeopleCountBadgeColor } from "components/shared/constants/GuestColorScheme";

const GuestListDescription = () => {
    const { t } = useTranslation(["guest"]);
    return (
        <article>
            <p>
                {t("guest:peopleCount.label")}:{" "}
                <GuestPriorityStatusBadge
                    color={GuestPeopleCountBadgeColor.TOTAL}
                    label={t("guest:peopleCount.total")}
                />
                <GuestPriorityStatusBadge
                    color={GuestPeopleCountBadgeColor.MALE}
                    label={t("guest:peopleCount.men")}
                />
                <GuestPriorityStatusBadge
                    color={GuestPeopleCountBadgeColor.FEMALE}
                    label={t("guest:peopleCount.women")}
                />
                <GuestPriorityStatusBadge
                    color={GuestPeopleCountBadgeColor.CHILDREN}
                    label={t("guest:peopleCount.children")}
                />
            </p>
        </article>
    );
};

export default GuestListDescription;
