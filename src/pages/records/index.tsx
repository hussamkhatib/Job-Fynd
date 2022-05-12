function RedirectPage() {
  return;
}

export async function getServerSideProps() {
  return { redirect: { permanent: false, destination: "/records/overview" } };
}

export default RedirectPage;
