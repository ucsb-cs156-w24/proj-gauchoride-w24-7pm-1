import { useQuery } from "react-query";
import axios from "axios";

import { toast } from "react-toastify";

// example
//  queryKey ["/api/users/all"] for "api/users/all"
//  queryKey ["/api/users","4"]  for "/api/users?id=4"

// For axiosParameters
//   
// {
//     method: 'post',
//     url: '/user/12345',
//     data: {
//       firstName: 'Fred',
//       lastName: 'Flintstone'
//     }
//  }
// 

// GET Example:
// useBackend(
//     ["/api/admin/users"],
//     { method: "GET", url: "/api/admin/users" },
//     []
// );

export default function useBackend(queryKey, axiosParameters, initialData) {

    return useQuery(queryKey, async () => {
        try {
            const response = await axios(axiosParameters);
            return response.data;
        } catch (e) {
            const errorMessage = `Error communicating with backend via ${axiosParameters.method} on ${axiosParameters.url}`;
            toast(errorMessage);
            console.error(errorMessage,e);
            throw e;
        }
    }, {
        initialData
    });

}
