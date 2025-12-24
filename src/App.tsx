import { useState, useEffect } from 'react';
import { Widget } from './Widget';
import { Dashboard } from './pages/Dashboard';

const App = () => {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple routing logic checking path or query param
  const searchParams = new URLSearchParams(window.location.search);
  const mode = searchParams.get('mode');

  if (route === '/widget' || mode === 'widget') {
    return <Widget />;
  }

  // Default to Dashboard
  return <Dashboard />;
};

export default App;

