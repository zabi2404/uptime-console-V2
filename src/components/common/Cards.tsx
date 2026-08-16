

type CardsProps = {
  heading: string;
  description: string;
};

function Cards({ heading, description }: CardsProps) {
  return (
    <>
    <div className=" w-full min-w-[180px] border border-gray-200 shadow-md rounded-[8px] px-2 py-4">
        <div>
           <h1 className="text-[12px]"> {heading}</h1>
        </div>
        <div>
           <h1 className="text-[20px] font-bold">
            {description}
           </h1>
        </div>
    </div>
    </>
  )
}

export default Cards