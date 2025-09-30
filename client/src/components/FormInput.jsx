const FormInput = ({
  icon: ICON,
  label,
  value,
  onChange,
  placeholder,
  type,
  autoFocus,
  name,
}) => {
  return (
    <div>
      <label className="auth-input-label">{label ?? null}</label>
      <div className="relative">
        <ICON className="auth-input-icon" />

        <input
          type={type ? type : "text"}
          name={name}
          value={value}
          onChange={onChange}
          className="input"
          placeholder={placeholder}
          autoFocus={autoFocus ? true : false}
        />
      </div>
    </div>
  );
};

export default FormInput;
