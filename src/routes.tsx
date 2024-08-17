import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";
import { Layout } from "./components/layout";
import { CertidaoDeRegularizacao } from "./pages/Docs/CertidaoDeRegularizacao";
import { REURB_E } from "./pages/Docs/REURB_E";
import { NotFound } from "./pages/NotFound";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/certidao-de-regularizacao",
                element: <CertidaoDeRegularizacao />
            },
            {
                path: "/reurb-e",
                element: <REURB_E />
            },
            {
                path: "/*",
                element: <NotFound />
            },
        ],
    }
])

export { router };