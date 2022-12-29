interface TextInputProps {
  label: string;
  setValue: (value: string) => void;
  placeholder?: string;
  type: string;
  icon: string;
  maxLength?: number;
  minLength?: number;
}

export default function TextInput({
  label,
  setValue,
  placeholder,
  type,
  icon,
  maxLength,
  minLength,
}: TextInputProps) {
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
          type={type}
          className="form-control"
          maxLength={maxLength}
          minLength={minLength}
          onChange={(e: any) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
