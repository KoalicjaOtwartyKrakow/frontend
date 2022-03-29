import { Alert } from "reactstrap";
import React from "react";
import { FormikStatus } from "models/FormikStatus";
import { useFormikContext } from "formik";

const NonFieldError = ({ error, isNotLastError }: any) => (
    <>
        <p className="mb-2">{error}</p>
        {isNotLastError && <hr className="mb-2" />}
    </>
);

const NonFieldErrors = ({ label = "" }: any) => {
    const formikContext = useFormikContext();
    const status: FormikStatus = formikContext.status;

    const nonFieldErrors = status.nonFieldErrors || [];
    const hasErrors = nonFieldErrors.length > 0;

    if (!hasErrors) {
        return null;
    }

    return (
        <Alert color="danger">
            {label && <h4 className="alert-heading fw-semibold mb-3">{label}</h4>}
            {nonFieldErrors.map((error: any, index: any, arr: any) => (
                <NonFieldError isNotLastError={index < arr.length - 1} error={error} key={error} />
            ))}
        </Alert>
    );
};

export default NonFieldErrors;
