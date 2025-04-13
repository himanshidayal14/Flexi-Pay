import { ethers } from "ethers";
import {TokenTransferContactAddressHarmony} from "@/assets/web3/Address";
import TransferTokensAbi from "@/assets/web3/Abis/TransferTokensAbi.json";
import { provider } from "@/assets/web3/Provider";

export default function toTransferHarmony() {
    const getContractHarmony = () => {
        return new ethers.Contract(
            TokenTransferContactAddressHarmony,
            TransferTokensAbi,
            provider
        );
    };

    return {
        getContractHarmony,
    };
}