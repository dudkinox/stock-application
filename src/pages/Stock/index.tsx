import StockLayout from "../../layouts/stock";

export default function StockPage() {
  return (
    <div className="wrapper">
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="card col-12 mt-5">
                <div className="card-header">
                  <h2 className="card-title">สต๊อกสินค้า</h2>
                </div>
                <StockLayout />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
