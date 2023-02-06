import "./inputs.scss";

export const TextInput = ({
  value,
  id,
  onChange,
  type,
  placeholder,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="input__wrapper">
      <input
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export const TextArea = ({ value, id, onChange, type, placeholder }) => {
  return (
    <div className="textarea__wrapper">
      <textarea
        type={type}
        value={value}
        onChange={onChange}
        id={id}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
