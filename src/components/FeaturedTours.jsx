import tourOne from "../assets/images/tour-1.png";
import tourTwo from "../assets/images/tour-2.png";
import tourThree from "../assets/images/tour-3.png";

const FeaturedTours = () => {
  return (
    <section className="bg-gradient-to-b from-amber-200 to-amber-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Explore Our Featured Tours
        </h2>
        <p className="text-center text-xl text-gray-900 mb-10 max-w-2xl mx-auto">
        Experience top destinations with handpicked adventures that make your journey truly unforgettable
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Box 1 */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img 
              src={tourOne} 
              alt="New York City" 
              className="w-full h-52 object-cover rounded-md mb-4" 
            />
            <h4 className="text-2xl font-semibold mb-2 text-black">New York City</h4>
            <p className="text-black">
              Explore the city that never sleeps, from Times Square to Central Park, and experience its vibrant culture
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img 
              src={tourTwo}
              alt="Atlanta" 
              className="w-full h-52 object-cover rounded-md mb-4" 
            />
            <h4 className="text-2xl font-semibold mb-2 text-black">Atlanta</h4>
            <p className="text-black">
            Discover the rich history of Atlanta, visit the Georgia Aquarium, and explore its vibrant cultures
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img 
              src={tourThree} 
              alt="Chicago" 
              className="w-full h-52 object-cover rounded-md mb-4" 
            />
            <h4 className="text-2xl font-semibold mb-2 text-black">Chicago</h4>
            <p className="text-black">
              Experience Chicago's iconic skyline, Millennium Park, and the stunning architecture along the river
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;
