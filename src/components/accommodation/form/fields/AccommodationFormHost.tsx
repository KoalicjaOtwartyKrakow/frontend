import React, { useEffect } from "react";
import { FormGroup } from "reactstrap";
import { Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { sortBy } from "lodash-es";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/accommodation/Accom... Remove this comment to see the full error message
import { AccommodationFormFields } from "components/accommodation/AccommodationFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormSele... Remove this comment to see the full error message
import FormSelect from "components/atoms/form/FormSelect";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/api/hostsHooks' or its c... Remove this comment to see the full error message
import { useGetHosts } from "hooks/api/hostsHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";

const AccommodationFormHost = () => {
    const { t } = useTranslation(["accommodation"]);
    const { setFieldValue, values } = useFormikContext();
    const { hosts, hostsGetInProgress, hostsGetError, retrieveHosts } = useGetHosts();

    const fieldId = AccommodationFormFields.HOST_ID;

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const hostId = values[fieldId];
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
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
                isPleaseSelect={!hostId}
                disabled={hostsGetInProgress || hostsGetError}
            />
        </FormGroup>
    );
};

AccommodationFormHost.propTypes = {};

export default AccommodationFormHost;
