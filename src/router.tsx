import { createBrowserRouter } from "react-router-dom";

import LoadingPage from './Pages/LoadingPage';
import AvaliationListPage from "./Pages/AvaliationListPage";
import AvaliationDetailsPage from "./Pages/AvaliationDetailsPage";
import AvaliationPage from "./Pages/AvaliationPage";

export default createBrowserRouter([
    {
        path: "/",
        element: <LoadingPage />,
    },
    {
        path: "avaliacoes",
        element: <AvaliationListPage />,
    },
    {
        path: "avaliacoes/:hash",
        element: <AvaliationPage />,
        loader: async ({ request, params }) => {
            let data = await fetch(
                `http://api.discipline.app.br/avaliations/${params.hash}/export`,
                { signal: request.signal }
            ).then(async (response: any) => {
                if (response.ok) {
                    return await response.json()
                }
            })

            return data
        },
    },
    {
        path: "avaliacoes/:hash/detalhes",
        element: <AvaliationDetailsPage />,
        loader: async ({ request, params }) => {
            let data = await fetch(
                `http://api.discipline.app.br/avaliations/${params.hash}`,
                { signal: request.signal }
            ).then(async (response: any) => {
                if (response.ok) {
                    return await response.json()
                }
            })

            return data
        },
    },
]);

