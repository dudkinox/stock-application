interface HeaderPageCommonProps {
  title: string;
}

export default function HeaderPageCommon({ title }: HeaderPageCommonProps) {
  return (
    <div className="content-header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <h1 className="m-0">{title}</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item">
                <a href={`#${title}`}>{title}</a>
              </li>
              <li className="breadcrumb-item active">สบายโฟน</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
