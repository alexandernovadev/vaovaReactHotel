import React from "react";
import { AppRouter } from "../../src/router/AppRouter";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useCheckAuth } from "../../src/hooks/useCheckAuth";

import * as redux from "react-redux";
const spy = jest.spyOn(redux, "useSelector");
spy.mockReturnValue({ username: "test" });

jest.mock("../../src/hooks/useCheckAuth");

jest.mock("../../src/assets/logo-vaova-white-1.png", () => "image.png");
jest.mock("../../src/assets/avatarnone.png", () => "image.png");

jest.mock("../../src/firebase/providers", () => ({
  GoogleAuthProvider: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: () => mockDispatch,
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

describe("Test in AppRoutes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should show the title loading", () => {
    useCheckAuth.mockReturnValue("process");

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(
      "COMMON.LOADING"
    );
  });

  test("should show the title loading", () => {
    useCheckAuth.mockReturnValue("authenticated");
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 5 }).innerHTML).toContain(
      "HOTEL.SAVE_HOTEL"
    );

    const { src, alt } = screen.getByRole("img");
    expect(src).toBe("http://localhost/image.png");
    expect(alt).toBe("Logo Vaova");
  });
});
