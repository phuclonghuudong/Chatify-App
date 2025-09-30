import { LoaderIcon } from "lucide-react";

const FormButton = ({ label, isLoading }) => {
  return (
    <>
      <button
        className="auth-btn cursor-pointer"
        type={"submit"}
        disabled={isLoading}
      >
        {isLoading ? (
          <LoaderIcon className="w-full h-5 animate-spin text-center" />
        ) : (
          label
        )}
      </button>
    </>
  );
};

export default FormButton;
