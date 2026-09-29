import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  sessionStorage.clear();
  vi.restoreAllMocks();
});

vi.mock("../src/contexts", async () => {
  const { createContext } = await import("react");
  return { AppContext: createContext({ majorUser: "admin", setIsLoading: () => {} }) };
});
vi.mock("../src/contexts/StockContext", async () => {
  const { createContext } = await import("react");
  return { StockContext: createContext({}) };
});
