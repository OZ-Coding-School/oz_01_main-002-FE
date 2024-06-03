import { SignUpUser } from "@/type/UserType";

type TermProps = {
  setSignUpUser: React.Dispatch<React.SetStateAction<SignUpUser>>;
}

const TermCheck = ({ setSignUpUser }: TermProps) => {

  const termMenu = [
    { id: 1, title: '만 14세 이상 동의(필수)' },
    { id: 2, title: '이용약관 동의(필수)' },
    { id: 3, title: '정보제공 동의(필수)' },
    { id: 4, title: '마케팅 활용 동의(선택)' },
  ]

  const handleCheckboxChange = (id: number) => {
    setSignUpUser(prevState => {
      const isChecked = prevState.term_data.some(term => term.id === id);
      if (isChecked) {
        return {
          ...prevState,
          term_data: prevState.term_data.filter(term => term.id !== id)
        };
      } else {
        return {
          ...prevState,
          term_data: [...prevState.term_data, { id }]
        };
      }
    });
  };

  return (
    <div className="text-white">
      {termMenu.map((menu) => (
        <div className="flex items-center my-7" key={menu.id}>
          <input type="checkbox" className="w-[30px] h-[30px] accent-[#D1B383]" onChange={(e) => handleCheckboxChange(menu.id)} />
          <p className="ml-5">{menu.title}</p>
        </div>
      ))}
    </div>
  )
}

export default TermCheck