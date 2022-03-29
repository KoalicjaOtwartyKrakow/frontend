import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";

const PageNavigationBackToList = ({ to }: any) => {
    const { t } = useTranslation(["common"]);

    return (
        <p className="text-center mb-0">
            <Button color="secondary" outline tag={Link} to={to}>
                {t("common:form.button.backToList")}
            </Button>
        </p>
    );
};

export default PageNavigationBackToList;
