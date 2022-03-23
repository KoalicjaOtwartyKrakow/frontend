import useAxios from "axios-hooks";
import { getAuthenticationHeaders, getErrorsFromApi, getPath, transformArrayResponse } from "services/Api/utils";
import { ApiPaths } from "services/Api/constants";
import { classToPlain, filterImmutableFields } from "serializers/Serializer";
import Host from "models/Host";

const useCreateHost = () => {
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "POST", headers: getAuthenticationHeaders() },
        { manual: true, autoCancel: false }
    );

    const createdHost = data;
    const hostCreateInProgress = loading;
    const hostCreateError = getErrorsFromApi(error);

    /**
     *
     * @param {Host} host
     * @returns {Promise<*|undefined>}
     */
    const createHost = ({ host }) => {
        const url = getPath(ApiPaths.HOST);
        const transformResponse = transformArrayResponse(Host);
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
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "GET", headers: getAuthenticationHeaders() },
        { manual: true, autoCancel: false }
    );

    const host = data;
    const hostGetInProgress = loading;
    const hostGetError = getErrorsFromApi(error);

    const fetchHost = ({ hostId }) => {
        const url = getPath(ApiPaths.HOST) + "/" + hostId;
        const transformResponse = transformArrayResponse(Host);
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
    const [{ data, loading, error }, fetch] = useAxios(
        { method: "PUT", headers: getAuthenticationHeaders() },
        { manual: true, autoCancel: false }
    );

    const updatedHost = data;
    const hostUpdateInProgress = loading;
    const hostUpdateError = getErrorsFromApi(error);

    /**
     *
     * @param {Host} host
     * @returns {Promise<*|undefined>}
     */
    const updateHost = ({ host }) => {
        const url = getPath(ApiPaths.HOST) + "/" + host.id;
        const transformResponse = transformArrayResponse(Host);
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
