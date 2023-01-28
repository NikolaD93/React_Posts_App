import "./button.scss"

export const Button = ({ children, onClick }) => {
  return (
    <button onClick={() => onClick()}>
      {children}
    </button>
  );
};
