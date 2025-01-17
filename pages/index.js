import Counter from "./components/counter";
import Header from "./components/header";

export default function Page() {
  async function onSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.target)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })
 
    // Handle response if necessary
    const data = await response.json()
    // ...
  }
  
  return (
<div className="justify-center align-center">
<Header/>
<form onSubmit={onSubmit}>
      <input type="email" name="name" />
      <button className="w-16 text-white bg-gray-800" type="submit">Submit</button>
    </form>
<Counter />


</div>
  
  
  
  )
}