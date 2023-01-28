import "./button.scss";

export const Button = ({ children, onClick, disabled }) => {
  return (
    <button onClick={() => onClick()} disabled={disabled}>
      {children}
    </button>
  );
};
