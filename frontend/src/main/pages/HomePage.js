import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function HomePage() {
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Hey there!</h1>
        <p>
        This app is being built by the students of CMPSC 156 at UCSB to assist an effort to provide
transportation for UCSB students with mobility issues to be better able to get to and from class.
        </p>
      </div>
    </BasicLayout>
  )
}