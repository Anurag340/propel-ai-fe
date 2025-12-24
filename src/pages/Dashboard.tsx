import { useState, useEffect } from 'react';

export const Dashboard = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [siteId, setSiteId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Base URL for Backend API
    // - Development: '' (Proxies to localhost via Vite)
    // - Production: 'https://propelwebsiteagent-h2hcc0cae9a6eqdp.centralindia-01.azurewebsites.net' (Azure)
    const API_BASE = import.meta.env.VITE_API_BASE || '';

    // Initialize state
    useEffect(() => {
        // ... (existing logic) ...
        const params = new URLSearchParams(window.location.search);
        const urlSiteId = params.get('site_id');

        if (urlSiteId) {
            localStorage.setItem('propel_site_id', urlSiteId);
            setSiteId(urlSiteId);
            setIsConnected(true);
            // Clean URL
            window.history.replaceState({}, '', window.location.pathname);
        } else {
            // ... (existing logic) ...
            const storedSiteId = localStorage.getItem('propel_site_id');
            if (storedSiteId) {
                setSiteId(storedSiteId);
                setIsConnected(true);
            }
        }

        const savedEnabled = localStorage.getItem('propel_widget_enabled');
        if (savedEnabled === 'true') setIsEnabled(true);

    }, []);

    const handleConnect = () => {
        // Redirect to Backend OAuth Start
        window.location.href = `${API_BASE}/webflow/auth/login`;
    };

    const handleMockConnect = () => {
        localStorage.setItem('propel_site_id', 'mock_site_id');
        setSiteId('mock_site_id');
        setIsConnected(true);
    };

    const handleDisconnect = () => {
        localStorage.removeItem('propel_site_id');
        setSiteId(null);
        setIsConnected(false);
        setIsEnabled(false);
        localStorage.setItem('propel_widget_enabled', 'false');
    };

    const handleCustomize = () => {
        window.location.href = '/test-extension.html';
    };

    const toggleSwitch = async () => {
        if (!isConnected || !siteId) return;

        const newState = !isEnabled;
        setIsLoading(true);

        try {
            // Call Real Backend API
            const endpoint = `${API_BASE}/webflow/api/${newState ? 'enable' : 'disable'}`;
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ site_id: siteId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'API request failed');
            }

            // Success (or Mock Success)
            setIsEnabled(newState);
            localStorage.setItem('propel_widget_enabled', String(newState));
            window.dispatchEvent(new Event('storage')); // Sync other tabs

        } catch (error: any) {
            console.error('Failed to toggle widget:', error);
            alert(`Failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at 50% 0%, #1f2937, #030712)',
            color: '#f3f4f6',
            fontFamily: 'Inter, sans-serif'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '480px',
                padding: '3rem',
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        background: 'linear-gradient(to right, #60A5FA, #A78BFA)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent'
                    }}>
                        Propel AI
                    </h1>
                    <p style={{ color: '#9CA3AF', fontSize: '1rem' }}>
                        Search Engine & Widget Control
                    </p>
                </div>

                {/* Connection State */}
                {!isConnected ? (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{
                            padding: '0.75rem',
                            textAlign: 'center',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '4px',
                            border: '1px dashed rgba(255,255,255,0.1)',
                            color: '#9CA3AF'
                        }}>
                            Not connected to any site.
                        </div>
                        <button onClick={handleConnect} style={{
                            width: '100%', padding: '1rem', background: '#2563EB', color: 'white',
                            borderRadius: '4px', border: 'none', fontWeight: 600, cursor: 'pointer',
                            transition: 'transform 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                        }}>
                            <img src="https://dhygzobemt712.cloudfront.net/Logo/Full_Logo_White.png"
                                alt="Connect" style={{ height: '20px' }} />
                        </button>
                        <button onClick={handleMockConnect} style={{
                            width: '100%', padding: '0.75rem', background: 'transparent', color: '#6B7280',
                            borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem', cursor: 'pointer'
                        }}>
                            (Dev) Mock Connection
                        </button>
                    </div>
                ) : (
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* Connected Site info */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></div>
                                <span style={{ color: '#6EE7B7', fontSize: '0.9rem', fontWeight: 500 }}>
                                    {siteId === 'mock_site_id' ? 'Mock Site' : 'Connected Site'}
                                </span>
                            </div>
                            <button onClick={handleDisconnect} style={{
                                background: 'transparent', border: 'none', color: '#F87171',
                                fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline'
                            }}>Disconnect</button>
                        </div>

                        {/* Status Toggle */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '1.25rem', borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    background: isEnabled ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: isEnabled ? '#34D399' : '#F87171'
                                }}>
                                    {isLoading ? (
                                        <svg style={{ width: '20px', height: '20px', animation: 'spin 1s linear infinite' }} fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    )}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#F3F4F6' }}>
                                        {isLoading ? 'Updating...' : 'Widget Status'}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: isEnabled ? '#34D399' : '#9CA3AF' }}>
                                        {isEnabled ? 'Active on site' : 'Disabled'}
                                    </div>
                                </div>
                            </div>

                            <div onClick={toggleSwitch} style={{
                                width: '48px', height: '28px',
                                backgroundColor: isEnabled ? '#3B82F6' : '#374151',
                                borderRadius: '9999px', position: 'relative', cursor: isLoading ? 'wait' : 'pointer',
                                transition: 'background-color 0.3s ease', opacity: isLoading ? 0.7 : 1
                            }}>
                                <div style={{
                                    width: '20px', height: '20px', backgroundColor: 'white',
                                    borderRadius: '50%', position: 'absolute', top: '4px',
                                    left: isEnabled ? '24px' : '4px',
                                    transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                                }} />
                            </div>
                        </div>

                        {/* Customize Button */}
                        <button onClick={handleCustomize} style={{
                            width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: 600, color: 'white',
                            background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
                        }}>
                            <span>Customize Appearance</span>
                            <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Footer */}
                <div style={{ position: 'absolute', bottom: '0.75rem', color: '#4B5563', fontSize: '0.8rem' }}>
                    &copy; 2024 Propel AI. All rights reserved.
                </div>
                {/* Inline Style for Spinner */}
                <style>{`
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                `}</style>
            </div>
        </div>
    );
};
