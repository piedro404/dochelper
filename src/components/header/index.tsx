import { Link } from "react-router-dom";
import urlLogo from "../../assets/favicon.png";

export function Header() {
    return (
        <header className="w-screen h-full flex items-center justify-center pt-8 pb-2 md:pb-4">
            <Link to="/" className="flex items-center justify-center flex-col md:flex-row gap-2">
                <img src={urlLogo} alt="Logo" className="h-12 md:h-16" />
                <div className="text-white text-3xl md:text-4xl font-bold">
                    <span className="text-white">Doc</span>
                    <span className="text-red-500">Helper</span>
                </div>
            </Link>
        </header>
    );
}
