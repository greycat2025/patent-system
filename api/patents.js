export default function handler(req, res) {
  const { q, cat1, cat2 } = req.query;
  let patents = [
    { id: 1, applicationNumber: "20210101", name: "智能家电控制方法", inventor: "张三", applicationDate: "2021-01-01", categoryLevel1: "家电", categoryLevel2: "控制方法" },
    { id: 2, applicationNumber: "20210202", name: "手机屏幕保护结构", inventor: "李四", applicationDate: "2021-02-02", categoryLevel1: "手机", categoryLevel2: "硬件结构" },
    { id: 3, applicationNumber: "20210303", name: "电视信号处理电路", inventor: "王五", applicationDate: "2021-03-03", categoryLevel1: "电视", categoryLevel2: "信号处理" },
    { id: 4, applicationNumber: "20210404", name: "电视外壳散热设计", inventor: "赵六", applicationDate: "2021-04-04", categoryLevel1: "电视", categoryLevel2: "散热设计" },
    { id: 5, applicationNumber: "20210505", name: "空调节能控制系统", inventor: "孙七", applicationDate: "2021-05-05", categoryLevel1: "家电", categoryLevel2: "节能系统" }
  ];
  if (q) {
    const query = q.toLowerCase();
    patents = patents.filter(p => 
      p.applicationNumber.includes(query) ||
      p.name.includes(query) ||
      p.inventor.includes(query)
    );
  }
  if (cat1 && cat2) {
    patents = patents.filter(p => p.categoryLevel1 === cat1 && p.categoryLevel2 === cat2);
  }
  res.status(200).json(patents);
}