import React from "react";
import { Button, FormGroup, InputGroup, InputGroupText } from "reactstrap";
import { Field, FieldArray, useField } from "formik";
import { useTranslation } from "react-i18next";
import { GuestFormFields } from "components/guest/GuestFormFields";
import FormInput from "components/atoms/form/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/pro-regular-svg-icons";

const GuestFormChildren = (props) => {
    const { t } = useTranslation(["guest"]);
    const [field] = useField({ ...props, name: GuestFormFields.CHILDREN });
    const fieldId = field.name;

    const childRenderer = (arrayHelpers) => {
        const items = field.value;
        const addChild = () => arrayHelpers.push(Number());
        const insertChild = (index) => () =>
            arrayHelpers.insert(index, Number());
        const removeChild = (index) => () => arrayHelpers.remove(index);

        return (
            <>
                {items?.length > 0 ? (
                    items.map((child, index) => {
                        const id = `${fieldId}[${index}].age`;
                        return (
                            <FormGroup key={index}>
                                <InputGroup>
                                    <InputGroupText>
                                        {t("guest:form.label.childAge")}
                                    </InputGroupText>
                                    <Field
                                        component={FormInput}
                                        id={id}
                                        name={id}
                                        placeholder="1"
                                        value={child.age}
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
