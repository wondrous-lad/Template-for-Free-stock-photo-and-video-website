import Axios from "axios"
import React, { useState, useRef } from "react"

function CreateNewForm(props) {
  const [name, setName] = useState("")
  const [tag, setTag] = useState("")
  const [file, setFile] = useState("")
  const CreatePhotoField = useRef()

  async function submitHandler(e) {
    e.preventDefault()
    const data = new FormData()
    data.append("photo", file)
    data.append("name", name)
    data.append("tag", tag)
    setName("")
    setTag("")
    setFile("")
    CreatePhotoField.current.value = ""
    const newPhoto = await Axios.post("/create-stockimage", data, { headers: { "Content-Type": "multipart/form-data" } })
    props.setStockImages(prev => prev.concat([newPhoto.data]))
  }

  return (
    <form className="p-3 bg-success bg-opacity-25 mb-5" onSubmit={submitHandler}>
      <div className="mb-2">
        <input ref={CreatePhotoField} onChange={e => setFile(e.target.files[0])} type="file" className="form-control" />
      </div>
      <div className="mb-2">
        <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control" placeholder="User name" />
      </div>
      <div className="mb-2">
        <input onChange={e => setTag(e.target.value)} value={tag} type="text" className="form-control" placeholder="Tag" />
      </div>

      <button className="btn btn-success">Add New StockImage</button>
    </form>
  )
}

export default CreateNewForm