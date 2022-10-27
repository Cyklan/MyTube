import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { LogInContainer } from "../components/LogInContainer";

const SignIn: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-start w-screen flex-auto h-full">
        <LogInContainer
          onLogin={() => {}}
          onRegister={() => {}}
          registrationDisabled={false}
        />
      </div>
    </Layout>
  );
};

export default SignIn;
