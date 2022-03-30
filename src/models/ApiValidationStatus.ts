interface ApiValidationNonFieldErrors {
    nonFieldErrors?: string[];
}

type FieldErrorList = {
    [key: string]: string[];
};

interface ApiValidationFieldErrors {
    validationErrors?: FieldErrorList;
}

type ApiFieldErrors = string[];

interface ApiValidationErrorFieldTypes extends ApiValidationNonFieldErrors, ApiValidationFieldErrors {}

interface ApiValidationStatus {
    errors: ApiValidationErrorFieldTypes;
}

export type { ApiValidationStatus, ApiValidationErrorFieldTypes, ApiFieldErrors };
