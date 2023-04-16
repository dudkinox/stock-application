export default function DataStudio() {
  return (
    <section className="content">
      <div className="container-fluid">
        <iframe
          width={600}
          height={450}
          src="https://lookerstudio.google.com/embed/reporting/70820d12-7285-4e25-a251-b0ab96e4e583/page/lBzMD"
          frameBorder={0}
          style={{ border: 0 }}
          allowFullScreen
        />
      </div>
    </section>
  );
}
