import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";
import { Layout } from "./components/layout";
import { CertidaoDeRegularizacao } from "./pages/Docs/CertidaoDeRegularizacao";

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
            }
        ]
    }
])

export { router };