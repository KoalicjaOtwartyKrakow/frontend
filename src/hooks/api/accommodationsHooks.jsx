import useAxios from "axios-hooks";
import { getErrorsFromApi, getPath } from "services/Api/utils";
import { Paths } from "services/Api/constants";
import { plainToClass } from "serializers/Serializer";
import Accommodation from "models/Accommodation";

const useGetAccommodations = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET" },
        { manual: true }
    );

    const accommodations = data;
    const accommodationsGetInProgress = loading;
    const accommodationsGetError = error;

    const retrieveAccommodations = () => {
        const url = getPath(Paths.ACCOMMODATIONS);
        const transformResponse = (data) =>
            data.map((item) => plainToClass(Accommodation, item));
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
