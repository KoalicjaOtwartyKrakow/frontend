import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import Routes from "constants/Routes";
import React from "react";
import { useTranslation } from "react-i18next";

const PageNavigationApartmentList = () => {
    const { t } = useTranslation();

    return (
        <p className="text-center mb-0">
            <Button color="secondary" outline tag={Link} to={Routes.APARTMENTS}>
                {t("apartment.back_to_list")}
            </Button>
        </p>
    );
};

export default PageNavigationApartmentList;
