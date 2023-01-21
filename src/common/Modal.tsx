interface ModalCommonProps {
  title: string;
  content: JSX.Element;
  id: string;
}

export default function ModalCommon({ title, content, id }: ModalCommonProps) {
  return (
    <div className="modal fade" id={id} tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
}
