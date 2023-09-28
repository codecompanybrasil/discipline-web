import { createBrowserRouter } from "react-router-dom";

import AvaliationListPage from "./Pages/AvaliationListPage";
import LoadingPage from './Pages/LoadingPage';
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
]);

