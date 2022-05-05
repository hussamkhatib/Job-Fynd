function RedirectPage() {
  return;
}

export async function getServerSideProps() {
  return { redirect: { permanent: false, destination: "/record/overview" } };
}

export default RedirectPage;
