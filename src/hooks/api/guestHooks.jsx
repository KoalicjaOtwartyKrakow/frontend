import useAxios from "axios-hooks";
import { getErrorsFromApi, getPath, transformObjectResponse } from "services/Api/utils";
import { ApiPaths } from "services/Api/constants";
import { classToPlain, filterImmutableFields } from "serializers/Serializer";
import Guest from "models/Guest";

const useGetGuest = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "GET" });

    const guest = data;
    const guestGetInProgress = loading;
    const guestGetError = getErrorsFromApi(error);

    const fetchGuest = ({ guestId }) => {
        const url = getPath(ApiPaths.GUEST_BY_ID, { guestId });
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
    const [{ data, loading, error }, fetch] = useAxios({ method: "PUT" });

    const updatedGuest = data;
    const guestUpdateInProgress = loading;
    const guestUpdateError = getErrorsFromApi(error);

    /**
     *
     * @param {Guest} guest
     * @returns {Promise<*|undefined>}
     */
    const updateGuest = ({ guest }) => {
        if (!Guest.is(guest)) {
            throw new TypeError("[useUpdateGuest] Provided guest is not a Guest instance");
        }

        const guestId = guest?.id;

        if (!guestId) {
            throw new TypeError("[useUpdateGuest] Provided guest has no id!");
        }

        const url = getPath(ApiPaths.GUEST_BY_ID, { guestId });

        const transformResponse = transformObjectResponse(Guest);
        const plain = classToPlain(guest);
        const data = filterImmutableFields(plain);

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
    const [{ data, loading, error }, fetch] = useAxios({ method: "POST" });

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
