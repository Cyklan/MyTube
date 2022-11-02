import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { LogInContainer } from "../components/LogInContainer";
import { APIError } from "../model/APIError";
import { login } from "../utils/login";
import { register } from "../utils/register";
import { saveUserTokenToCookies } from "../utils/saveUserTokenToCookies";

const SignIn: NextPage = () => {
  const [error, setError] = useState<APIError | null>(null);
  const router = useRouter();
  return (
    <Layout>
      <div className="flex flex-col items-center justify-start w-screen flex-auto h-full">
        <LogInContainer
          onLogin={async (payload) => {
            login(payload)
              .then(({ token }) => saveUserTokenToCookies(token))
              .then(() => {
                router.push("/");
              })
              .catch((error: Error) => setError(JSON.parse(error.message)));
          }}
          onRegister={(payload) => {
            register(payload)
              .then(({ token }) => saveUserTokenToCookies(token))
              .then(() => {
                router.push("/");
              })
              .catch((error: Error) => setError(JSON.parse(error.message)));
          }}
          registrationDisabled={false}
        />
      </div>
    </Layout>
  );
};

export default SignIn;
