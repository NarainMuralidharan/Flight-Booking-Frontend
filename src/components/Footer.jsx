const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
        
        {/* Left Side - Skypiea */}
        <div className="md:border-r md:border-gray-700 pr-6 md:pr-12">
          <h3 className="text-3xl font-bold mb-4">Skypiea</h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Experience seamless travel with Skypiea. We connect the world with safety, comfort, and excellence.
          </p>
          <p className="text-gray-400 text-lg mt-3 leading-relaxed">
            From top tier customer service to premium in flight experiences, your journey begins with us.
          </p>
        </div>

        {/* Right Side - Company & Support */}
        <div className="flex justify-between md:space-x-16">
          {/* Company Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Company</h4>
            <p className="text-gray-400 text-lg leading-loose">About Us</p>
            <p className="text-gray-400 text-lg leading-loose">Careers</p>
            <p className="text-gray-400 text-lg leading-loose">Press & Media</p>
            <p className="text-gray-400 text-lg leading-loose">Terms & Conditions</p>
          </div>

          {/* Support Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Support</h4>
            <p className="text-gray-400 text-lg leading-loose">Customer Service</p>
            <p className="text-gray-400 text-lg leading-loose">Refund Policy</p>
            <p className="text-gray-400 text-lg leading-loose">FAQs</p>
            <p className="text-gray-400 text-lg leading-loose">Travel Updates</p>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="max-w-6xl mx-auto px-6 mt-12 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-500 text-base">© 2025 Skypiea. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
