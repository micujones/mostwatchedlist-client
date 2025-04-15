import headerImage from '../../src/images/theater-chairs.jpg';
import './main-view.scss';

export const HeroSection = () => {
    return (
        <>
            <header>
                <div
                    style={{
                        height: '350px',
                        textAlign: 'center',
                        transform: 'translate(0, 30%)',
                    }}
                >
                    <h1>Most Watched List</h1>
                    <p>
                        Get details about (what should be) the most watched
                        movies out there!
                    </p>
                </div>

                {/* <div className="hero-section">
                    <img src={headerImage} className="hero-image" alt="" />
                    <div className="hero-text">
                        <h2>Most Watched List</h2>
                        <p>
                            Get details about (what should be) the most watched
                            movies out there!
                        </p>
                    </div>
                </div> */}
            </header>
        </>
    );
};
