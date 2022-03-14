import useAxios from "axios-hooks";
import { getErrorsFromApi, getPath } from "services/Api/utils";
import { Paths } from "services/Api/constants";
import { plainToClass } from "serializers/Serializer";
import Host from "models/Host";

const useGetHosts = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET" },
        { manual: true }
    );

    const hosts = data;
    const hostsGetInProgress = loading;
    const hostsGetError = error;

    const retrieveHosts = () => {
        const url = getPath(Paths.HOST);
        const transformResponse = (data) =>
            data.map((item) => plainToClass(Host, item));
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error(
                    "[useGetHosts] Error on retrieveHosts(): ",
                    error
                );
                return getErrorsFromApi(error);
            }
        };

        return fetchData();
    };

    return {
        hosts,
        hostsGetInProgress,
        hostsGetError,
        retrieveHosts,
    };
};

export { useGetHosts };