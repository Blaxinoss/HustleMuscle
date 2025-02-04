const Message = ({ message }) => {
    if (!message) return null; // Hide when there's no message


    return (
        <div className="bg-[#31e78c] text-black text-xl  absolute
            px-[20px] py-[10px] left-5 top-[90vh] rounded-lg  z-10 w-fit
            animate-messageShowUpLeft rtl:animate-messageShowUpRight right-5 
            ">
            {message}
        </div>
    )
}
export default Message;