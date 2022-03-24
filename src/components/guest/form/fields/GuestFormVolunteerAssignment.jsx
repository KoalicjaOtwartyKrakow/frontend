import React, { useCallback, useEffect } from "react";
import { FormGroup } from "reactstrap";
import { Field, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { sortBy } from "lodash-es";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormSelect from "components/atoms/form/FormSelect";
import { useGetUsers } from "hooks/api/usersHooks";
import FormLabel from "components/atoms/form/FormLabel";
import { emptyArray } from "services/Api/utils";

const GuestFormVolunteerAssignment = () => {
    const { t } = useTranslation(["guest"]);
    const { setFieldValue, values } = useFormikContext();
    const { users, usersGetInProgress, usersGetError, retrieveUsers } = useGetUsers();

    const fieldId = GuestFormFields.CLAIMED_BY_USER_ID;

    const userId = values[fieldId];
    const user = values[GuestFormFields.CLAIMED_BY];

    const getRetrievedUsers = useCallback(() => {
        return users || emptyArray;
    }, [users]);

    const retrievedUsers = getRetrievedUsers();
    const shouldFetchUsers = !users && !usersGetError && !usersGetInProgress;

    const handleChangeValue = React.useCallback((value) => setFieldValue(GuestFormFields.USER, value), [setFieldValue]);

    useEffect(() => {
        if (shouldFetchUsers) {
            retrieveUsers();
        }
    }, [retrieveUsers, shouldFetchUsers]);

    useEffect(() => {
        if (retrievedUsers.length === 0 || !userId) {
            return;
        }

        const retrievedUser = retrievedUsers.find((item) => item.id === userId);

        if (retrievedUser.id !== user?.id) {
            handleChangeValue(retrievedUser);
        }
    }, [userId, user, handleChangeValue, retrievedUsers]);

    /**
     *
     * @param {User} volunteer
     * @returns {{name: string, id: string}}
     */
    const mapVolunteerToItem = (volunteer) => ({
        id: volunteer.id,
        name: `${volunteer.fullName}`,
    });

    const items = retrievedUsers.map(mapVolunteerToItem);
    const sortedItems = sortBy(items, ["name"]);

    console.log("* [render]");

    return (
        <FormGroup>
            <FormLabel for={fieldId} className="required">
                {t("guest:form.label.volunteerName")}
            </FormLabel>
            <Field
                component={FormSelect}
                id={fieldId}
                name={fieldId}
                items={sortedItems}
                isPleaseSelect={!userId}
                disabled={usersGetInProgress || usersGetError}
            />
        </FormGroup>
    );
};

GuestFormVolunteerAssignment.propTypes = {};

export default GuestFormVolunteerAssignment;
