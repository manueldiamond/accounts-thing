
const PercentNotice=({percent=0, period = 'month'})=>{
    const changes=!percent?'No changes':(percent)>=0?'Increased':'decreased'
    return(
      <div className= {`text-xs flex gap-1 ${percent&&(changes==='Increased'?'text-positive':'text-error')}`} >
        <span className={`${percent&&(changes==='Increased'?'bg-positive/15':'bg-error/15')} rounded-[4px] px-[6px] py-[2x]`} >{changes==='decreased'?'-':'+'}{Math.abs(percent)}%</span>
        <span>{changes} this {period}</span>
      </div>
    )
  }

export default PercentNotice