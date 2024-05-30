
const EmailLoading = () => {
  return (
    <div className="absolute w-full z-10">
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-[2px]">
        <div className="w-[80px] h-[80px] rounded-full bg-gradient-to-t from-[#D1B383] to-white flex justify-center items-center animate-spin">
          <div className="w-[65px] h-[65px] rounded-full bg-[#222] animate-spin"></div>
        </div>
      </div>
    </div>
  )
}

export default EmailLoading