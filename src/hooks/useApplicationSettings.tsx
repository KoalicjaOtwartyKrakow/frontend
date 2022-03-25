// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'components/settings/constants'... Remove this comment to see the full error message
import { ApplicationSettings, ApplicationSettingsStorageKey } from "components/settings/constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'constants/AppConfig' or its co... Remove this comment to see the full error message
import { appConfig } from "constants/AppConfig";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import { merge } from "lodash-es";

const useApplicationSettings = () => {
    const defaultSettings = {};

    if (appConfig.useMocks) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        defaultSettings[ApplicationSettings.IS_ENABLE_MOCKS] = false;
    }

    const persist = (settings: any) => {
        localStorage.setItem(ApplicationSettingsStorageKey, JSON.stringify(settings));
    };

    const retrieve = () => {
        const json = localStorage.getItem(ApplicationSettingsStorageKey);
        return json;
    };

    const set = (setting: any, value: any) => {
        settings[setting] = value;
        persist(settings);
    };

    const setAll = (values: any) => {
        const settings = merge(getSettings(), values);
        persist(settings);
    };

    const get = (setting: any) => {
        const settings = getSettings();
        return settings[setting];
    };

    const getSettings = () => {
        const json = retrieve();
        if (!json) {
            return defaultSettings;
        }
        try {
            return merge(defaultSettings, JSON.parse(json));
        } catch (error) {
            console.warn(error);
            return defaultSettings;
        }
    };

    if (!retrieve()) {
        setAll(defaultSettings);
    }

    const settings = getSettings();
    const count = Object.keys(settings).length;

    return {
        settings,
        count,
        get,
        set,
        setAll,
    };
};

export default useApplicationSettings;
