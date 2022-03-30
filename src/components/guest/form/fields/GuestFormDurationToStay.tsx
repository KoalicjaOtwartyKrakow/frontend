import React from "react";
import { FormGroup } from "reactstrap";
import { Field, useField } from "formik";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";

import FormInput from "components/atoms/form/FormInput";
import FormSelect from "components/atoms/form/FormSelect";
import FormLabel from "components/atoms/form/FormLabel";
import { TimeUnit } from "models/constants/TimeUnit";
import { GuestFormFields } from "components/guest/GuestFormFields";

const GuestFormDurationToStay = () => {
    const { t } = useTranslation(["guest"]);

    const timeUnitId = GuestFormFields.DURATION_OF_STAY_UNIT;
    const durationId = GuestFormFields.DURATION_OF_STAY_VALUE;
    const [{ value: dimensionlessDuration }] = useField(durationId);
    const options = { count: Number(dimensionlessDuration) };

    const validTimeUnits = [
        {
            id: TimeUnit.DAY,
            name: t("guest:timeUnit.day", options),
        },
        {
            id: TimeUnit.WEEK,
            name: t("guest:timeUnit.week", options),
        },
        {
            id: TimeUnit.MONTH,
            name: t("guest:timeUnit.month", options),
        },
    ];

    return (
        <FormGroup>
            <FormLabel for={durationId} className="required">
                {t("guest:form.label.durationOfStay")}
            </FormLabel>
            <Row className="g-2">
                <Col xs={4}>
                    <Field
                        component={FormInput}
                        id={durationId}
                        name={durationId}
                        placeholder={t("guest:form.placeholder.durationOfStay")}
                        type="number"
                        min={0}
                    />
                </Col>
                <Col xs={8}>
                    <Field component={FormSelect} id={timeUnitId} name={timeUnitId} items={validTimeUnits} />
                </Col>
            </Row>
        </FormGroup>
    );
};

GuestFormDurationToStay.propTypes = {};

export default GuestFormDurationToStay;
