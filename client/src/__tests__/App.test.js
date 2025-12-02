import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders Job Tracker Dashboard header", () => {
    render(<App />);
    const header = screen.getByText(/Job Tracker Dashboard/i);
    expect(header).toBeInTheDocument();
});
