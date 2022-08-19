import React from "react";
import * as redux from "react-redux";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { RegisterPage } from "../../../../src/modules/auth/pages/RegisterPage";

const spy = jest.spyOn(redux, "useSelector");
spy.mockReturnValue({ username: "test" });

const mockRegisterFire = jest.fn();

jest.mock("../../../../src/modules/auth/hooks/useRegister", () => ({
  useRegister: () => {
    return {
      register: mockRegisterFire,
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

describe("Test in <RegisterPage/> page", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should show a create title correct", () => {
    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    expect(
      screen.getAllByText("AUTH.CREATE_ACCOUNT").length
    ).toBeGreaterThanOrEqual(1);
  });

  test("should be a call a register method with data", async () => {
    const displayName = "novauserone";
    const email = "nova@nova.com";
    const password = "passab2345";

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    await act(async () => {
      const nameField = screen.getByTestId("displayName");
      fireEvent.change(nameField, { target: { value: displayName } });

      const emailField = screen.getByTestId("email");
      fireEvent.change(emailField, { target: { value: email } });

      const passwordField = screen.getByTestId("password");
      fireEvent.change(passwordField, {
        target: { value: password },
      });

      const loginForm = screen.getByLabelText("submit-form");
      fireEvent.submit(loginForm);
    });

    expect(mockRegisterFire).toHaveBeenCalledWith({
      displayName,
      email,
      password,
    });
  });

  test("should be a call any because in invalid", async () => {
    const displayName = "nerone";
    const email = "novnova.com";
    const password = "p345";

    render(
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    );

    await act(async () => {
      const nameField = screen.getByTestId("displayName");
      fireEvent.change(nameField, { target: { value: displayName } });

      const emailField = screen.getByTestId("email");
      fireEvent.change(emailField, { target: { value: email } });

      const passwordField = screen.getByTestId("password");
      fireEvent.change(passwordField, {
        target: { value: password },
      });

      const loginForm = screen.getByLabelText("submit-form");
      fireEvent.submit(loginForm);
    });

    expect(mockRegisterFire).toBeCalledTimes(0);
  });
});
