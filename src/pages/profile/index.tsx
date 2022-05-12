function RedirectPage() {
  return;
}

export async function getServerSideProps() {
  return { redirect: { permanent: false, destination: "/profile/overview" } };
}

export default RedirectPage;
