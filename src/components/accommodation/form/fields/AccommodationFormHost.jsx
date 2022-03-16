import React, { useEffect } from "react";
import { FormGroup } from "reactstrap";
import { Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { sortBy } from "lodash-es";

import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
import FormSelect from "components/atoms/form/FormSelect";
import { useGetHosts } from "hooks/api/hostsHooks";
import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormHost = () => {
    const { t } = useTranslation(["accommodation"]);
    const { setFieldValue, values } = useFormikContext();
    const { hosts, hostsGetInProgress, hostsGetError, retrieveHosts } =
        useGetHosts();

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
        if (retrievedHosts.length === 0) {
            return;
        }

        const retrievedHost = retrievedHosts.find((item) => item.id === hostId);

        if (retrievedHost.id !== host.id) {
            handleChangeValue(retrievedHost);
        }
    }, [retrievedHosts, hostId, host, handleChangeValue]);

    /**
     *
     * @param {Host} host
     * @returns {{name: string, id: string}}
     */
    const mapHostToItem = (host) => ({
        id: host.id,
        name: `${host.fullName}`,
    });

    const items = retrievedHosts.map(mapHostToItem);
    const sortedItems = sortBy(items, ["name"]);

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
            />
        </FormGroup>
    );
};

AccommodationFormHost.propTypes = {};

export default AccommodationFormHost;
