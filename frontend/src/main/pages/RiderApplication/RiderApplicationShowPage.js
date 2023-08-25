import React, { useEffect } from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams, useNavigate } from "react-router-dom";
import RiderApplicationForm from "main/components/RiderApplication/RiderApplicationForm";
import { useBackend } from "main/utils/useBackend";

export default function RiderApplicationEditPage() {
  let { id } = useParams();
  const navigate = useNavigate();

  const { data: riderApplication, _error, _status } =
    useBackend(
      // Stryker disable next-line all : don't test internal caching of React Query
      [`/api/riderApplication?id=${id}`],
      {  // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
        method: "GET",
        url: `/api/riderApplication`,
        params: {
          id
        }
      }
    );

  useEffect(() => {
      // Find and make permNumber field read-only
      const permNumberInput = document.querySelector("#perm_number");
      if (permNumberInput) {
        permNumberInput.setAttribute("readonly", "true");
      }
  
      // Find and make description field read-only
      const descriptionInput = document.querySelector("#description");
      if (descriptionInput) {
        descriptionInput.setAttribute("readonly", "true");
      }
    }, []);

     return (
        <BasicLayout>
            <div className="pt-2">
                <h1>View Rider Application</h1>
                {riderApplication &&
                <RiderApplicationForm initialContents={riderApplication} submitAction={navigate("/apply/rider")} buttonLabel="Return" />
                }
            </div>
        </BasicLayout>
    )
}