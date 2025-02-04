import { useState } from "react";

const useMessageHook = (timeout = 3000) => {
    const [message, setMessage] = useState(null);

    const showMessage = (newMessage) => {
        setMessage(newMessage);
        setTimeout(() => setMessage(null), timeout);
    };

    return { message, showMessage };
};

export default useMessageHook;
