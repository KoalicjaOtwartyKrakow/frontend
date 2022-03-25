import React, { useCallback, useEffect } from "react";
import { FormGroup, FormText } from "reactstrap";
import { Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { sortBy } from "lodash-es";

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/guest/GuestFormFiel... Remove this comment to see the full error message
import { GuestFormFields } from "components/guest/GuestFormFields";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormSele... Remove this comment to see the full error message
import FormSelect from "components/atoms/form/FormSelect";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'hooks/api/usersHooks' or its c... Remove this comment to see the full error message
import { useGetUsers } from "hooks/api/usersHooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/atoms/form/FormLabe... Remove this comment to see the full error message
import FormLabel from "components/atoms/form/FormLabel";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/utils' or its cor... Remove this comment to see the full error message
import { emptyArray } from "services/Api/utils";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'shared/datetime' or its corres... Remove this comment to see the full error message
import { getFormattedDateTime } from "shared/datetime";

const GuestFormVolunteerAssignment = () => {
    const { t } = useTranslation(["common", "guest"]);
    const { setFieldValue, values } = useFormikContext();
    const { users, usersGetInProgress, usersGetError, retrieveUsers } = useGetUsers();

    const fieldId = GuestFormFields.CLAIMED_BY_USER_ID;

    const getRetrievedUsers = useCallback(() => {
        return users?.length ? sortBy(users, ["fullName"]) : emptyArray;
    }, [users]);

    const retrievedUsers = getRetrievedUsers();
    const shouldFetchUsers = !users && !usersGetError && !usersGetInProgress;

    useEffect(() => {
        if (shouldFetchUsers) {
            retrieveUsers();
        }
    }, [retrieveUsers, shouldFetchUsers]);

    const getFormSelectItems = useCallback(() => {
        /**
         *
         * @param {User} volunteer
         * @returns {{name: string, id: string}}
         */
        const mapUserToItem = (volunteer: any) => ({
            id: volunteer.id,
            name: `${volunteer.fullName}`,
        });

        if (!retrievedUsers.length) {
            return emptyArray;
        }

        const result = retrievedUsers.map(mapUserToItem);

        result.unshift({
            id: undefined,
            name: t("common:form.pleaseSelect"),
        });

        return result;
    }, [retrievedUsers, t]);

    const items = getFormSelectItems();

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const claimedAt = getFormattedDateTime(values[GuestFormFields.CLAIMED_AT]);
    const claimedAtText = claimedAt ? `${t("guest:form.text.claimedAt")}: ${claimedAt}` : " ";

    return (
        <FormGroup>
            <FormLabel for={fieldId}>{t("guest:form.label.volunteerName")}</FormLabel>
            <Field
                component={FormSelect}
                id={fieldId}
                name={fieldId}
                items={items}
                disabled={usersGetInProgress || usersGetError || !retrievedUsers.length}
            />
            <FormText>{claimedAtText}</FormText>
        </FormGroup>
    );
};

GuestFormVolunteerAssignment.propTypes = {};

export default GuestFormVolunteerAssignment;
