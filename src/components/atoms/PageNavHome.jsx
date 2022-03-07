import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { Routes } from "constants/Routes";
import React from "react";
import { useTranslation } from "react-i18next";

const PageNavigationAccommodationList = () => {
    const { t } = useTranslation();

    return (
        <p className="text-center mb-0">
            <Button
                color="secondary"
                outline
                tag={Link}
                to={Routes.ACCOMMODATIONS}
            >
                {t("accommodation.back_to_list")}
            </Button>
        </p>
    );
};

export default PageNavigationAccommodationList;
