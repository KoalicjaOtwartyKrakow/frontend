import useAxios from "axios-hooks";
import { getAuthenticationHeaders, getErrorsFromApi, getPath, transformObjectResponse } from "services/Api/utils";
import { ApiPaths } from "services/Api/constants";
import { classToPlain, filterImmutableFields, plainToClass } from "serializers/Serializer";
import Guest from "models/Guest";

const useGetGuest = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET", headers: getAuthenticationHeaders() },
        { manual: true, autoCancel: false }
    );

    const guest = data;
    const guestGetInProgress = loading;
    const guestGetError = getErrorsFromApi(error);

    const fetchGuest = ({ guestId }) => {
        const url = getPath(ApiPaths.GUEST) + "/" + guestId;
        const transformResponse = transformObjectResponse(Guest);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetGuest] Error on retrieveGuest(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return fetchData();
    };

    return {
        guest,
        guestGetInProgress,
        guestGetError,
        retrieveGuest: fetchGuest,
    };
};

const useUpdateGuest = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "PUT", headers: getAuthenticationHeaders() },
        { manual: true, autoCancel: false }
    );

    const updatedGuest = data;
    const guestUpdateInProgress = loading;
    const guestUpdateError = getErrorsFromApi(error);

    /**
     *
     * @param {Guest} guest
     * @returns {Promise<*|undefined>}
     */
    const updateGuest = ({ guest }) => {
        const url = getPath(ApiPaths.GUEST) + "/" + guest.id;
        const transformResponse = transformObjectResponse(Guest);
        const data = filterImmutableFields(classToPlain(guest));

        // This whole stuff is dirty AF
        data.accommodationUnitId = data.accommodationUnitId ?? null;

        const config = {
            data,
            url,
            transformResponse,
        };

        const updateData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useUpdateGuest] Error on updateGuest(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return updateData();
    };

    return {
        updatedGuest,
        guestUpdateInProgress,
        guestUpdateError,
        updateGuest,
    };
};

const useCreateGuest = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "POST", headers: getAuthenticationHeaders() },
        { manual: true, autoCancel: false }
    );

    const createdGuest = data;
    const guestCreateInProgress = loading;
    const guestCreateError = getErrorsFromApi(error);

    /**
     *
     * @param {Guest} guest
     * @returns {Promise<*|undefined>}
     */
    const createGuest = ({ guest }) => {
        const url = getPath(ApiPaths.GUEST);
        const transformResponse = transformObjectResponse(Guest);
        const data = filterImmutableFields(classToPlain(guest));
        const config = { data, url, transformResponse };

        const createData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useCreateGuest] Error on createGuest(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return createData();
    };

    return {
        createdGuest,
        guestCreateInProgress,
        guestCreateError,
        createGuest,
    };
};

export { useCreateGuest, useGetGuest, useUpdateGuest };
