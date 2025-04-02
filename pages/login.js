import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signIn("credentials", {
      redirect: true,
      username,
      password,
      callbackUrl: "/",
    })
  }

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h1>登录系统</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>用户名: </label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>密码: </label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div style={{ marginTop: "10px" }}>
          <button type="submit">登录</button>
        </div>
      </form>
    </div>
  )
}