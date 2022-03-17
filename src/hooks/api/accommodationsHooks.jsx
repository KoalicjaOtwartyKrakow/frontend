import useAxios from "axios-hooks";
import { getAuthenticationHeaders, getErrorsFromApi, getPath } from "services/Api/utils";
import { Paths } from "services/Api/constants";
import { plainToClass } from "serializers/Serializer";
import Accommodation from "models/Accommodation";

const useGetAccommodations = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET", headers: getAuthenticationHeaders() },
        { manual: true, autoCancel: false }
    );

    const accommodations = data;
    const accommodationsGetInProgress = loading;
    const accommodationsGetError = getErrorsFromApi(error);

    const retrieveAccommodations = () => {
        const url = getPath(Paths.ACCOMMODATION);
        const transformResponse = (data) => {
            const parsed = JSON.parse(data);
            return parsed.map((item) => plainToClass(Accommodation, item));
        }
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error(
                    "[useGetAccommodations] Error on retrieveAccommodations(): ",
                    error
                );
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
