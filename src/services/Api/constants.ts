import { camelCase } from "lodash";

export const baseURL = process.env.REACT_APP_KOKON_API_URL;
export const timeout = Number(process.env.REACT_APP_KOKON_API_TIMEOUT);

export class ApiPaths {
    static ACCOMMODATION = "/accommodation";
    static ACCOMMODATION_BY_ID = ApiPaths.ACCOMMODATION + "/:accommodationId";
    static ACCOMMODATION_BY_ID_ADD_GUEST = ApiPaths.ACCOMMODATION_BY_ID + "/guest/:guestId";
    static GUEST = "/guest";
    static GUEST_BY_ID = ApiPaths.GUEST + "/:guestId";
    static HOST = "/host";
    static HOST_BY_ID = ApiPaths.HOST + "/:hostId";
    static USER = "/user";
    static USER_BY_ID = ApiPaths.USER + "/:userId";
}
