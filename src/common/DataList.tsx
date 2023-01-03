interface DataListProps {
  label: string;
  setValue: (value: string) => void;
  placeholder?: string;
  icon: string;
  maxLength?: number;
  minLength?: number;
  data: string[];
  value?: string;
  isReadOnly?: boolean;
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
}: DataListProps) {
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
          list="datalistOptions"
          id="exampleDataList"
          minLength={minLength}
          maxLength={maxLength}
          onChange={(e: any) => setValue(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          value={value}
          readOnly={isReadOnly}
        />
        <datalist id="datalistOptions">
          {data.map((item, index) => (
            <option key={index} value={item} />
          ))}
        </datalist>
      </div>
    </div>
  );
}
