import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export function useCurrentUser() {
  return useQuery("current user", async () => {
    try {
      const response = await axios.get("/api/currentUser");

      return { loggedIn: true, root: response.data };
    } catch {
      return { loggedIn: false, root: null };
    }
  }, {
    initialData: { loggedIn: false, root: null }
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(async () => {
    await axios.post("/logout");
    await queryClient.resetQueries("current user", { exact: true });
    navigate("/");
  })

  return mutation.mutate
}