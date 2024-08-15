import { FaGithub } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="w-screen flex h-16 text-white gap-2 items-center justify-center bg-black p-4">
            <p className="text-sm md:text-base">Desenvolvido por Piedro404</p>
            <a 
                href="https://github.com/piedro404" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xl hover:text-gray-400"
            >
                <FaGithub size={24} />
            </a>
        </footer>
    );
}
