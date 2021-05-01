import { useQuery } from "react-query";
import axios from "axios";

export function useUsers() {
  return useQuery("users", async () => {
    try {
      const response = await axios.get("/api/admin/users");      
      return response.data ;
    } catch {
      return [];
    }
  }, {
    initialData: []
  });
}
