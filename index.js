import { getSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Home({ session }) {
  return (
    <div style={{ margin: "20px" }}>
      <h1>欢迎，{session.user.name}！</h1>
      <p>这是首页，您已成功登录。</p>
      <div style={{ margin: "10px 0" }}>
        <Link href="/patents">进入专利查询系统</Link>
      </div>
      <button onClick={() => signOut({ callbackUrl: "/login" })}>退出登录</button>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: { destination: "/login", permanent: false },
    }
  }
  return { props: { session } }
}