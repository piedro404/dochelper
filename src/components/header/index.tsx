import urlLogo from "../../assets/favicon.png";

export function Header() {
    return (
        <header className="w-screen h-24 flex flex-col md:flex-row items-center justify-center gap-2 py-16">
            <img src={urlLogo} alt="Logo" className="h-12 md:h-16" />
            <div className="text-white text-3xl md:text-4xl font-bold">
                <span className="text-white">Doc</span>
                <span className="text-red-500">Helper</span>
            </div>
        </header>
    );
}
