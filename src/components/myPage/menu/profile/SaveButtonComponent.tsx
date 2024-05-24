type SaveButtonComponentProps = {
  isDisabled: boolean,
  saveOnclick: () => void,
  onClick: () => void,
}

const SaveButtonComponent = ({ isDisabled, saveOnclick, onClick }: SaveButtonComponentProps) => {
  return (
    <div className={`flex justify-center items-center w-[500px] mt-2 ${!isDisabled ? 'flex' : 'hidden'}`}>
      <button className="w-[100px] h-[30px] rounded-lg border" onClick={saveOnclick}>저장</button>
      <button className="w-[100px] h-[30px] rounded-lg border ml-2" onClick={onClick}>취소</button>
    </div>
  )
}

export default SaveButtonComponent