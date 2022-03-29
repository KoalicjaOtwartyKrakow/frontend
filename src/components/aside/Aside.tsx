import React from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import HorizontalLine from "components/atoms/HorizontalLine";
import SettingsForm from "components/settings/SettingsForm";
import useApplicationSettings from "hooks/useApplicationSettings";
import { ApplicationSettings } from "components/settings/constants";

const Aside = ({ isOpen, toggleIsOpen }: any) => {
    const applicationSettings = useApplicationSettings();

    const handleApplySettings = (values: any, formikBag: any) => {
        const { setAll, get } = applicationSettings;
        const previousIsEnableMocks = get(ApplicationSettings.IS_ENABLE_MOCKS);

        setAll(values);

        formikBag.setSubmitting(false);

        const isEnableMocksEnabled = previousIsEnableMocks !== undefined;
        const isEnableMocksChanged = get(ApplicationSettings.IS_ENABLE_MOCKS) !== previousIsEnableMocks;

        if (isEnableMocksEnabled && isEnableMocksChanged) {
            window.location.reload();
        }

        toggleIsOpen();
    };

    const handleCancelSettings = () => {
        toggleIsOpen();
    };

    const initialValues = applicationSettings.settings;

    return (
        <Offcanvas toggle={toggleIsOpen} isOpen={isOpen} color="secondary">
            <OffcanvasHeader toggle={toggleIsOpen}>Application settings</OffcanvasHeader>
            <OffcanvasBody className="pt-0">
                <HorizontalLine className="mt-0" />
                <SettingsForm
                    initialValues={initialValues}
                    onSubmit={handleApplySettings}
                    onCancel={handleCancelSettings}
                />
            </OffcanvasBody>
        </Offcanvas>
    );
};

export default Aside;
