import React, { useEffect, useMemo } from "react";
import { FormGroup } from "reactstrap";
import { Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { sortBy } from "lodash";
import {
    AccommodationFormFields,
    AccommodationFormFieldsInterface,
} from "components/accommodation/AccommodationFormFields";
import FormSelect from "components/atoms/form/FormSelect";
import { useGetHosts } from "hooks/api/hostsHooks";
import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormHost = () => {
    const { t } = useTranslation(["accommodation"]);
    const formikContext = useFormikContext<AccommodationFormFieldsInterface>();
    const { setFieldValue } = formikContext;
    const { hosts, hostsGetInProgress, hostsGetError, retrieveHosts } = useGetHosts();
    const values = formikContext.values;

    const fieldId = AccommodationFormFields.HOST_ID;

    const hostId = values[fieldId];

    const host = values[AccommodationFormFields.HOST];

    const retrievedHosts = hosts || [];
    const shouldFetchHosts = !hosts && !hostsGetError && !hostsGetInProgress;

    const handleChangeValue = React.useCallback(
        (value) => setFieldValue(AccommodationFormFields.HOST, value),
        [setFieldValue]
    );

    useEffect(() => {
        if (shouldFetchHosts) {
            retrieveHosts();
        }
    }, [retrieveHosts, shouldFetchHosts]);

    useEffect(() => {
        if (retrievedHosts.length === 0 || !hostId) {
            return;
        }

        const retrievedHost = retrievedHosts.find((item: any) => item.id === hostId);

        if (retrievedHost.id !== host?.id) {
            handleChangeValue(retrievedHost);
        }
    }, [retrievedHosts, hostId, host, handleChangeValue]);

    /**
     *
     * @param {Host} host
     * @returns {{name: string, id: string}}
     */
    const mapHostToItem = (host: any) => ({
        id: host.id,
        name: `${host.fullName} | ${host.id}`,
    });

    const sortedItems = useMemo(() => {
        const items = retrievedHosts.map(mapHostToItem);
        const sortedItems = sortBy(items, ["name"]);
        return sortedItems;
    }, [retrievedHosts]);

    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("accommodation:form.label.host")}
            </FormLabel>
            <Field
                component={FormSelect}
                id={fieldId}
                name={fieldId}
                items={sortedItems}
                isPleaseSelect={!hostId}
                disabled={hostsGetInProgress || hostsGetError}
            />
        </FormGroup>
    );
};

export default AccommodationFormHost;
