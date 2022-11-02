import { FC, useEffect, useState } from "react";

interface RegisterFormProps {
  switchForm: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ switchForm }) => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    if (password !== passwordRepeat) {
      setButtonEnabled(false);
      return;
    }

    if (
      !new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-\+]).{8,}$/g
      ).test(password)
    ) {
      setButtonEnabled(false);
      return;
    }

    setButtonEnabled(true);
  }, [password, passwordRepeat]);

  return (
    <>
      <h2 className="card-title justify-center text-3xl uppercase">Register</h2>
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          placeholder="Repeat Password"
          type="password"
          className="input w-full input-primary input-bordered !outline-none"
          name="password-repeat"
          onChange={(e) => setPasswordRepeat(e.target.value)}
          value={passwordRepeat}
        />
      </div>
      <div className="card-actions !items-center flex-col mt-4">
        <button
          disabled={!buttonEnabled}
          type="submit"
          className="btn btn-primary"
        >
          Register
        </button>
        <p className="flex flex-col items-center text-xs w-full">
          Already have an account?
          <br />
          <button
            onClick={switchForm}
            type="button"
            className="text-secondary underline"
          >
            Log in instead
          </button>
        </p>
      </div>
    </>
  );
};
