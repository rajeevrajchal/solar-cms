
import { GrConnect } from "react-icons/gr";
import { PiPlugsConnectedBold } from "react-icons/pi";


interface ConnectNotProps {
  connected: boolean;
}

const ConnectNot = (props: ConnectNotProps) => {
  const { connected } = props
  if (!connected) {
    return <GrConnect className="text-red-500 text-md" />
  }
  return <PiPlugsConnectedBold className="text-green-500 text-md" />
}

export default ConnectNot
