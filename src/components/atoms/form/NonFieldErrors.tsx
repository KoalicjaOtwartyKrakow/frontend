import { connect, getIn } from "formik";
import { Alert } from "reactstrap";
import React from "react";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/constants' or its... Remove this comment to see the full error message
import { API_ERRORS, API_NON_FIELD_ERRORS } from "services/Api/constants";

const NonFieldError = ({ error, isNotLastError }: any) => (
    <>
        <p className="mb-2">{error}</p>
        {isNotLastError && <hr className="mb-2" />}
    </>
);

const NonFieldErrors = ({ formik: { status }, label = "" }: any) => {
    const nonFieldErrors = getIn(status, [API_ERRORS, API_NON_FIELD_ERRORS]) || [];
    const hasErrors = nonFieldErrors.length > 0;

    return (
        hasErrors && (
            <Alert color="danger">
                {label && <h4 className="alert-heading fw-semibold mb-3">{label}</h4>}
                {nonFieldErrors.map((error: any, index: any, arr: any) => (
                    <NonFieldError isNotLastError={index < arr.length - 1} error={error} key={error} />
                ))}
            </Alert>
        )
    );
};

// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '({ formik: { status }, label }: ... Remove this comment to see the full error message
export default connect(NonFieldErrors);
