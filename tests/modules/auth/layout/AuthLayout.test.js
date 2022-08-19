import { render, screen } from "@testing-library/react";
import { AuthLayout } from "../../../../src/modules/auth/layouts/AuthLayout";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("Test in AuthLayout", () => {
  const Component = () => <>Im a children :D</>;
  const title = "Testing";

  test("should to mathc with snapshot", () => {
    const { container } = render(
      <AuthLayout title={title} children={<Component />} />
    );
    expect(container).toMatchSnapshot();
  });

  test("Should show the correct title", () => {
    render(<AuthLayout title={title} children={<Component />} />);
    expect(screen.getByText(title)).toBeTruthy();
  });
});
