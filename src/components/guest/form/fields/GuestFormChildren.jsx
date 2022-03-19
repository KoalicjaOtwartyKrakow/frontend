import React from "react";
import { Button, FormGroup, InputGroup, InputGroupText } from "reactstrap";
import { Field, FieldArray, useField } from "formik";
import { useTranslation } from "react-i18next";
import { GuestFormFields } from "components/guest/GuestFormFields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/pro-regular-svg-icons";
import FormInputNoFeedback from "components/atoms/form/FormInputNoFeedback";
import Feedback from "components/atoms/form/Feedback";

const GuestFormChildren = () => {
    const { t } = useTranslation(["guest"]);
    const [field] = useField(GuestFormFields.CHILDREN);
    const fieldId = field.name;

    const childRenderer = (arrayHelpers) => {
        const items = field.value;
        const addChild = () => arrayHelpers.push(Number());
        const insertChild = (index) => () =>
            arrayHelpers.insert(index, Number());
        const removeChild = (index) => () => arrayHelpers.remove(index);

        console.log(items);

        return (
            <>
                {items?.length > 0 ? (
                    items.map((child, index) => {
                        const id = `${fieldId}[${index}]`;
                        return (
                            <FormGroup key={index}>
                                <InputGroup>
                                    <InputGroupText>
                                        {t("guest:form.label.childAge")}
                                    </InputGroupText>
                                    <Field
                                        component={FormInputNoFeedback}
                                        id={id}
                                        name={id}
                                        placeholder="1"
                                        value={child}
                                        type="number"
                                    />
                                    <Button
                                        color="secondary"
                                        outline
                                        onClick={removeChild(index)}
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                    <Button
                                        color="secondary"
                                        outline
                                        onClick={insertChild(index + 1)}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </InputGroup>
                                <Feedback name={id} />
                            </FormGroup>
                        );
                    })
                ) : (
                    <Button color="primary" outline onClick={addChild}>
                        {t("guest:form.label.addChild")}
                    </Button>
                )}
            </>
        );
    };

    return (
        <FormGroup>
            <FieldArray name={fieldId} render={childRenderer} />
        </FormGroup>
    );
};

export default GuestFormChildren;
