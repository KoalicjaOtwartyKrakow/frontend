import useAxios from "axios-hooks";

import { getErrorsFromApi, getPath, transformArrayResponse } from "services/Api/utils";

import { ApiPaths } from "services/Api/constants";

import Host from "models/Host";

const useGetHosts = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "GET" });

    const hosts = data;
    const hostsGetInProgress = loading;
    const hostsGetError = getErrorsFromApi(error);

    const retrieveHosts = () => {
        const url = getPath(ApiPaths.HOST);
        const transformResponse = transformArrayResponse(Host);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetHosts] Error on retrieveHosts(): ", error);
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
