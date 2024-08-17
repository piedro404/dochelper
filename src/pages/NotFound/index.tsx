import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <section className="flex flex-1 flex-col gap-4 p-4 w-full justify-center items-center">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-200">404</h1>

                <p className="text-2xl font-bold tracking-tight text-red-500 sm:text-4xl">
                    Uh-oh!
                </p>

                <p className="mt-4 text-gray-200">We can't find that page.</p>

                <Link
                    to="/"
                    className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                    Go Back Home
                </Link>
            </div>
        </section>
    );
}
