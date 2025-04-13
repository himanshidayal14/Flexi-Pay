import {ethers} from "ethers";
import {TokenTransferContactAddressChiado} from "@/assets/web3/Address";
import TransferTokensAbi from "@/assets/web3/Abis/TransferTokensAbi.json";
import { provider } from "@/assets/web3/Provider";

export default function toTransferChiado(){
    const getContractChiado = () => {
        const contractChiado = new ethers.Contract(
            TokenTransferContactAddressChiado,
            TransferTokensAbi,
            provider
        )
        return contractChiado;
    }

    return {
        getContractChiado
    }
}