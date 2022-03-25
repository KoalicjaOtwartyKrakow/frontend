import { TaJson } from "ta-json";
import camelcaseKeys from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
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

const plainToClass = function (className: any, plain: any, convertCase = false) {
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
