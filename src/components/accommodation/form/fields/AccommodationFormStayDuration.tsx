import React from "react";
import { FormGroup } from "reactstrap";
import { Field, useField } from "formik";
import { useTranslation } from "react-i18next";
import { Col, Row } from "reactstrap";

import FormInput from "components/atoms/form/FormInput";
import FormSelect from "components/atoms/form/FormSelect";
import FormLabel from "components/atoms/form/FormLabel";
import { TimeUnit } from "models/constants/TimeUnit";
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import { useRequired } from "components/shared/form/hooks/useRequired";

const AccommodationFormStayDuration = () => {
    const { t } = useTranslation(["accommodation"]);

    const timeUnitId = AccommodationFormFields.DURATION_OF_STAY_UNIT;
    const durationId = AccommodationFormFields.DURATION_OF_STAY_VALUE;
    const [{ value: dimensionlessDuration }] = useField(durationId);
    const options = { count: Number(dimensionlessDuration) };

    const validTimeUnits = [
        {
            id: TimeUnit.DAY,
            name: t("accommodation:timeUnit.day", options),
        },
        {
            id: TimeUnit.WEEK,
            name: t("accommodation:timeUnit.week", options),
        },
        {
            id: TimeUnit.MONTH,
            name: t("accommodation:timeUnit.month", options),
        },
    ];

    const { getRequiredClassName } = useRequired();
    const className = getRequiredClassName(durationId);

    return (
        <FormGroup>
            <FormLabel for={durationId} className={className}>
                {t("accommodation:form.label.stayDuration")}
            </FormLabel>
            <Row className="g-2">
                <Col xs={4}>
                    <Field
                        component={FormInput}
                        id={durationId}
                        name={durationId}
                        placeholder={t("accommodation:form.placeholder.stayDuration")}
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

export default AccommodationFormStayDuration;
