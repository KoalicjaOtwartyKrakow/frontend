import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const FormOptionPleaseSelect = ({ value = "" }) => {
    const { t } = useTranslation(["common"]);
    return (
        <option value={value} hidden>
            {t("common:form.pleaseSelect")}
        </option>
    );
};

FormOptionPleaseSelect.propTypes = {
    value: PropTypes.any,
};

export default FormOptionPleaseSelect;
