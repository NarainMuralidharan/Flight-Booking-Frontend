import planOne from "../assets/images/plan-1.png";
import planTwo from "../assets/images/plan-2.png";
import planThree from "../assets/images/plan-3.png";


const Plan = () => {
  return (
    <section className="bg-gradient-to-b from-amber-200 to-amber-400 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          Plan Your Perfect Trip
        </h2>
        <p className="text-center text-xl text-gray-900 mb-10 max-w-2xl mx-auto">
          Discover flexible booking options, and real time flight updates for a seamless travel experience
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Box 1 */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img
              src={planOne}
              alt="Adventure Travel"
              className="w-full h-52 object-cover rounded-md mb-4"
            />
            <h4 className="text-2xl font-semibold mb-2 text-black">Adventure Travel Destination</h4>
            <p className="text-black">
              Embark on thrilling adventures, explore new landscapes, and create memories that last a lifetime
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img
              src={planTwo}
              alt="Family Friendly Packages"
              className="w-full h-52 object-cover rounded-md mb-4"
            />
            <h4 className="text-2xl font-semibold mb-2 text-black">Family Friendly Packages</h4>
            <p className="text-black">
              Enjoy hassle free vacations with family friendly packages designed for comfort, fun, and relaxation
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-gray-100 p-6 rounded-2xl shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <img
              src={planThree}
              alt="Real-Time Flight Updates"
              className="w-full h-52 object-cover rounded-md mb-4"
            />
            <h4 className="text-2xl font-semibold mb-2 text-black">Real Time Flight Updates</h4>
            <p className="text-black">
              Stay informed with instant notifications on flight status, delays, and gate changes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plan;
