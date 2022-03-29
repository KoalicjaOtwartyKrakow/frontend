import React from "react";
import { FormFeedback } from "reactstrap";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";

interface Props {
    name: string;
    className?: string | undefined;
    namespaces?: string[];
}

const FormErrorsFeedback = ({ name, className = "d-block", namespaces = ["common"] }: Props) => {
    const formikContext = useFormikContext();
    const errors = FormikApiErrors.getErrors(name, formikContext);
    const invalid = errors.length > 0;
    const { t } = useTranslation(namespaces);
    if (!invalid) return null;
    return <FormFeedback className={className}>{errors.map((error) => t(error))}</FormFeedback>;
};

export default FormErrorsFeedback;
