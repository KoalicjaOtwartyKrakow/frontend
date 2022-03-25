import { ApplicationSettings, ApplicationSettingsStorageKey } from "components/settings/constants";
import { appConfig } from "constants/AppConfig";
import { merge } from "lodash-es";

const useApplicationSettings = () => {
    const defaultSettings = {};

    if (appConfig.useMocks) {
        defaultSettings[ApplicationSettings.IS_ENABLE_MOCKS] = false;
    }

    const persist = (settings) => {
        localStorage.setItem(ApplicationSettingsStorageKey, JSON.stringify(settings));
    };

    const retrieve = () => {
        const json = localStorage.getItem(ApplicationSettingsStorageKey);
        return json;
    };

    const set = (setting, value) => {
        settings[setting] = value;
        persist(settings);
    };

    const setAll = (values) => {
        const settings = merge(getSettings(), values);
        persist(settings);
    };

    const get = (setting) => {
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
