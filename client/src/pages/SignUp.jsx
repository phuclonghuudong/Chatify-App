import { LockIcon, MailIcon, MessageCircleIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import AuthFooter from "../components/AuthFooter";
import AuthHeader from "../components/AuthHeader";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";
import { PATHS } from "../lib/path";
import { useAuthStore } from "../store/useAuthStore";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleOnchange = (event) => {
    const { name, value } = event.target;

    setFormData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
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
                  title={"Create Account"}
                  subTitle={"Sign up for a new account"}
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                  <FormInput
                    icon={UserIcon}
                    label={"Full Name"}
                    name={"fullName"}
                    value={formData.fullName}
                    onChange={handleOnchange}
                    placeholder={"John Doe"}
                    autoFocus
                  />
                  <FormInput
                    icon={MailIcon}
                    label={"Email"}
                    name={"email"}
                    value={formData.email}
                    onChange={handleOnchange}
                    type={"email"}
                    placeholder="johndoe@gmail.com"
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
                  <FormButton
                    isLoading={isSigningUp}
                    label={"Create Account"}
                  />
                </form>

                <AuthFooter
                  path={PATHS?.LOGIN}
                  title={"Already have an account? Login"}
                />
              </div>
            </div>

            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src={"/signup.png"}
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Start Your Journey Today
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Free</span>
                    <span className="auth-badge">Easy Setup</span>
                    <span className="auth-badge">Private</span>
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

export default SignUp;
