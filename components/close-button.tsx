const CloseButton=({onClick}:{onClick:Function})=>{
    return(
        <button onClick={onClick as any} className="bg-[#F5F5F5] text-white rounded-full aspect-square size-[48px]  flex items-center justify-center hover:bg-light-texts hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
    )
}

export default CloseButton