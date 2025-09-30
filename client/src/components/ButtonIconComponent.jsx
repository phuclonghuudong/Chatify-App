const ButtonIconComponent = ({ icon: ICON, onClick }) => {
  return (
    <button
      className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <ICON className="size-5" />
    </button>
  );
};

export default ButtonIconComponent;
