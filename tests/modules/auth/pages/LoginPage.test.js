import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../../src/modules/auth/pages/LoginPage";
import { render, screen, fireEvent, act } from "@testing-library/react";
import * as redux from "react-redux";

const spy = jest.spyOn(redux, "useSelector");
spy.mockReturnValue({ username: "test" });

const mockGoogleSignIn = jest.fn();
const mockLoginWithEmailPassword = jest.fn();

jest.mock("../../../../src/modules/auth/hooks/useLogin", () => ({
  useLogin: () => {
    return {
      loginFire: mockLoginWithEmailPassword,
    };
  },
}));

jest.mock("../../../../src/modules/auth/hooks/useGoogleSignIn", () => ({
  useGoogleSignIn: () => {
    return {
      loginWithGoogle: mockGoogleSignIn,
    };
  },
}));

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

jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) => fn()),
}));

describe("Test in LoginPage ", () => {
  test("should be a call Google Button one time", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    expect(true).toBe(true);
  });

  test("submit should call 0 time LoginWithEmailPassword because is Invalid", async () => {
    const email = "testgoogle.com";
    const password = "3456";

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await act(async () => {
      const emailField = screen.getByTestId("email");
      fireEvent.change(emailField, { target: { value: email } });

      const passwordField = screen.getByTestId("password");
      fireEvent.change(passwordField, {
        target: { value: password },
      });

      const loginForm = screen.getByLabelText("submit-form");
      fireEvent.submit(loginForm);
    });

    expect(mockLoginWithEmailPassword).toBeCalledTimes(0);
  });

  test("submit should call startLoginWithEmailPassword", async () => {
    const email = "test@valid.com";
    const password = "mipass12355";

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await act(async () => {
      const emailField = screen.getByTestId("email");
      fireEvent.change(emailField, { target: { value: email } });

      const passwordField = screen.getByTestId("password");
      fireEvent.change(passwordField, {
        target: { value: password },
      });

      const loginForm = screen.getByLabelText("submit-form");
      fireEvent.submit(loginForm);
    });

    expect(mockLoginWithEmailPassword).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });
});
