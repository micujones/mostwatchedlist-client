import { createRoot } from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import { MainView } from '../components/main-view/main-view';
import Container from 'react-bootstrap/Container';

const MostWatchedListApplication = () => {
    return (
        <Container>
            <MainView />
        </Container>
    );
};

// Find root of app
const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MostWatchedListApplication />);
