function RedirectPage() {
  return;
}

export async function getServerSideProps() {
  return { redirect: { permanent: false, destination: "/profile/edit" } };
}

export default RedirectPage;
