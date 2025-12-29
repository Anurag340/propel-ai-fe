/// <reference types="@webflow/designer-extension-typings" />

export const loadWebflow = async (): Promise<WebflowApi> => {
    // Webflow Designer Extension API is globally available as 'webflow'
    if (typeof webflow !== 'undefined') {
        return webflow;
    }

    // Retry/Wait logic could go here, but usually it's available immediately in the designer
    console.warn("Webflow SDK not detected. Ensure you are running in the Webflow Designer.");
    throw new Error("Webflow SDK not found");
};
