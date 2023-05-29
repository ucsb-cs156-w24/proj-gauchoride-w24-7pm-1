import { screen, render, waitFor } from "@testing-library/react";
import Footer, { space } from "main/components/Nav/Footer";

describe("Footer tests", () => {
    test("renders correctly ", async () => {
        const { getByText } = render(
            <Footer />
        );
        await waitFor(() => expect(getByText(/This is a sample webapp using React with a Spring Boot backend./)).toBeInTheDocument());
    });

    // tests taken from https://github.com/ucsb-cs156/proj-courses repo
    test("space stands for a space", () => {
        expect(space).toBe(" ");
    });

    test("Link is correct", async () => {
        render(<Footer />)
        expect(screen.getByTestId("footer-sticker-link")).toHaveAttribute(
          "href",
          "https://www.as.ucsb.edu/sticker-packs"
        );
      });
});


