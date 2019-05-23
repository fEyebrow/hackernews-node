
function stages(parent, args, context) {
  let result =  parent.stages.map((item) => {
    return {
      cost: item.cost,
      editor_num: item.editor_num,
      kpi: item.kpi,
      stage: item.stage,
      start_date: item.start_date,
      end_date: item.end_date
    }
  })
  return result
}

module.exports = {
  stages
}
