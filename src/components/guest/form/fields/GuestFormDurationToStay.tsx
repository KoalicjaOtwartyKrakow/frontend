import React from "react";
import { FormGroup, FormText } from "reactstrap";
import { Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";

import FormInput from "components/atoms/form/FormInput";
import FormSelect from "components/atoms/form/FormSelect";
import FormLabel from "components/atoms/form/FormLabel";
import { TimeUnit } from "models/constants/TimeUnit";
import { GuestFormFields } from "components/guest/GuestFormFields";

const GuestFormDurationToStay = () => {
    const durationId = GuestFormFields.DIMENSIONLESS_DURATION_OF_STAY_VALUE;
    const timeUnitId = GuestFormFields.DURATION_OF_STAY_UNIT;

    const { getFieldProps } = useFormikContext();
    const { value: dimensionlessDuration } = getFieldProps(durationId);
    const { t } = useTranslation(["guest"]);
    const validTimeUnits = [
        {
            id: TimeUnit.DAY,
            name: t("guest:timeUnit.day", { count: parseInt(dimensionlessDuration) }),
        },
        {
            id: TimeUnit.WEEK,
            name: t("guest:timeUnit.week", { count: parseInt(dimensionlessDuration) }),
        },
        {
            id: TimeUnit.MONTH,
            name: t("guest:timeUnit.month", { count: parseInt(dimensionlessDuration) }),
        },
    ];

    return (
        <FormGroup>
            <FormLabel for={durationId} className="required">
                {t("guest:form.label.durationOfStay")}
            </FormLabel>
            <Row>
                <Col xs={6}>
                    <Field
                        component={FormInput}
                        id={durationId}
                        name={durationId}
                        placeholder={t("guest:form.placeholder.durationOfStay")}
                        type="text"
                    />
                </Col>
                <Col xs={6}>
                    <Field component={FormSelect} id={timeUnitId} name={timeUnitId} items={validTimeUnits} />
                </Col>
            </Row>
            <FormText>{t("guest:form.text.durationOfStay")}</FormText>
        </FormGroup>
    );
};

GuestFormDurationToStay.propTypes = {};

export default GuestFormDurationToStay;
