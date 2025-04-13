import { ethers } from "ethers";
import { TokenTransferContractAddress } from "@/assets/web3/Address";
import TransferTokensAbi from "@/assets/web3/Abis/TransferTokensAbi.json";
import { provider } from "@/assets/web3/Provider";

export default function toTransferETH() {
    const getContractETH = () => {
        return new ethers.Contract(
            TokenTransferContractAddress,
            TransferTokensAbi,
            provider
        );
    };

    return {
        getContractETH,
    };
}