import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import {useNavigate } from "react-router-dom";



const PageNotFound = () => {
    const navigate = useNavigate();
  
  const navigateHome = () => {
    navigate('/');
  };
    return(
      <BasicLayout>
        <head>
      <script type="text/javascript" src="./main/pages/HomePage.js"></script>
      </head>
        <div className="pt-2">
          <h1>404 - Request URL is Not Found</h1>
          <p>
           You do not have authorization to access this page or this page does not exist
          </p>  
          <button class="btn btn-primary" onClick={navigateHome}>Go Back to Home Page</button>
  
        </div>
      </BasicLayout>
    );
  }

  export default PageNotFound;
