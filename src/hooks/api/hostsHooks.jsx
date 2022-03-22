import useAxios from "axios-hooks";
import {
    getAuthenticationHeaders,
    getErrorsFromApi,
    getPath,
} from "services/Api/utils";
import { ApiPaths } from "services/Api/constants";
import { plainToClass } from "serializers/Serializer";
import Host from "models/Host";

const useGetHosts = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET", headers: getAuthenticationHeaders() },
        { manual: true, autoCancel: false }
    );

    const hosts = data;
    const hostsGetInProgress = loading;
    const hostsGetError = getErrorsFromApi(error);

    const retrieveHosts = () => {
        const url = getPath(ApiPaths.HOST);
        const transformResponse = (data) => {
            const parsed = JSON.parse(data);
            return Array.isArray(parsed)
                ? parsed.map((item) => plainToClass(Host, item))
                : [];
        };
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
