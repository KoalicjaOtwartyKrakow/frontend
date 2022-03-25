import useAxios from "axios-hooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/utils' or its cor... Remove this comment to see the full error message
import { getErrorsFromApi, getPath, transformArrayResponse } from "services/Api/utils";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'services/Api/constants' or its... Remove this comment to see the full error message
import { ApiPaths } from "services/Api/constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'models/Host' or its correspond... Remove this comment to see the full error message
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
