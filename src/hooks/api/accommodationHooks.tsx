import useAxios from "axios-hooks";

import { getErrorsFromApi, getPath, transformObjectResponse } from "services/Api/utils";

import { ApiPaths } from "services/Api/constants";

import { classToPlain, filterImmutableFields } from "serializers/Serializer";

import Accommodation from "models/Accommodation";
import { ApiErrors } from "services/Api/types";

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
            } catch (error: unknown) {
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
    const accommodationUpdateError: ApiErrors = getErrorsFromApi(error);

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

export { useCreateAccommodation, useGetAccommodation, useUpdateAccommodation };
