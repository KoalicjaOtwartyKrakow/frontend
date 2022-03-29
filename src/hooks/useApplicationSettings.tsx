import { ApplicationSettings, ApplicationSettingsStorageKey } from "components/settings/constants";
import { appConfig } from "constants/AppConfig";
import { merge } from "lodash";

const useApplicationSettings = () => {
    const defaultSettings = {};

    if (appConfig.useMocks) {
        // @ts-ignore
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
