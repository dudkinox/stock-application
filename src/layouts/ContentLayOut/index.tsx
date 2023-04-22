import HeaderPageCommon from "../../common/HeaderPageCommon";

interface contentLayOutProps {
  title: string;
  topic: string;
  page: JSX.Element;
  btnHeader?: JSX.Element;
}

export default function ContentLayOut({
  title,
  topic,
  page,
  btnHeader
}: contentLayOutProps) {
  return (
    <div className="content-wrapper">
      <HeaderPageCommon title={title} />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="card col-12">
              <div className="card-header">
                <h2 className="card-title">{topic}</h2>
                {btnHeader}
              </div>
              {page}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
