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
    iframe.style.left = '50%'; // Center horizontally
    iframe.style.transform = 'translateX(-50%)'; // Center pivot

    // Start Bounded (Centered Strip)
    iframe.style.width = '800px'; // Wide enough for window (720px) + margins
    iframe.style.maxWidth = '100vw'; // Responsive support
    iframe.style.height = '160px'; // Height of Search Bar area

    iframe.style.border = 'none';
    iframe.style.zIndex = '99999999';
    iframe.style.pointerEvents = 'auto';
    iframe.style.background = 'transparent';
    iframe.style.transition = 'height 0.3s ease'; // Smooth resize (Width is static mostly)
    iframe.allow = 'clipboard-read; clipboard-write';

    // Listen for Resize Messages from Widget
    window.addEventListener('message', function (event) {
        // Security check: typically check origin, but here we expect our own widget
        if (event.data && event.data.type === 'PROPEL_RESIZE') {
            // We mainly resize height. Width stays 800px (or 100vw on mobile).
            if (event.data.height) google_iframe.style.height = event.data.height;
            // Allow width overrides if needed, but default is stable
            if (event.data.width) google_iframe.style.width = event.data.width;
        }
    });

    // Helper ref
    var google_iframe = iframe;

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
