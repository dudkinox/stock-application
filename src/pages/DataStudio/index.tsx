export default function DataStudio() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Data Studio</h3>
            </div>
            <div className="card-body">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  width={600}
                  height={350}
                  src="https://lookerstudio.google.com/embed/reporting/70820d12-7285-4e25-a251-b0ab96e4e583/page/lBzMD"
                  frameBorder={0}
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
