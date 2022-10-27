import { FC, useState } from "react";
import { LoginForm } from "./LogInContainer/LoginForm";
import { RegisterForm } from "./LogInContainer/RegisterForm";

interface LogInContainer {
  onLogin: () => void;
  onRegister: () => void;
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

  return (
    <form
      className="card card-compact mt-20 w-96 bg-base-100 shadow-xl"
      onSubmit={(event) => {
        event.preventDefault();
        if (containerState === LogInContainerStates.LogIn) {
          return onLogin();
        }

        onRegister();
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
