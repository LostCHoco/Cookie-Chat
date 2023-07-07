import { useState } from "react"
import { Input } from "./signForm"

export const Setting = ()=>{
  const [pwd,setPwd] = useState("");
  return(
    <main>
      <form>
        <Input name="기존 비밀번호" hook={[pwd,setPwd]} type="password"/>
        <Input name="변경할 비밀번호" hook={[pwd,setPwd]} type="password"/>
        <input type="file" onChange={e=>console.dir(e)}/>
      </form>
    </main>
  )
}