import useAxios from "axios-hooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/utils' or its cor... Remove this comment to see the full error message
import { getErrorsFromApi, getPath, transformObjectResponse } from "services/Api/utils";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/constants' or its... Remove this comment to see the full error message
import { ApiPaths } from "services/Api/constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'serializers/Serializer' or its... Remove this comment to see the full error message
import { classToPlain, filterImmutableFields } from "serializers/Serializer";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Accommodation' or its c... Remove this comment to see the full error message
import Accommodation from "models/Accommodation";

const useCreateAccommodation = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "POST" });

    const createdAccommodation = data;
    const accommodationCreateInProgress = loading;
    const accommodationCreateError = getErrorsFromApi(error);

    /**
     *
     * @param {Accommodation} accommodation
     * @returns {Promise<*|undefined>}
     */
    const createAccommodation = ({ accommodation }: any) => {
        const url = getPath(ApiPaths.ACCOMMODATION);
        const transformResponse = transformObjectResponse(Accommodation);
        const data = filterImmutableFields(classToPlain(accommodation));
        const config = { data, url, transformResponse };

        const createData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useCreateAccommodation] Error on createAccommodation(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return createData();
    };

    return {
        createdAccommodation,
        accommodationCreateInProgress,
        accommodationCreateError,
        createAccommodation,
    };
};

const useGetAccommodation = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "GET" });

    const accommodation = data;
    const accommodationGetInProgress = loading;
    const accommodationGetError = getErrorsFromApi(error);

    const fetchAccommodation = ({ accommodationId }: any) => {
        const url = getPath(ApiPaths.ACCOMMODATION_BY_ID, {
            accommodationId,
        });
        const transformResponse = transformObjectResponse(Accommodation);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetAccommodation] Error on retrieveAccommodation(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return fetchData();
    };

    return {
        accommodation,
        accommodationGetInProgress,
        accommodationGetError,
        retrieveAccommodation: fetchAccommodation,
    };
};

const useUpdateAccommodation = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "PUT" });

    const updatedAccommodation = data;
    const accommodationUpdateInProgress = loading;
    const accommodationUpdateError = getErrorsFromApi(error);

    /**
     *
     * @param {Accommodation} accommodation
     * @returns {Promise<*|undefined>}
     */
    const updateAccommodation = ({ accommodation }: any) => {
        const url = getPath(ApiPaths.ACCOMMODATION_BY_ID, {
            accommodationId: accommodation.id,
        });
        const transformResponse = transformObjectResponse(Accommodation);
        const data = filterImmutableFields(classToPlain(accommodation));
        const config = { data, url, transformResponse };

        const updateData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetAccommodation] Error on updateAccommodation(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return updateData();
    };

    return {
        updatedAccommodation,
        accommodationUpdateInProgress,
        accommodationUpdateError,
        updateAccommodation,
    };
};

const useAddGuestToAccommodation = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "POST" });

    const accommodationAddGuest = data;
    const accommodationAddGuestInProgress = loading;
    const accommodationAddGuestsUpdateError = getErrorsFromApi(error);

    /**
     *
     * @param {Accommodation} accommodation
     * @param {Guest} guest
     * @returns {Promise<{errors: Object, status: ApiErrorStatus}|undefined>}
     */
    const addGuestToAccommodation = ({ accommodation, guest }: any) => {
        const url = getPath(ApiPaths.ACCOMMODATION_BY_ID_ADD_GUEST, {
            accommodationId: accommodation.id,
            guestId: guest.id,
        });

        const transformResponse = transformObjectResponse(Accommodation);

        const config = { url, transformResponse };

        const updateData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useAddGuestToAccommodation] Error on addGuestToAccommodation(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return updateData();
    };

    return {
        accommodationAddGuest,
        accommodationAddGuestInProgress,
        accommodationAddGuestsUpdateError,
        addGuestToAccommodation,
    };
};

export { useCreateAccommodation, useGetAccommodation, useUpdateAccommodation, useAddGuestToAccommodation };
