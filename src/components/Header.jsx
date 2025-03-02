import headerImage from "../assets/images/header.png";

const Header = () => {
    return (
        <header className="relative w-full h-50 md:h-80 lg:h-96 flex items-center justify-center">
            <img
                src={headerImage} 
                alt="header"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                onError={(e) => { e.target.src = "https://via.placeholder.com/1280x400?text=Image+Not+Found"; }} 
            />
     </header>
    );
};

export default Header;
