import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const FormOptionPleaseSelect = ({ value = "" }) => {
    const { t } = useTranslation();
    return (
        <option value={value} hidden>
            {t("form.please_select")}
        </option>
    );
};

FormOptionPleaseSelect.propTypes = {
    value: PropTypes.any,
};

export default FormOptionPleaseSelect;
