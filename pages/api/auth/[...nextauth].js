import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials
        if (username === "admin" && password === "admin") {
          return { id: "1", name: "管理员" }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
})