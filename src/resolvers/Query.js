async function feed(parent, args, context) {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter }
    ]
  } : {}
  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy
  })
  const count = await context.prisma
    .linksConnection({
      where,
    })
    .aggregate()
    .count()
  return {
    links,
    count,
  }
}

async function teams(parent, arg, context) {
  const result = await fetch("https://alpha-nuggets.aidigger.com/api/v1/teams", {
    "headers":{
      "cookie": "code=544586; session_id=skey/544586; skey=fPZZ+axHNpVyziVjPUlgKXALnnKOZrU3; username=5Zub5p2h55yJ5q+b; realname=5p6X6ZSm; thumb=/api/v1/avatar/544586/ac879795345cbf3dd26ab10372929dbb; hd=/api/v1/avatar/544586/6f76e6ebc5ec0ede9f112819953f1664; avatar=/api/v1/avatar/544586/ac879795345cbf3dd26ab10372929dbb; avatar_hd=/api/v1/avatar/544586/6f76e6ebc5ec0ede9f112819953f1664; SERVERID=ffd561f4600eae3fbcb1bd43a5c8e662|1556174550|1556174545"
      }
  }).then((res) => {
    return res.json()
  }).then((jsonData) => {
    return jsonData
  }).catch((err) => {
    console.error(err)
  })
  const teamlist = result.map((item) => {
    return {
      end_date: item.end_date,
      id: item.id,
      name: item.name,
      responsible: item.responsible,
      responsible_code: item.responsible_code,
      start_date: item.start_date,
      stages: item.stages
    }
  })
  console.log('result', teamlist)
  return teamlist
}

module.exports = {
  feed,
  teams
}