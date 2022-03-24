import React, { useCallback, useEffect } from "react";
import { FormGroup, FormText } from "reactstrap";
import { Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { sortBy } from "lodash-es";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormSelect from "components/atoms/form/FormSelect";
import { useGetUsers } from "hooks/api/usersHooks";
import FormLabel from "components/atoms/form/FormLabel";
import { emptyArray } from "services/Api/utils";
import { getFormattedDateTime } from "shared/datetime";

const GuestFormVolunteerAssignment = () => {
    const { t } = useTranslation(["common", "guest"]);
    const { setFieldValue, values } = useFormikContext();
    const { users, usersGetInProgress, usersGetError, retrieveUsers } = useGetUsers();

    const fieldId = GuestFormFields.CLAIMED_BY_USER_ID;
    /**
     * @type {User}
     */
    const selectedUserId = values[GuestFormFields.CLAIMED_BY_USER_ID];

    const getRetrievedUsers = useCallback(() => {
        return users?.length ? sortBy(users, ["fullName"]) : emptyArray;
    }, [users]);

    const retrievedUsers = getRetrievedUsers();
    const shouldFetchUsers = !users && !usersGetError && !usersGetInProgress;

    const getRetrievedUserById = (id) => retrievedUsers.find((retrievedUser) => retrievedUser.id === id);

    const handleChangeValue = React.useCallback(
        (selectedUserId) => {
            const retrievedUser = getRetrievedUserById(selectedUserId);
            setFieldValue(GuestFormFields.CLAIMED_BY, retrievedUser);
        },
        [setFieldValue, selectedUserId]
    );

    useEffect(() => {
        if (shouldFetchUsers) {
            retrieveUsers();
        }
    }, [retrieveUsers, shouldFetchUsers]);

    useEffect(() => {
        if (retrievedUsers.length === 0 || !selectedUserId) {
            return;
        }

        // handleChangeValue(selectedUserId);
    }, [selectedUserId, handleChangeValue, retrievedUsers]);

    const getFormSelectItems = useCallback(() => {
        /**
         *
         * @param {User} volunteer
         * @returns {{name: string, id: string}}
         */
        const mapUserToItem = (volunteer) => ({
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
    }, [retrievedUsers]);

    const items = getFormSelectItems();

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
