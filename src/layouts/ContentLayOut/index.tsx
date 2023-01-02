import HeaderPageCommon from "../../common/HeaderPageCommon";

interface contentLayOutProps {
  title: string;
  topic: string;
  page: JSX.Element;
}

export default function ContentLayOut({
  title,
  topic,
  page,
}: contentLayOutProps) {
  return (
    <div className="content-wrapper">
      <HeaderPageCommon title={title} />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="card col-12 mt-5">
              <div className="card-header">
                <h2 className="card-title">{topic}</h2>
              </div>
              {page}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
