import { it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfitTable from "../src/pages/ProfitTable";

vi.mock("../src/common/DataTable", () => ({ default: vi.fn(), destroyTable: vi.fn() }));
vi.mock("../src/common/HeaderPageCommon", () => ({ default: () => null }));
vi.mock("../src/layouts/stock/AllRecordsTable", () => ({ default: () => null }));
vi.mock("../src/services/StockServices", () => ({ default: {
  GetProfitTable: vi.fn(async () => ({ data: [{ MAJOR: "Branch A", TOTAL_BUY: 900, TOTAL_STAR_MONEY: 200, TOTAL_INSTALLMENT: 50, TOTAL_EQUIPMENT: 30, TOTAL_EXPENSE: 10, TUN: 5, TOTAL_NET: -630 }] })),
} }));

it("keeps purchase and down-payment totals under their own columns", async () => {
  const { container } = render(<ProfitTable />);
  await screen.findByText("Branch A");
  fireEvent.click(container.querySelector("input.row-check")!);
  const totals = [...container.querySelectorAll("tfoot th")].map((node) => node.textContent);
  expect(totals.slice(0, 5)).toEqual(["รวม", "900 บาท", "200 บาท", "50 บาท", "30 บาท"]);
});
