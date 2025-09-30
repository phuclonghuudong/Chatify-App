import { LockIcon, MailIcon, MessageCircleIcon } from "lucide-react";
import { useState } from "react";
import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { PATHS } from "../lib/path";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-5xl h-full">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            <div className="md:w-1/2 p-4 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <AuthHeader
                  icon={MessageCircleIcon}
                  title={"Welcome Back"}
                  subTitle={"Login to access your account"}
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormInput
                    icon={MailIcon}
                    label={"Email"}
                    name={"email"}
                    value={formData.email}
                    onChange={handleOnchange}
                    type={"email"}
                    placeholder="johndoe@gmail.com"
                    autoFocus
                  />
                  <FormInput
                    icon={LockIcon}
                    label={"Password"}
                    name={"password"}
                    value={formData.password}
                    onChange={handleOnchange}
                    type={"password"}
                    placeholder="Enter your password"
                  />
                  <FormButton isLoading={isLoggingIn} label={"Sign in"} />
                </form>

                <AuthFooter
                  path={PATHS?.SIGNUP}
                  title={"Don't have an account? Sign up"}
                />
              </div>
            </div>

            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src={"/login.png"}
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Connect Anytime, Anywhere
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Secure</span>
                    <span className="auth-badge">Fash</span>
                    <span className="auth-badge">Reliable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
};

export default LoginPage;
