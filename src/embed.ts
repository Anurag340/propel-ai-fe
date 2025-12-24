(function () {
    // Configuration
    // In production, this can be replaced or set via data attributes
    var SCRIPT_ID = 'propel-ai-widget-script';
    var IFRAME_ID = 'propel-ai-widget-frame';
    // Auto-detect the script src to determine base URL, or hardcode production URL
    var currentScript = document.currentScript || document.getElementById(SCRIPT_ID);
    var baseUrl = 'http://localhost:5173'; // Default Dev URL

    // Try to derive base URL from script source if possible
    if (currentScript && currentScript instanceof HTMLScriptElement && currentScript.src) {
        try {
            var url = new URL(currentScript.src);
            baseUrl = url.origin; // Default to script origin

            // If script is served from /assets/embed.js, we want the root.
            // But usually, we might host this script on CDN and the app elsewhere.
            // For now, let's allow a data-attribute override or default to localhost.
            var dataUrl = currentScript.getAttribute('data-widget-url');
            if (dataUrl) {
                baseUrl = dataUrl;
            }
        } catch (e) {
            console.error('Propel AI: Could not parse script URL', e);
        }
    }

    var widgetUrl = baseUrl + '/widget';

    // Prevent duplicate injection
    if (document.getElementById(IFRAME_ID)) return;

    // Create Iframe
    var iframe = document.createElement('iframe');
    iframe.id = IFRAME_ID;
    iframe.src = widgetUrl;

    // Styles to make it a transparent overlay
    iframe.style.position = 'fixed';
    iframe.style.bottom = '0';
    iframe.style.right = '0';
    iframe.style.width = '100vw'; // Full width to allow centered/side positioning
    iframe.style.height = '100vh'; // Full height for overlay
    iframe.style.border = 'none';
    iframe.style.zIndex = '99999999';
    iframe.style.pointerEvents = 'none'; // Click-through by default
    iframe.style.background = 'transparent';
    iframe.allow = 'clipboard-read; clipboard-write'; // Allow copy-paste

    // Append to body
    if (document.body) {
        document.body.appendChild(iframe);
    } else {
        window.addEventListener('DOMContentLoaded', function () {
            document.body.appendChild(iframe);
        });
    }

    // Optional: Listen for messages from the widget if we need to adjust iframe size dynamically
    // (Though current design is full-screen overlay with internal pointer-events management)
})();
