import React from "react";

import { useTranslation } from "react-i18next";

const FormOptionPleaseSelect = ({ value = "" }) => {
    const { t } = useTranslation(["common"]);
    return (
        <option value={value} hidden>
            {t("common:form.pleaseSelect")}
        </option>
    );
};

export default FormOptionPleaseSelect;
