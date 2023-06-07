import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function HomePage() {
  return (
    <BasicLayout>
      <div className="pt-2">
      <h1 data-testid= "welcome-header" style = {{ padding: "20px"}}>Welcome to<b data-testid = "UCSB" style = {{backgroundColor:"#003660", padding: "0px 10px"}}> <font data-testid = "red" color = "#FFFFFF"  >UCSB</font></b> GauchoRide!</h1>
      <div data-testid = "about-application" style={{margin:"0px 20px", backgroundColor:"#d6d2d2", padding: "20px"}}>
      <h3>About this application</h3>
        <p>
        This app is being built by the students of CMPSC 156 at UCSB to assist an effort to provide transportation for UCSB students with mobility issues to be better able to get to and from class.
        </p>
        <p><i>The first iteration of this app was created with a simple goal in mind: to make navigating to and from school as quick and easy as possible by connecting students in need with available drivers.
          As the app progresses, we hope to add new features and make improvements for a better overall experience for our users.
          </i>  </p>
      </div>
      </div>
    </BasicLayout>
  )
} 