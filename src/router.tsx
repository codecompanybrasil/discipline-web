import { createBrowserRouter } from "react-router-dom";
import { Navigate} from "react-router-dom";

import AvaliationListPage from "./Pages/AvaliationListPage";
import AvaliationPage from "./Pages/AvaliationPage";
import AvaliationIntermediate from "./Pages/AvaliationIntermediate";
import TestPage from "./Pages/TestPage";
import Page404 from "./Pages/404";


export default createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/avaliacoes" />,
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
                `${process.env.REACT_APP_API_URL}/avaliations/${params.hash}/export`,
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
        path: "/avaliacoes/settings/:hash",
        element: <AvaliationIntermediate />
    },
    {
        path: "/test",
        element: <TestPage />
    },
    {
        path: "*",
        element: <Page404 />
    }
]);

