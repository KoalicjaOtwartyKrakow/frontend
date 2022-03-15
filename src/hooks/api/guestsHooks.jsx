import useAxios from "axios-hooks";
import { getErrorsFromApi, getPath } from "services/Api/utils";
import { Paths } from "services/Api/constants";
import { plainToClass } from "serializers/Serializer";
import Guest from "models/Guest";

const useGetGuests = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET" },
        { manual: true, autoCancel: false }
    );

    const guests = data;
    const guestsGetInProgress = loading;
    const guestsGetError = getErrorsFromApi(error);

    const retrieveGuests = () => {
        const url = getPath(Paths.GUEST);
        const transformResponse = (data) =>
            data.map((item) => plainToClass(Guest, item));
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
