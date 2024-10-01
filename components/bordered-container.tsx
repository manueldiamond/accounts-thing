export default function BorderedContainer({children,bordered=false,className}:{className?:string, bordered?:boolean,children:React.ReactNode}){
    return(
        <div className={`${className} w-max container px-6 py-4 rounded-xl border-dashed border border-inactive `}>
        {children}
        </div>
    )
}