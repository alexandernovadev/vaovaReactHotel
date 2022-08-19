import { render, screen } from "@testing-library/react";
import { AuthLayout } from "../../../../src/modules/auth/layouts/AuthLayout";


describe("Test in AuthLayout", () => {
  test("should to mathc with snapshot", () => {

    const Component = () => <>Im a children :D</>;
    const title = "Testing";


    const { container } = render(
      <AuthLayout title={title} children={<Component />} />
    );
    expect(container).toMatchSnapshot();

  });
});
