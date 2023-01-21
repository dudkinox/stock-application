interface SelectChoiceProps {
  label: string;
  setValue: (value: string) => void;
  placeholder?: string;
  icon: string;
  topic: string;
  options: string[];
  value: string;
}

export default function SelectChoice({
  label,
  setValue,
  placeholder,
  icon,
  topic,
  options,
  value,
}: SelectChoiceProps) {
  return (
    <div className="form-group">
      <label className="float-left">{label}</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon}></i>
          </span>
        </div>
        <select
          className="form-control"
          onChange={(e: any) => setValue(e.target.value)}
          placeholder={placeholder}
          value={value}
        >
          <option hidden selected>
            {topic}
          </option>
          {options.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
