interface ButtonProps {
    name: string
    variant?: "primary" | "danger"
    disableButton?:boolean
}

function Button({ name, variant = "primary", disableButton =false }: ButtonProps) {
    const styles =
    variant === "danger"
    ? "border-red-300 text-red-600 hover:bg-red-50"
    : "border-[#1B76E2] text-[#1B76E2] hover:bg-blue-50"
    
   
    return (
      
            <button className={`${styles} cursor-pointer border py-1 px-4 border-[#1B76E2] border-[1.5px] rounded-[25px] styles text-[12px] font-semibold disabled:cursor-not-allowed disabled:text-gray-600 disabled:border-gray-600 disabled:hover:bg-white disabled:hover:none `} disabled={disableButton}>
                {name}
            </button>
      
    )
}

export default Button


// interface ButtonProps {
//     name: string
//     variant?: "primary" | "danger"
// }

// function Button({ name, variant = "primary" }: ButtonProps) {

//     return (
//         <button
//             className={`border-[1.5px] py-2 px-5 rounded-[8px] font-semibold text-sm transition ${styles}`}
//         >
//             {name}
//         </button>
//     )
// }

// export default Button