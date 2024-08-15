import { Link } from "react-router-dom"

interface DocItem{
    url: string,
    text: string
}

export function BtnSelectDoc({url, text}: DocItem) {
    return (
        <Link to={url}>
            <div className="flex h-20 text-lg md:text-xl bg-white items-center justify-center p-4 rounded-2xl hover:scale-105 hover:shadow-lg transition-transform duration-200">
                    {text}
            </div>
        </Link>
    )
}