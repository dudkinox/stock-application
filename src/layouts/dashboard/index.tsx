import HeaderMainContent from "./HeaderMainContent";
import ChartMainContent from "./ChartMainContent";

export default function MainContentLayout() {
  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <iframe
            className="w-100 vh-90 mt-2"
            src="https://lookerstudio.google.com/embed/reporting/70820d12-7285-4e25-a251-b0ab96e4e583/page/lBzMD"
            allowFullScreen
          />
        </div>
      </section>
    </>
  );
}
