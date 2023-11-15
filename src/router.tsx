import { createBrowserRouter } from "react-router-dom";
import { useNavigate, Navigate} from "react-router-dom";

import AvaliationListPage from "./Pages/AvaliationListPage";
import AvaliationPage from "./Pages/AvaliationPage";


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
    }
]);

