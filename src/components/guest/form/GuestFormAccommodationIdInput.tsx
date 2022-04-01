import FormErrorsFeedback from "components/atoms/form/FormErrorsFeedback";
import { FormikApiErrors } from "components/atoms/form/FormikApiErrors";
import FormInput from "components/atoms/form/FormInput";
import FormLabel from "components/atoms/form/FormLabel";
import { Field, useField, useFormikContext } from "formik";
import { useGetAccommodation } from "hooks/api/accommodationHooks";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, FormFeedback, FormGroup, Row } from "reactstrap";
import { GuestFormFields } from "../GuestFormFields";
import GuestFormAccommodationSearchItem from "./GuestFormAccommodationSearchItem";

function GuestFormAccommodationIdInput({ onAccommodationSelected }: any) {
    const accommodationUnitIdFieldName = `${GuestFormFields.ACCOMMODATION_UNIT}.id`;
    const { t } = useTranslation(["guest"]);
    const [{ value: accommodationId }] = useField<string>(accommodationUnitIdFieldName);
    const [{ value: isValidAccommodationId }, , isValidAccommodationUnitFieldHelper] = useField<boolean>(
        GuestFormFields.IS_VALID_ACCOMMODATION_UNIT
    );
    const { accommodation, accommodationGetError, retrieveAccommodation } = useGetAccommodation();

    const setAccommodationIdStatus = (state: boolean) => {
        isValidAccommodationUnitFieldHelper.setValue(state);
    };

    useEffect(() => {
        if (!accommodationId) {
            setAccommodationIdStatus(true);
            return;
        }

        retrieveAccommodation({ accommodationId });
        if (accommodationGetError?.status?.code !== 200) {
            setAccommodationIdStatus(false);
            return;
        }
        onAccommodationSelected(accommodation);
    }, [accommodationId]);

    useEffect(() => {
        setAccommodationIdStatus(true);
    }, [accommodation]);

    return (
        <FormGroup>
            <Row>
                <Col xs={6}>
                    <FormLabel>{t("guest:form.label.assignedAccommodation")}</FormLabel>
                    <Field
                        component={FormInput}
                        placeholder={t("guest:form.placeholder.accommodationId")}
                        type="text"
                        id={accommodationUnitIdFieldName}
                        name={accommodationUnitIdFieldName}
                        invalid={!isValidAccommodationId}
                    ></Field>
                    {!isValidAccommodationId && (
                        <FormFeedback name={accommodationUnitIdFieldName} className="d-block">
                            {t("guest:form.error.accommodationIdIsIncorrect")}
                        </FormFeedback>
                    )}
                </Col>
                <Col xs={6}>
                    {isValidAccommodationId && !!accommodationId && accommodation && (
                        <Row>
                            <GuestFormAccommodationSearchItem accommodation={accommodation} />
                        </Row>
                    )}
                </Col>
            </Row>
        </FormGroup>
    );
}

export default GuestFormAccommodationIdInput;
