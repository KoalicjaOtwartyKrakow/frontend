import useAxios from "axios-hooks";
import { getErrorsFromApi, getPath } from "services/Api/utils";
import { Paths } from "services/Api/constants";
import { classToPlain, plainToClass } from "serializers/Serializer";
import Guest from "models/Guest";

const useGetGuest = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET" },
        { manual: true, autoCancel: false }
    );

    const guest = data;
    const guestGetInProgress = loading;
    const guestGetError = getErrorsFromApi(error);

    const fetchGuest = ({ guestId }) => {
        const url = getPath(Paths.GUEST) + "/" + guestId;
        const transformResponse = (data) => plainToClass(Guest, data);
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
        { method: "PUT" },
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
            return data && plainToClass(Guest, data);
        };
        const data = classToPlain(guest);
        const config = { data, url, transformResponse };

        const updateData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetGuest] Error on updateGuest(): ", error);
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

export { useGetGuest, useUpdateGuest };
