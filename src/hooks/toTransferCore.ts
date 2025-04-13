import {ethers} from "ethers";
import {TransferTokenContractAddressCore} from "@/assets/web3/Address";
import TransferTokensAbi from "@/assets/web3/Abis/TransferTokensAbi.json";
import { provider } from "@/assets/web3/Provider";

export default function toTransferCore(){
    const getContractCore = () => {
        const contractCore = new ethers.Contract(
            TransferTokenContractAddressCore,
            TransferTokensAbi,
            provider
        )
        return contractCore;
    }

    return {
        getContractCore
    }
}