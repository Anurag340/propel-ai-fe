export const SessionService = {
    // Generate a random UUID v4
    generateUUID: (): string => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    getVisitorId: (): string => {
        let vid = sessionStorage.getItem('propel_visitor_id');
        if (!vid) {
            vid = SessionService.generateUUID();
            sessionStorage.setItem('propel_visitor_id', vid);
        }
        return vid;
    },

    // Get or create Session ID
    getSessionId: (): string => {
        let sid = sessionStorage.getItem('propel_session_id');
        if (!sid) {
            sid = SessionService.generateUUID();
            sessionStorage.setItem('propel_session_id', sid);
        }
        return sid;
    },

    // Get Request ID (Unique per query)
    generateRequestId: (): string => {
        return SessionService.generateUUID();
    },

    // Cookie Helpers
    getCookie: (name: string): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        return null;
    },

    setCookie: (name: string, value: string, days = 365) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    },

    // Reverse Geocoding (Nominatim)
    reverseGeocode: async (latitude: number, longitude: number): Promise<string | null> => {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Propel-Chat-Widget/1.0'
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();
                if (data.address) {
                    const city = data.address.city || data.address.town || data.address.village || data.address.county || '';
                    const country = data.address.country || '';
                    const countryCode = data.address.country_code ? data.address.country_code.toUpperCase() : '';

                    if (city && country) return `${city}, ${country}`;
                    if (country) return countryCode || country;
                }
            }
        } catch {
            // Configurable silence
        }
        return null;
    },

    // IP-based Location Detection
    detectLocationFromIP: async (): Promise<string | null> => {
        // Fast fallback for localhost to avoid CORS errors
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('SessionService: Localhost detected, using mock location.');
            return 'New York, US';
        }

        const services = [
            { url: 'https://ipapi.co/json/', name: 'ipapi.co' },
            { url: 'https://ipinfo.io/json', name: 'ipinfo.io' },
            { url: 'https://api.ipgeolocation.io/ipgeo?apiKey=free', name: 'ipgeolocation.io' }
        ];

        for (const service of services) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);

                const response = await fetch(service.url, {
                    method: 'GET',
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                if (response.ok) {
                    const data = await response.json();
                    let city, country;

                    if (service.name === 'ipapi.co') {
                        city = data.city;
                        country = data.country_code;
                    } else if (service.name === 'ipinfo.io') {
                        city = data.city;
                        country = data.country;
                    } else if (service.name === 'ipgeolocation.io') {
                        city = data.city;
                        country = data.country_code2 || data.country_code;
                    }

                    if (city && country) {
                        return `${city}, ${country}`;
                    }
                }
            } catch (error) {
                // Squelch errors for cleaner console, or log debug
                // console.debug(`Failed to fetch location from ${service.name}`, error);
                continue;
            }
        }
        return null;
    },

    // Main Detection Entry Point
    detectUserLocation: async (): Promise<string | null> => {
        // 1. Check Cookie
        const storedLocation = SessionService.getCookie('propel_user_location');
        if (storedLocation) return storedLocation;

        // 2. Try Browser Geolocation
        if (navigator.geolocation) {
            try {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
                });

                const { latitude, longitude } = position.coords;
                // Try Reverse Geocode
                let loc = await SessionService.reverseGeocode(latitude, longitude);
                if (!loc) loc = `${latitude.toFixed(4)},${longitude.toFixed(4)}`; // Fallback to coords

                SessionService.setCookie('propel_user_location', loc);
                return loc;
            } catch {
                // Fallback to IP
            }
        }

        // 3. Fallback to IP
        const ipLoc = await SessionService.detectLocationFromIP();
        if (ipLoc) SessionService.setCookie('propel_user_location', ipLoc);
        return ipLoc;
    }
};
