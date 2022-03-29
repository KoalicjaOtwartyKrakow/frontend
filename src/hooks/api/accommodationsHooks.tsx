import useAxios from "axios-hooks";
import { getErrorsFromApi, getPath, transformArrayResponse } from "services/Api/utils";
import { ApiPaths } from "services/Api/constants";
import Accommodation from "models/Accommodation";

const useGetAccommodations = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "GET" });

    const accommodations = data;
    const accommodationsGetInProgress = loading;
    const accommodationsGetError = getErrorsFromApi(error);

    const retrieveAccommodations = () => {
        const url = getPath(ApiPaths.ACCOMMODATION);
        const transformResponse = transformArrayResponse(Accommodation);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetAccommodations] Error on retrieveAccommodations(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return fetchData();
    };

    return {
        accommodations,
        accommodationsGetInProgress,
        accommodationsGetError,
        retrieveAccommodations,
    };
};

export { useGetAccommodations };
