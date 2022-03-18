import { TaJson } from "ta-json";
import camelcaseKeys from "camelcase-keys";
import snakeCaseKeys from "snakecase-keys";
import { cloneDeep } from "lodash-es";

const IMMUTABLE_FIELDS = [
    "id",
    "guid",
    "createdAt",
    "updatedAt",
    "guests",
    "apartments",
    "host",
    "accommodation",
]

const plainToClass = function (className, plain, convertCase = false) {
    const camelCasePlain = convertCase ? camelcaseKeys(plain) : plain;
    return TaJson.deserialize(camelCasePlain, className);
};

const classToPlain = function (object, convertCase = false) {
    const camelCasePlain = TaJson.serialize(object);
    return convertCase ? snakeCaseKeys(camelCasePlain) : camelCasePlain;
};

const filterImmutableFields = function (object) {
    const filtered = cloneDeep(object);

    IMMUTABLE_FIELDS.forEach(field => {
        delete filtered[field];
    });

    return filtered;
}

export { classToPlain, filterImmutableFields, plainToClass };
