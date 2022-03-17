import useAxios from "axios-hooks";
import { getAuthenticationHeaders, getErrorsFromApi, getPath } from "services/Api/utils";
import { Paths } from "services/Api/constants";
import { classToPlain, plainToClass } from "serializers/Serializer";
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
        const url = getPath(Paths.GUEST) + "/" + guestId;
        const transformResponse = (data) => {
            const parsed = JSON.parse(data);
            plainToClass(Guest, parsed);
        }
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error(
                    "[useGetGuest] Error on retrieveGuest(): ",
                    error
                );
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
        const url = getPath(Paths.GUEST) + "/" + guest.id;
        const transformResponse = (data) => {
            const parsed = JSON.parse(data);
            return parsed && plainToClass(Guest, parsed);
        };
        const data = classToPlain(guest);
        const config = { data, url, transformResponse };

        const updateData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error(
                    "[useUpdateGuest] Error on updateGuest(): ",
                    error
                );
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
        const url = getPath(Paths.GUEST);
        const transformResponse = (data) => {
            const parsed = JSON.parse(data)
            return parsed && plainToClass(Guest, parsed);
        };
        const data = classToPlain(guest);
        const config = { data, url, transformResponse };

        const createData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error(
                    "[useCreateGuest] Error on createGuest(): ",
                    error
                );
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
