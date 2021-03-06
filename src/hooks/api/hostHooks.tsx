import useAxios from "axios-hooks";
import { getErrorsFromApi, getPath, transformObjectResponse } from "services/Api/utils";
import { ApiPaths } from "services/Api/constants";
import { classToPlain, filterImmutableFields } from "serializers/Serializer";
import Host from "models/Host";

const useCreateHost = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "POST" });

    const createdHost = data;
    const hostCreateInProgress = loading;
    const hostCreateError = getErrorsFromApi(error);

    /**
     *
     * @param {Host} host
     * @returns {Promise<*|undefined>}
     */
    const createHost = ({ host }: any) => {
        const url = getPath(ApiPaths.HOST);
        const transformResponse = transformObjectResponse(Host);
        const data = filterImmutableFields(classToPlain(host));
        const config = { data, url, transformResponse };

        const createData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useCreateHost] Error on createHost(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return createData();
    };

    return {
        createdHost,
        hostCreateInProgress,
        hostCreateError,
        createHost,
    };
};

const useGetHost = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "GET" });

    const host = data;
    const hostGetInProgress = loading;
    const hostGetError = getErrorsFromApi(error);

    const fetchHost = ({ hostId }: any) => {
        const url = getPath(ApiPaths.HOST) + "/" + hostId;
        const transformResponse = transformObjectResponse(Host);
        const config = { url, transformResponse };

        const fetchData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetHost] Error on retrieveHost(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return fetchData();
    };

    return {
        host,
        hostGetInProgress,
        hostGetError,
        retrieveHost: fetchHost,
    };
};

const useUpdateHost = () => {
    const [{ data, loading, error }, fetch] = useAxios({ method: "PUT" });

    const updatedHost = data;
    const hostUpdateInProgress = loading;
    const hostUpdateError = getErrorsFromApi(error);

    /**
     *
     * @param {Host} host
     * @returns {Promise<*|undefined>}
     */
    const updateHost = ({ host }: any) => {
        const url = getPath(ApiPaths.HOST) + "/" + host.id;
        const transformResponse = transformObjectResponse(Host);
        const data = filterImmutableFields(classToPlain(host));
        const config = { data, url, transformResponse };

        const updateData = async () => {
            try {
                await fetch(config);
            } catch (error) {
                console.error("[useGetHost] Error on updateHost(): ", error);
                return getErrorsFromApi(error);
            }
        };

        return updateData();
    };

    return {
        updatedHost,
        hostUpdateInProgress,
        hostUpdateError,
        updateHost,
    };
};

export { useCreateHost, useGetHost, useUpdateHost };
