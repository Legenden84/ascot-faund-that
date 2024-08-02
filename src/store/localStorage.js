const STORAGE_KEY = 'state';
const STORAGE_VERSION_KEY = 'version';
const CURRENT_VERSION = 2; // Update this version as needed

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem(STORAGE_KEY);
        const storedVersion = parseInt(localStorage.getItem(STORAGE_VERSION_KEY), 10);

        if (serializedState === null || isNaN(storedVersion) || storedVersion < CURRENT_VERSION) {
            // If there's no stored state or the version is outdated, return undefined to initialize with default state
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(STORAGE_KEY, serializedState);
        localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION.toString());
    } catch (err) {
        console.error("Save state failed:", err);
    }
};

export const clearState = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_VERSION_KEY);
    } catch (err) {
        console.error("Clear state failed:", err);
    }
};