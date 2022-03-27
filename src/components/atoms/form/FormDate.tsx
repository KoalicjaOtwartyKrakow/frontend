import React from "react";
import { FormFeedback, Input } from "reactstrap";

import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "formik";

const FormDate = ({ name, ...props }: { name: string }) => {
    const { t } = useTranslation(["common"]);
    const formikContext = useFormikContext();

    const error = FormikApiErrors.getError(name, formikContext);
    const invalid = !!error;

    return (
        <React.Fragment>
            <Input invalid={invalid} type="date" {...props} />
            {invalid && <FormFeedback>{t(error)}</FormFeedback>}
        </React.Fragment>
    );
};

export default React.memo(FormDate);
