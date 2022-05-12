function RedirectPage() {
  return;
}

export async function getServerSideProps() {
  return {
    redirect: { permanent: false, destination: "/placementreports/companies" },
  };
}

export default RedirectPage;
