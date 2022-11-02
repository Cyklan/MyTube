import type { GetServerSidePropsContext, NextPage } from "next";
import { parseCookies } from "nookies";
import { Layout } from "../components/Layout";
import { decode } from "jsonwebtoken";
import { fetchUser } from "../utils/fetchUser";
import { User } from "../model/User";

interface HomeProps {
  user?: User;
}

const Home: NextPage<HomeProps> = ({ user }) => {
  return (
    <Layout user={user}>
      <p>Latest videos</p>
      <p>Subscriptions</p>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = parseCookies(ctx);
  const userToken = cookies["user-token"];
  if (!userToken) {
    return {
      props: {},
    };
  }

  const payload = decode(userToken);
  console.log(payload);

  if (!payload) {
    return {
      props: {},
    };
  }

  try {
    const user = await fetchUser({
      userId: payload.sub?.toString()!,
    });
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
}

export default Home;
