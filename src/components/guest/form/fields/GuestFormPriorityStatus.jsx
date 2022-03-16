import React from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormSelect from "components/atoms/form/FormSelect";
import { GuestPriorityStatus } from "models/constants/GuestPriorityStatus";
import FormLabel from "components/atoms/form/FormLabel";

const GuestFormPriorityStatus = (props) => {
    const fieldId = GuestFormFields.PRIORITY_STATUS;

    const { t } = useTranslation(["guest"]);

    const items = [
        {
            id: GuestPriorityStatus.ACCOMMODATION_FOUND,
            name: t("guest:priorityStatus.accommodationFound"),
        },
        {
            id: GuestPriorityStatus.ACCOMMODATION_NOT_NEEDED,
            name: t("guest:priorityStatus.accommodationNotRequired"),
        },
        {
            id: GuestPriorityStatus.EN_ROUTE_POLAND,
            name: t("guest:priorityStatus.enRoutePoland"),
        },
        {
            id: GuestPriorityStatus.EN_ROUTE_UKRAINE,
            name: t("guest:priorityStatus.enRouteUkraine"),
        },
        {
            id: GuestPriorityStatus.IN_KRAKOW,
            name: t("guest:priorityStatus.inCracow"),
        },
        {
            id: GuestPriorityStatus.IN_CRISIS_POINT,
            name: t("guest:priorityStatus.inCrisisPoint"),
        },
    ];

    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("guest:form.label.priorityStatus")}
            </FormLabel>
            <Field
                component={FormSelect}
                id={fieldId}
                name={fieldId}
                items={items}
            />
        </FormGroup>
    );
};

GuestFormPriorityStatus.propTypes = {};

export default GuestFormPriorityStatus;
