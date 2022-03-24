import useAxios from "axios-hooks";
import { getErrorsFromApi, getPath, transformArrayResponse } from "services/Api/utils";
import { ApiPaths } from "services/Api/constants";
import Guest from "models/Guest";

const useGetGuests = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "GET" });

    const guests = data;
    const guestsGetInProgress = loading;
    const guestsGetError = getErrorsFromApi(error);

    const retrieveGuests = () => {
        const url = getPath(ApiPaths.GUEST);
        const transformResponse = transformArrayResponse(Guest);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetGuests] Error on retrieveGuests(): ", error);
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
