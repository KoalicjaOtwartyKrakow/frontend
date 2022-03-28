import React from "react";
import { Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import type { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { useFormikContext } from "formik";

import EntityFormRemoveButton from "components/molecules/form/buttons/EntityFormRemoveButton";
import EntityFormResetButton from "components/molecules/form/buttons/EntityFormResetButton";
import EntityFormSubmitButton from "components/molecules/form/buttons/EntityFormSubmitButton";
import EntityFormBackToListButton from "components/molecules/form/buttons/EntityFormBackToListButton";
import HorizontalLine from "components/atoms/HorizontalLine";

import { CrudInProgressState, CrudInProgressStates, isCrudInProgress } from "constants/CrudProgress";

interface Props {
    crudInProgressState?: CrudInProgressState;
    onRemove: () => any;
    submitIcon?: IconDefinition;
    submitLabel: string;
}

const EntityFormButtons = (props: Props) => {
    const { crudInProgressState, onRemove, submitIcon, submitLabel } = props;
    const removeInProgress = crudInProgressState === CrudInProgressStates.DELETE;
    const formikContext = useFormikContext();
    const { isSubmitting, isValid } = formikContext;
    const submitDisabled = !isValid || isSubmitting || isCrudInProgress(crudInProgressState);

    const { t } = useTranslation(["common"]);
    return (
        <React.Fragment>
            <HorizontalLine className="mb-4 mt-4" />
            <Row className="mb-2">
                <Col xs={4}>
                    <EntityFormBackToListButton
                        label={t("common:form.button.backToList")}
                        mobileLabel={t("common:form.button.backToList")}
                    />
                </Col>
                <Col xs={8} className="d-flex flex-row-reverse">
                    <EntityFormSubmitButton
                        disabled={submitDisabled}
                        icon={submitIcon}
                        isSubmitting={isSubmitting}
                        label={submitLabel}
                    />
                    {onRemove && (
                        <EntityFormRemoveButton
                            label={t("common:form.button.remove")}
                            onClick={onRemove}
                            inProgress={removeInProgress}
                        />
                    )}
                    <EntityFormResetButton label={t("common:form.button.reset")} disabled={submitDisabled} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default React.memo(EntityFormButtons);
