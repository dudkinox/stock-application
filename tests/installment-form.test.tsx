import { describe, it, expect, vi } from "vitest";
import { render, waitFor, act } from "@testing-library/react";
import InstallmentMenuInsert from "../src/layouts/stock/InstallmentMenuInsert";
import { StockContext } from "../src/contexts/StockContext";
import StockService from "../src/services/StockServices";

vi.mock("../src/services/StockServices", () => ({ default: {
  GetStockBye: vi.fn(async () => ({ data: [] })),
  GetStockKay: vi.fn(async () => ({ data: [] })),
} }));
vi.mock("../src/services/PaymentService", () => ({ default: {} }));
vi.mock("../src/common/Modal", () => ({ default: () => null }));

function form(documentId: string, setPriceTotal = vi.fn()) {
  return <StockContext.Provider value={{ documentId, setPriceTotal, setStockType: vi.fn(), setInstallmentNo: vi.fn(), setDocumentId: vi.fn(), priceTotal: "", installmentNo: 1 } as any}>
    <InstallmentMenuInsert id="0" isEditing={false} setEdit={vi.fn()} edit={{ stockType: "", major: "", payload: {} }} />
  </StockContext.Provider>;
}

describe("installment document lookup", () => {
  it("does not request sales for a blank document", () => {
    render(form(""));
    expect(StockService.GetStockKay).not.toHaveBeenCalled();
  });
  it("clears the amount when the document does not exist", async () => {
    const setPrice = vi.fn();
    render(form("missing", setPrice));
    await waitFor(() => expect(StockService.GetStockKay).toHaveBeenCalledOnce());
    expect(setPrice).toHaveBeenLastCalledWith("");
  });
  it("matches numeric API IDs with the text input ID", async () => {
    vi.mocked(StockService.GetStockKay).mockResolvedValueOnce({ data: [{ ID: 42, INSTALLMENT: "500", CUSTOMER: "Test", ID_CARD: "test" }] } as any);
    const setPrice = vi.fn();
    render(form("42", setPrice));
    await waitFor(() => expect(setPrice).toHaveBeenLastCalledWith("500"));
  });
  it("ignores a late response after the selected document changes", async () => {
    let resolve!: (value: any) => void;
    vi.mocked(StockService.GetStockKay).mockReturnValueOnce(new Promise((done) => { resolve = done; }));
    const setPrice = vi.fn();
    const view = render(form("42", setPrice));
    view.rerender(form("", setPrice));
    await act(async () => { resolve({ data: [{ ID: 42, INSTALLMENT: "999" }] }); });
    expect(setPrice).toHaveBeenLastCalledWith("");
    expect(setPrice).not.toHaveBeenCalledWith("999");
  });
});
