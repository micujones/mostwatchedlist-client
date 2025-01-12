import { createRoot } from 'react-dom/client';
import './index.scss';

const MostWatchedListApplication = () => {
    return (
        <div className = 'most-watched-list'>
            <div>Good morning</div>
        </div>
    );
};

// Find root of app
const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MostWatchedListApplication/>);