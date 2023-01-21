interface TextInputProps {
  label: string;
  setValue: (value: string) => void;
  placeholder?: string;
  type: string;
  icon: string;
  min?: number | string;
  max?: number | string;
  id?: string;
  name?: string;
  maxLength?: number;
  minLength?: number;
  readonly?: boolean;
  value?: number | string;
  bgColor?: string;
}

export default function TextInput({
  label,
  setValue,
  placeholder,
  type,
  icon,
  min,
  max,
  id,
  name,
  maxLength,
  minLength,
  readonly,
  value,
  bgColor,
}: TextInputProps) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="float-left">
        {label}
      </label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon}></i>
          </span>
        </div>
        <input
          type={type}
          className={`form-control ${bgColor}`}
          maxLength={maxLength}
          minLength={minLength}
          min={min}
          max={max}
          id={id}
          name={name}
          onChange={(e: any) => setValue(e.target.value)}
          placeholder={placeholder}
          readOnly={readonly}
          value={value}
        />
      </div>
    </div>
  );
}
