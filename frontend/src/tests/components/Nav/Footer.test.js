import { render, waitFor, screen } from "@testing-library/react";
import Footer, { space } from "main/components/Nav/Footer";

describe("Footer tests", () => {
    test("renders correctly ", async () => {
        const { getByText } = render(
            <Footer />
        );
        await waitFor(() => expect(getByText(/This app is a class project/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/The cartoon Storke Tower images/)).toBeInTheDocument());
    });

    test("space stands for a space", () => {
        expect(space).toBe(" ");
    });

    test("Links are correct", async () => {
        render(<Footer />)
        expect(screen.getByTestId("footer-class-website-link")).toHaveAttribute(
            "href",
            "https://ucsb-cs156.github.io"
        );
        expect(screen.getByTestId("footer-ucsb-link")).toHaveAttribute(
            "href",
            "https://ucsb.edu"
        );
        expect(screen.getByTestId("footer-source-code-link")).toHaveAttribute(
            "href",
            "https://github.com/ucsb-cs156-s23/proj-gauchoride-s23-5pm-2"
        );
        expect(screen.getByTestId("footer-sticker-link")).toHaveAttribute(
            "href",
            "https://www.as.ucsb.edu/sticker-packs"
        );
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


