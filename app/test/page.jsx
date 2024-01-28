import React from 'react'

const Page = () => {

    const handleForm = async (formData) => {
        "use server"
        console.log(formData)
        const username = formData.get("username")
        console.log("Hello", username)
    }

  return (
    <div>
        <form action={handleForm}>
            <input type="text" name='username' id='username' />
            <button>Enviar</button>
        </form>
    </div>
  )
}

export default Page