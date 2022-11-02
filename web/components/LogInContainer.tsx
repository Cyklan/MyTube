import { FC, useRef, useState } from "react";
import { formDataToJSON } from "../utils/formDataToJSON";
import { LoginForm } from "./LogInContainer/LoginForm";
import { RegisterForm } from "./LogInContainer/RegisterForm";

interface LogInContainer {
  onLogin: (payload: string) => void;
  onRegister: (payload: string) => void;
  registrationDisabled: boolean;
}

enum LogInContainerStates {
  LogIn,
  Register,
}

export const LogInContainer: FC<LogInContainer> = ({
  onLogin,
  onRegister,
  registrationDisabled,
}) => {
  const [containerState, setContainerState] = useState(
    LogInContainerStates.LogIn
  );
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className="card card-compact mt-20 w-96 bg-base-100 shadow-xl"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current ?? undefined);
        const payload = formDataToJSON(formData);
        if (containerState === LogInContainerStates.LogIn) {
          return onLogin(payload);
        }

        onRegister(payload);
      }}
    >
      <div className="card-body">
        {containerState === LogInContainerStates.LogIn ? (
          <LoginForm
            registrationDisabled={registrationDisabled}
            switchForm={() => setContainerState(LogInContainerStates.Register)}
          />
        ) : (
          <RegisterForm
            switchForm={() => setContainerState(LogInContainerStates.LogIn)}
          />
        )}
      </div>
    </form>
  );
};
