import React, { useState } from "react";
import {
  MenuByeArray,
  MenuEquipmentArray,
  MenuInstallmentPaymentArray,
} from "../../enum/menuInsert.enum";
import StockService from "../../services/StockServices";

interface DetailModalProps {
  idCard: string;
  typeStock: string;
}

export default function DetailModal({ idCard, typeStock }: DetailModalProps) {
  const [show, setShow] = useState(false);
  const [itemList, setItemList] = useState<any>({});

  const toggleShow = () => {
    StockService.GetDetailStockService(idCard).then((res) => {
      setItemList(res.data);
      setShow(true);
    });
  };

  return (
    <>
      <button
        className="btn primary-btn text-white"
        data-toggle="modal"
        data-target="#DetailStock"
        onClick={toggleShow}
      >
        รายละเอียด
      </button>

      <div
        className={`modal fade ${show ? "show" : ""}`}
        id="DetailStock"
        tabIndex={-1}
        aria-labelledby="DetailStockLabel"
        role="dialog"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">รายละเอียด {typeStock}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row justify-content-center col-12 mb-3">
                  {Object.keys(itemList).map((key, index) => {
                    if (index > 1) {
                      return (
                        <>
                          <div className="col-2 my-3">
                            <label className="col-form-label">
                              {typeStock === "อุปกรณ์"
                                ? MenuEquipmentArray[index - 2]
                                : typeStock === "ซื้อ"
                                ? MenuByeArray[index - 2]
                                : typeStock === "ขาย"
                                ? MenuByeArray[index - 2]
                                : MenuInstallmentPaymentArray[index - 2]}
                            </label>
                          </div>
                          <div className="col-4 my-3">
                            <input
                              type="text"
                              className="form-control col-auto"
                              placeholder=""
                              value={itemList[key]}
                              readOnly
                            />
                          </div>
                        </>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <button
                type="button"
                className="btn btn-danger col-3"
                data-dismiss="modal"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
