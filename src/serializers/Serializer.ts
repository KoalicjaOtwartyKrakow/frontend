import { TaJson } from "ta-json";
import camelcaseKeys from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";

import { cloneDeep, omit } from "lodash-es";

const IMMUTABLE_FIELDS = [
    "uuid", // Used in frontend only
    "guid",
    "createdAt",
    "updatedAt",
    "guests",
    "apartments",
    "host",
    "accommodationUnit",
];

const plainToClass = function (className: any, plain: any, convertCase = false): typeof className {
    const camelCasePlain = convertCase ? camelcaseKeys(plain) : plain;
    return TaJson.deserialize(camelCasePlain, className);
};

const classToPlain = function (object: any, convertCase = false) {
    const camelCasePlain = TaJson.serialize(object);
    return convertCase ? snakeCaseKeys(camelCasePlain) : camelCasePlain;
};

const filterImmutableFields = function (object: any) {
    const copy = cloneDeep(object);
    const filtered = omit(copy, IMMUTABLE_FIELDS);
    return filtered;
};

export { classToPlain, filterImmutableFields, plainToClass };
