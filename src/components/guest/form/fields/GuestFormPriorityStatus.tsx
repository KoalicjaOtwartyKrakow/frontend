import React, { useCallback } from "react";
import { FormGroup } from "reactstrap";
import { Field } from "formik";
import { useTranslation } from "react-i18next";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { GuestFormFields } from "components/guest/GuestFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormSele... Remove this comment to see the full error message
import FormSelect from "components/atoms/form/FormSelect";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/constants/GuestPriority... Remove this comment to see the full error message
import { GuestPriorityStatus } from "models/constants/GuestPriorityStatus";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { sortBy } from "lodash-es";

const GuestFormPriorityStatus = (props: any) => {
    const fieldId = GuestFormFields.PRIORITY_STATUS;

    const { t } = useTranslation(["guest"]);

    const getItems = useCallback(() => {
        const items = [
            {
                id: GuestPriorityStatus.DOES_NOT_RESPOND,
                name: t("guest:priorityStatus.doesNotRespond"),
            },
            {
                id: GuestPriorityStatus.ACCOMMODATION_NOT_NEEDED,
                name: t("guest:priorityStatus.accommodationNotRequired"),
            },
            {
                id: GuestPriorityStatus.EN_ROUTE_UKRAINE,
                name: t("guest:priorityStatus.enRouteUkraine"),
            },
            {
                id: GuestPriorityStatus.EN_ROUTE_POLAND,
                name: t("guest:priorityStatus.enRoutePoland"),
            },
            {
                id: GuestPriorityStatus.IN_KRAKOW,
                name: t("guest:priorityStatus.inTheCity"),
            },
            {
                id: GuestPriorityStatus.AT_R3,
                name: t("guest:priorityStatus.atR3"),
            },
            {
                id: GuestPriorityStatus.ACCOMMODATION_FOUND,
                name: t("guest:priorityStatus.accommodationFound"),
            },
            {
                id: GuestPriorityStatus.UPDATED,
                name: t("guest:priorityStatus.updated"),
            },
        ];
        return sortBy(items, "name");
    }, [t]);

    const items = getItems();

    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("guest:form.label.priorityStatus")}
            </FormLabel>
            <Field component={FormSelect} id={fieldId} name={fieldId} items={items} />
        </FormGroup>
    );
};

GuestFormPriorityStatus.propTypes = {};

export default GuestFormPriorityStatus;
