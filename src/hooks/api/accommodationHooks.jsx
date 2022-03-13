import useAxios from "axios-hooks";
import { getPath } from "services/Api/utils";
import { Paths } from "services/Api/constants";
import { plainToClass } from "serializers/Serializer";
import Accommodation from "models/Accommodation";

const useGetAccommodation = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET" },
        { manual: true }
    );

    const accommodation = data;
    const accommodationGetInProgress = loading;
    const accommodationGetError = error;

    const fetchAccommodation = ({ accommodationId }) => {
        const url = getPath(Paths.ACCOMMODATION) + "/" + accommodationId;
        const transformResponse = (data) => plainToClass(Accommodation, data);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error(
                    "[useGetAccommodation] Error on fetchAccommodation(): ",
                    error
                );
                return error;
            }
        };

        return fetchData();
    };

    return {
        accommodation,
        accommodationGetInProgress,
        accommodationGetError,
        fetchAccommodation,
    };
};

export { useGetAccommodation };
