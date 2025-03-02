import NavBar from '../components/NavBar';
import Header from '../components/Header';
import SearchFlights from '../components/SearchFlights';
import Plan from '../components/Plan';
import Memories from '../components/Memories';
import FeaturedTours from '../components/FeaturedTours';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="font-pop">
            <NavBar />
            <div className="relative">
                <Header />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-8 md:px-12 lg:px-16 z-10">
                    <p className="mt-2 text-amber-500 font-bold text-xl sm:text-2xl md:text-3xl">
                        Explore the skies, unlock new destinations and travel with ease.
                    </p>
                </div>
            </div>
            <SearchFlights />
            <Plan />
            <Memories />
            <FeaturedTours />
            <Footer />
        </div>
    );
};

export default Home;
