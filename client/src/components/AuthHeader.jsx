const AuthHeader = ({ icon: ICON, title, subTitle }) => {
  return (
    <div className="text-center mb-8">
      <ICON className="w-12 h-12 mx-auto text-slate-400 mb-4" />
      <h2 className="text-2xl font-bold text-slate-200 mb-2">{title}</h2>
      <p className="text-slate-400">{subTitle}</p>
    </div>
  );
};

export default AuthHeader;
