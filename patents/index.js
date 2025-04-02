import { useEffect, useState } from "react"
import { getSession } from "next-auth/react"

const categories = {
  "家电": ["控制方法", "节能系统"],
  "手机": ["硬件结构"],
  "电视": ["信号处理", "散热设计"],
}

export default function PatentsPage() {
  const [patents, setPatents] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetch("/api/patents")
      .then(res => res.json())
      .then(setPatents)
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    const res = await fetch(`/api/patents?q=${query}`)
    const data = await res.json()
    setPatents(data)
  }

  const handleCategoryClick = async (cat1, cat2) => {
    const res = await fetch(`/api/patents?cat1=${cat1}&cat2=${cat2}`)
    const data = await res.json()
    setPatents(data)
  }

  return (
    <div style={{ display: "flex", margin: "20px" }}>
      <div style={{ width: "200px", marginRight: "20px" }}>
        <h3>分类目录</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {Object.entries(categories).map(([cat1, sub]) => (
            <li key={cat1}>
              <strong>{cat1}</strong>
              <ul style={{ paddingLeft: "15px" }}>
                {sub.map(cat2 => (
                  <li key={cat2}>
                    <a href="#" onClick={() => handleCategoryClick(cat1, cat2)}>{cat2}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ flex: 1 }}>
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="搜索申请号/名称/发明人" value={query} onChange={e => setQuery(e.target.value)} />
          <button type="submit">搜索</button>
        </form>
        <table border="1" cellPadding="6" style={{ marginTop: "10px", width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>申请号</th><th>名称</th><th>发明人</th><th>申请日</th><th>一级分类</th><th>二级分类</th>
            </tr>
          </thead>
          <tbody>
            {patents.map(p => (
              <tr key={p.id}>
                <td>{p.applicationNumber}</td>
                <td>{p.name}</td>
                <td>{p.inventor}</td>
                <td>{p.applicationDate}</td>
                <td>{p.categoryLevel1}</td>
                <td>{p.categoryLevel2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  return { props: {} }
}