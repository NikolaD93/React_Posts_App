import "./inputs.scss";

export const TextInput = ({
  label,
  value,
  id,
  onChange,
  type,
  placeholder,
}) => {
  return (
    <div className="input__wrapper">
      <div className="label">{label}</div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
};

export const TextArea = ({ label, value, id, onChange, type, placeholder }) => {
  return (
    <div className="texarea__wrapper">
      <div className="label">{label}</div>
      <textarea
        style={{ resize: "none" }}
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
