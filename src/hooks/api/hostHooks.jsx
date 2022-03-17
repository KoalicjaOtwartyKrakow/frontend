import useAxios from "axios-hooks";
import { getAuthenticationHeaders, getErrorsFromApi, getPath } from "services/Api/utils";
import { Paths } from "services/Api/constants";
import { classToPlain, plainToClass } from "serializers/Serializer";
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
        const url = getPath(Paths.HOST);
        const transformResponse = (data) => {
            return data && plainToClass(Host, data);
        };
        const data = classToPlain(host);
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
        const url = getPath(Paths.HOST) + "/" + hostId;
        const transformResponse = (data) => plainToClass(Host, data);
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
        const url = getPath(Paths.HOST) + "/" + host.id;
        const transformResponse = (data) => {
            return data && plainToClass(Host, data);
        };
        const data = classToPlain(host);
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
