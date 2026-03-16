import { useState } from "react"
import aiicon from "../assets/ailogo.svg"
import ChatWithReviews from "./ChatWithReviews";

const Aiboxfet = () => {
    const [top, setTop] = useState(false);

    function handleTogglepoup() {
        setTop(!top);
    }

    return (
        <>
            {top && (
                <div className="fixed bottom-24 right-6 z-50">
                    <ChatWithReviews />
                </div>
            )}

            <div
                className="fixed bottom-6 right-6 z-50 cursor-pointer 
                           shadow-lg rounded-full bg-white p-2"
                onClick={handleTogglepoup}
            >
                <img src={aiicon} width="50px" />
            </div>
        </>
    )
}

export default Aiboxfet;
