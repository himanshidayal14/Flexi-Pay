import { ethers } from "ethers";
import {TransferTokenContractAddressFantom} from "@/assets/web3/Address";
import TransferTokensAbi from "@/assets/web3/Abis/TransferTokensAbi.json";
import { provider } from "@/assets/web3/Provider";

export default function toTransferFantom() {
    const getContractFantom = () => {
        return new ethers.Contract(
            TransferTokenContractAddressFantom,
            TransferTokensAbi,
            provider
        );
    };

    return {
        getContractFantom,
    };
}