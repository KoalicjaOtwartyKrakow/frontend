import useAxios from "axios-hooks";
import {
    getAuthenticationHeaders,
    getErrorsFromApi,
    getPath,
} from "services/Api/utils";
import { ApiPaths } from "services/Api/constants";
import { plainToClass } from "serializers/Serializer";
import Guest from "models/Guest";

const useGetGuests = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET", headers: getAuthenticationHeaders() },
        { manual: true, autoCancel: false }
    );

    const guests = data;
    const guestsGetInProgress = loading;
    const guestsGetError = getErrorsFromApi(error);

    const retrieveGuests = () => {
        const url = getPath(ApiPaths.GUEST);
        const transformResponse = (data) => {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed)
                ? parsed.map((item) => plainToClass(Guest, item))
                : [];
        };
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error(
                    "[useGetGuests] Error on retrieveGuests(): ",
                    error
                );
                return getErrorsFromApi(error);
            }
        };

        return fetchData();
    };

    return {
        guests,
        guestsGetInProgress,
        guestsGetError,
        retrieveGuests,
    };
};

export { useGetGuests };
