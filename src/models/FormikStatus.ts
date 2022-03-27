interface NonFieldErrors {
    nonFieldErrors?: string[];
}

type FieldErrorList = {
    [key: string]: string[];
};

interface FieldErrors {
    fieldErrors?: FieldErrorList;
}

interface FormikStatus extends NonFieldErrors, FieldErrors {}

export type { FieldErrors, NonFieldErrors, FieldErrorList, FormikStatus };
