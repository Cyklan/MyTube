import { FC } from "react";

interface LoginFormProps {
  switchForm: () => void;
  registrationDisabled: boolean;
}

export const LoginForm: FC<LoginFormProps> = ({
  switchForm,
  registrationDisabled,
}) => {
  return (
    <>
      <h2 className="card-title justify-center text-3xl uppercase">Log in</h2>
      <div className="flex flex-col gap-4 mt-4">
        <input
          placeholder="Username"
          type="text"
          className="input w-full input-primary input-bordered !outline-none"
          name="username"
        />
        <input
          placeholder="Password"
          type="password"
          className="input w-full input-primary input-bordered !outline-none"
          name="password"
        />
      </div>
      <div className="card-actions !items-center flex-col mt-4">
        <button type="submit" className="btn btn-primary">
          Log in
        </button>
        {!registrationDisabled && (
          <p className="flex flex-col items-center text-xs">
            Need an account?
            <br />
            <button
              onClick={switchForm}
              type="button"
              className="text-secondary underline"
            >
              Sign up here
            </button>
          </p>
        )}
      </div>
    </>
  );
};
