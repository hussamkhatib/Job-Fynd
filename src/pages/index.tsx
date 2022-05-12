function RedirectPage() {
  return;
}

export async function getServerSideProps() {
  return { redirect: { permanent: false, destination: "/dashboard" } };
}

export default RedirectPage;
