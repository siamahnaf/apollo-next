import type { NextPage, GetServerSideProps } from "next";

//Layout
import Layout from "Layout";

//Apollo
import { initializeApollo } from "Apollo/client";
import { GET_USERS_LIST, GET_PROFILE } from "Apollo/Query/user.query";
import { GET_CONVERSATION_LIST } from "Apollo/Query/conversation.query";

const Home: NextPage = () => {
  return (
    <Layout />
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo()
  await apolloClient.query({
    query: GET_USERS_LIST,
    context: { headers: { authorization: `Bearer ${ctx.req.cookies["session"]}` } },
    variables: { userPrams: {} }
  })
  await apolloClient.query({
    query: GET_PROFILE,
    context: { headers: { authorization: `Bearer ${ctx.req.cookies["session"]}` } }
  })
  await apolloClient.query({
    query: GET_CONVERSATION_LIST,
    context: { headers: { authorization: `Bearer ${ctx.req.cookies["session"]}` } }
  })
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    }
  }
}