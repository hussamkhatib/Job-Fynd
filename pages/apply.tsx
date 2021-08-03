import useSWR from 'swr'
import ApplyComp from '../components/ApplyComp';


const registerUser = async event => {
  event.preventDefault()

  const res = await fetch('/api/hello', {
    body: JSON.stringify({
      title: event.target.name.value
    }),
    method: 'POST'
  })

  const result = await res.json()
  return result
  // result.user => 'Ada Lovelace'
}
function Apply() {


  return (
    <>
    <form onSubmit={registerUser}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" type="text" autoComplete="name" required />
      <button type="submit">Register</button>
    </form>
    </>
  );
}

export default Apply;
