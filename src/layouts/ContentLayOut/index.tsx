import HeaderPageCommon from "../../common/HeaderPageCommon";

interface contentLayOutProps {
  title: string;
  topicIncome: string;
  topicFunds: string;
  pageIncome: JSX.Element;
  pageFunds: JSX.Element;
  btnHeaderIncome?: JSX.Element;
  btnHeaderFunds?: JSX.Element;
}

export default function ContentLayOut({
  title,
  topicIncome,
  topicFunds,
  pageIncome,
  pageFunds,
  btnHeaderIncome,
  btnHeaderFunds
}: contentLayOutProps) {
  return (
    <div className="content-wrapper">
      <HeaderPageCommon title={title} />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="card col-12">
              <div className="card-header">
                <h2 className="card-title">{topicIncome}</h2>
                {btnHeaderIncome}
              </div>
              {pageIncome}
            </div>
            <div className="card col-12">
              <div className="card-header">
                <h2 className="card-title">{topicFunds}</h2>
                {btnHeaderFunds}
              </div>
              {pageFunds}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
