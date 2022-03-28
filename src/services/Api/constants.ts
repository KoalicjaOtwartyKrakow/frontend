export const baseURL = process.env.REACT_APP_KOKON_API_URL;
export const timeout = Number(process.env.REACT_APP_KOKON_API_TIMEOUT);

export class ApiPaths {
    static ACCOMMODATION = "/accommodation";
    static ACCOMMODATION_BY_ID = ApiPaths.ACCOMMODATION + "/:accommodationId";
    static GUEST = "/guest";
    static GUEST_BY_ID = ApiPaths.GUEST + "/:guestId";
    static HOST = "/host";
    static HOST_BY_ID = ApiPaths.HOST + "/:hostId";
    static USER = "/user";
    static USER_BY_ID = ApiPaths.USER + "/:userId";
}

interface UserByIdParams {
    userId: string;
}

interface HostByIdParams {
    hostId: string;
}

interface GuestByIdParams {
    guestId: string;
}

interface AccommodationByIdParams {
    accommodationId: string;
}

export type { AccommodationByIdParams, UserByIdParams, HostByIdParams, GuestByIdParams };
