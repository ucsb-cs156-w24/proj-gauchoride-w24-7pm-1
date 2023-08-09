import { Container } from "react-bootstrap";

export const space = " ";

export default function Footer() {
  return (
    <footer className="bg-light pt-3 pt-md-4 pb-4 pb-md-5">
      <Container>
        <p>
          This is a sample webapp using React with a Spring Boot backend.
        </p>
        <p>
          The cartoon Storke Tower images in the brand logo and favicon for this site were
          developed by Chelsea Lyon-Hayden, Art Director for UCSB Associate Students, and are
          used here by permission of the Executive Director of UCSB Associated Students.
          These images are Copyright © 2021 UCSB Associated Students, and may not be reused
          without express written permission of the Executive Director of UCSB Associated Students.  For more info, visit:
          { space }
          <a data-testid="footer-sticker-link" href="https://www.as.ucsb.edu/sticker-packs">www.as.ucsb.edu/sticker-packs/</a>
        </p>
      </Container>
    </footer>
  );
}