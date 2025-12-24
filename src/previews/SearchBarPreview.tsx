import { SearchBar } from '../components/SearchBar';
import { NotificationButton } from '../components/NotificationButton';
import { SendButton } from '../components/SendButton';

export const SearchBarPreview = () => {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            padding: '20px'
        }}>
            <div style={{ width: '100%', maxWidth: '42rem', display: 'flex', justifyContent: 'center' }}>
                <SearchBar>
                    <div className="input-bar-buttons" style={{ display: 'flex', alignItems: 'center' }}>
                        <NotificationButton />
                        <SendButton />
                    </div>
                </SearchBar>
            </div>
        </div>
    );
};
