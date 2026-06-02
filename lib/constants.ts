export const APP_CONFIG = {
    NAME: "Aditya Mani Tripathi",
    DESC: "Full-Stack Software Engineer",
    PREFIX: "aditya_v1_",
} as const;

export const STORAGE_KEYS = {
    LANGUAGE: `${APP_CONFIG.PREFIX}-language`,
} as const;

export const LOCALE_CONFIG = {
    DEFAULT: "en",
    SUPPORTED: ["en", "tr"] as const,
} as const;