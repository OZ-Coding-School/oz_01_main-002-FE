
const loading = () => {
  return (
    <div className="w-full h-[calc(100vh-147px)] flex justify-center items-center text-[red] bg-[#222]">
      <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-t from-[#D1B383] to-white flex justify-center items-center animate-spin">
        <div className="w-[65px] h-[65px] rounded-full bg-[#222]"></div>
      </div>
    </div>
  )
}

export default loading