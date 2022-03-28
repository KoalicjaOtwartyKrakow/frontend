import User from "models/User";

import { chance } from "mocks/base";

import { ApiPaths, UserByIdParams } from "services/Api/constants";

import { classToPlain, plainToClass } from "serializers/Serializer";
import { match, MatchResult, pathToRegexp } from "path-to-regexp";

const mockUser = () => {
    const user = new User();
    user.id = chance.guid({ version: 4 });
    user.givenName = chance.first({ nationality: "it" });
    user.familyName = chance.last({ nationality: "it" });
    user.email = chance.email();
    user.phoneNumber = chance.phone();
    user.avatar = chance.avatar();
    return user;
};

const mockUserResponses = (mockAdapter: any, { mockedUsers }: any) => {
    mockAdapter.onGet(ApiPaths.USER).reply((config: any) => {
        const { url } = config;
        const plainUsers = mockedUsers.map((user: any) => classToPlain(user));

        console.log(`[useGetUser] Mocked response for ${url}: `, plainUsers);
        return [200, JSON.stringify(plainUsers)];
    });

    mockAdapter.onGet(pathToRegexp(ApiPaths.USER_BY_ID)).reply((config: any) => {
        const { url } = config;
        const matchedPath = match(ApiPaths.USER_BY_ID)(url) as MatchResult<UserByIdParams>;
        const {
            params: { userId },
        } = matchedPath;

        const user = mockedUsers.find((mock: any) => mock.id === userId);
        const plain = classToPlain(user);

        console.log(`[useGetUser] Mocked response for ${url}: `, user);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPut(pathToRegexp(ApiPaths.USER_BY_ID)).reply((config: any) => {
        const { url, data } = config;
        const matchedPath = match(ApiPaths.USER_BY_ID)(url) as MatchResult<UserByIdParams>;
        const {
            params: { userId },
        } = matchedPath;
        const json = JSON.parse(data);

        const updatedUser = plainToClass(User, json);
        updatedUser.id = userId;

        const userIndex = mockedUsers.findIndex((mock: any) => mock.id === userId);
        if (userIndex === -1) {
            throw Error("[useUpdateUser] Tried to PUT user, but user with such ID is not present in mocks");
        }

        mockedUsers[userIndex] = updatedUser;

        const plain = data;

        console.log(`[useUpdateUser] Mocked response for ${url}: `, updatedUser);
        return [200, JSON.stringify(plain)];
    });

    mockAdapter.onPost(pathToRegexp(ApiPaths.USER)).reply((config: any) => {
        const { url, data } = config;
        const json = JSON.parse(data);
        const createdUser: User = plainToClass(User, json);
        createdUser.id = chance.guid({ version: 4 });

        mockedUsers.unshift(createdUser);

        const plain = classToPlain(createdUser);

        console.log(`[useUpdateUser] Mocked response for ${url}: `, createdUser);

        return [200, JSON.stringify(plain)];
    });
};

export { mockUser, mockUserResponses };
