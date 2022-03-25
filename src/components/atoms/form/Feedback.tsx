import React from "react";
import { FormFeedback } from "reactstrap";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormikAp... Remove this comment to see the full error message
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";

const Feedback = ({ name, className = "d-block" }: any) => {
    const form = useFormikContext();
    const error = FormikApiErrors.getError(name, form);
    const { t } = useTranslation(["common"]);
    const invalid = !!error;
    if (!invalid) return null;
    return <FormFeedback className={className}>{t(error)}</FormFeedback>;
};

export default Feedback;
