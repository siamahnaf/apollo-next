import { createContext, FC, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { getCookie } from "cookies-next";

const token = getCookie("session")

const socket = io(process.env.NEXT_PUBLIC_WS || "http://localhost:5000", {
    extraHeaders: {
        "authorization": token?.toString() || ""
    }
})

//types
interface SocketContextInterface {
    socket: Socket
}
const SocketContext = createContext<SocketContextInterface>({ socket });

interface Props {
    children: React.ReactNode
}

const SocketProvider: FC<Props> = (props) => {
    return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext)

export default SocketProvider;