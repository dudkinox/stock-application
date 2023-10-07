import { GetCustomerResponse } from "../Models/Response/GetCustomerResponse";

interface DataListProps {
  label: string;
  setValue: (value: string) => void;
  placeholder?: string;
  icon: string;
  maxLength?: number;
  minLength?: number;
  data?: GetCustomerResponse[];
  value?: string;
  isReadOnly?: boolean;
  id?: string;
}

export default function DataList({
  label,
  setValue,
  placeholder,
  icon,
  maxLength,
  minLength,
  data,
  value,
  isReadOnly,
  id,
}: DataListProps) {
  const isId = id !== undefined;
  return (
    <div className="form-group">
      <label className="float-left">{label}</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon}></i>
          </span>
        </div>
        <input
          className="form-control"
          list={isId ? id : "datalistOptions"}
          id={isId ? id : "exampleDataList"}
          minLength={minLength}
          maxLength={maxLength}
          onChange={(e: any) => setValue(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          readOnly={isReadOnly}
        />
        <datalist id={isId ? id : "datalistOptions"}>
          {isId
            ? data?.map((item: any) => (
                <option
                  key={item.ID}
                  label={`${item.ID} ${item.ID}`}
                  value={item.ID}
                />
              ))
            : data?.map((item: any, index) => (
                <option
                  key={index}
                  label={`${item.NAME} ${item.LAST_NAME}`}
                  value={item.ID_CARD}
                />
              )) ?? []}
        </datalist>
      </div>
    </div>
  );
}
