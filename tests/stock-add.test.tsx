import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StockAddPage from "../src/pages/Stock/add";
import { StockContext } from "../src/contexts/StockContext";
import StockService from "../src/services/StockServices";

vi.mock("../src/services/StockServices", () => ({ default: { UpdateStock: vi.fn(() => new Promise(() => {})) } }));
vi.mock("../src/common/ToastrCommon", () => ({ AlertError: vi.fn(), AlertSuccess: vi.fn() }));
vi.mock("../src/layouts/ContentLayOut", () => ({ default: ({ page }: any) => page }));
vi.mock("../src/layouts/stock/ByeMenuInsert", async () => {
  const { useEffect } = await import("react");
  return { default: ({ setEdit }: any) => {
    useEffect(() => { setEdit({ stockType: "ซื้อ", major: "A", payload: { ID: "2486", PRICE: 100 } }); }, [setEdit]);
    return null;
  } };
});
vi.mock("../src/layouts/stock/KayMenuInsert", () => ({ default: () => null }));
vi.mock("../src/layouts/stock/IsMenuInsert", () => ({ default: () => null }));
vi.mock("../src/layouts/stock/InstallmentMenuInsert", () => ({ default: () => null }));

function open(search: string, state: any, updateKey = false) {
  const handlerSubmit = vi.fn();
  render(<StockContext.Provider value={{ handlerSubmit, updateKey, isMenuInsert: false } as any}>
    <MemoryRouter initialEntries={[{ pathname: "/stock/add", search, state }]}><StockAddPage /></MemoryRouter>
  </StockContext.Provider>);
  fireEvent.click(screen.getByRole("button", { name: "บันทึก" }));
  return handlerSubmit;
}

describe("stock save mode", () => {
  it("updates an existing URL ID after a refresh resets context", () => {
    const insert = open("?type=bye&id=2486", null);
    expect(StockService.UpdateStock).toHaveBeenCalledWith("2486", "ซื้อ", { ID: "2486", PRICE: 100 }, "A");
    expect(insert).not.toHaveBeenCalled();
  });
  it("inserts a new record even with a stale edit flag", () => {
    expect(open("?type=bye", { id: 0 }, true)).toHaveBeenCalledOnce();
    expect(StockService.UpdateStock).not.toHaveBeenCalled();
  });
  it("creates a sale from an existing purchase ID without updating", () => {
    expect(open("?type=kay", { id: "42" })).toHaveBeenCalledOnce();
    expect(StockService.UpdateStock).not.toHaveBeenCalled();
  });
  it("blocks saving an edit before its payload has loaded", () => {
    open("?type=equipment&id=42", null);
    expect((screen.getByRole("button", { name: "บันทึก" }) as HTMLButtonElement).disabled).toBe(true);
    expect(StockService.UpdateStock).not.toHaveBeenCalled();
  });
});
