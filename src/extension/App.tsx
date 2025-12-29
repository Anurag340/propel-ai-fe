import { useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { loadWebflow } from './webflow';

function App() {
    useEffect(() => {
        // Initialize Webflow Designer Extension
        loadWebflow().catch(err => {
            console.error("Failed to load Webflow Designer Extension:", err);
        });
    }, []);

    return <Sidebar />;
}

export default App;
