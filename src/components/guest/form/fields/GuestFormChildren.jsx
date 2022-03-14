import React from "react";
import { Button, ButtonGroup, Col, FormGroup, Label } from "reactstrap";
import { Field, FieldArray, useField } from "formik";
import { useTranslation } from "react-i18next";

import { GuestFormFields } from "components/guest/GuestFormFields";
import FormInput from "components/atoms/form/FormInput";
import GuestChild from "models/guest/GuestChild";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/pro-regular-svg-icons";

const GuestFormChildren = (props) => {
    const fieldId = GuestFormFields.CHILDREN;

    const { t } = useTranslation(["guest"]);
    const [field] = useField(props);

    const childRenderer = (arrayHelpers) => {
        const index = "0";
        const items = field.value.children;
        const addChild = () => arrayHelpers.push(new GuestChild());
        const insertChild = () => arrayHelpers.insert(index, new GuestChild());
        const removeChild = () => arrayHelpers.remove(index);

        return (
            <>
                {items?.length > 0 ? (
                    items.map((child, index) => {
                        const id = `${fieldId}.${index}`;
                        return (
                            <FormGroup
                                key={index}
                                className="d-flex flex-row align-items-baseline"
                            >
                                <Label for={id} className="required d-block">
                                    {t("guest:form.label.childAge")}
                                </Label>
                                <div className="ms-2 ms-lg-3">
                                    <Field
                                        component={FormInput}
                                        id={id}
                                        name={id}
                                        placeholder="1"
                                        value={child.age}
                                        type="text"
                                    />
                                </div>
                                <ButtonGroup className="ms-2 ms-lg-2">
                                    <Button
                                        color="secondary"
                                        outline
                                        onClick={removeChild}
                                    >
                                        <FontAwesomeIcon icon={faMinus} />
                                    </Button>
                                    <Button
                                        color="secondary"
                                        outline
                                        onClick={insertChild}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                </ButtonGroup>
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
