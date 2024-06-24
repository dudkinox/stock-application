import HeaderPageCommon from "../../common/HeaderPageCommon";

interface contentLayOutProps {
  title: string;
  topic: string;
  topicFunds?: string;
  page: JSX.Element;
  pageFunds?: JSX.Element;
  btnHeader?: JSX.Element;
  btnHeaderFunds?: JSX.Element;
  filter?: JSX.Element;
}

export default function ContentLayOut({
  title,
  topic,
  topicFunds,
  page,
  pageFunds,
  btnHeader,
  btnHeaderFunds,
  filter,
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
              <div className="card-title">{filter}</div>
              {page}
            </div>
            {topicFunds === "" || topicFunds === undefined ? (
              <></>
            ) : (
              <div className="card col-12">
                <div className="card-header">
                  <h2 className="card-title">{topicFunds}</h2>
                  {btnHeaderFunds}
                </div>
                {pageFunds}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
