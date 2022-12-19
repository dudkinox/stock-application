import StockLayout from "../layouts/stock";

export default function Stock() {
  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card mt-5">
                <div className="card-header">
                  <h3 className="card-title">สต๊อกสินค้า</h3>
                </div>
                <StockLayout />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
