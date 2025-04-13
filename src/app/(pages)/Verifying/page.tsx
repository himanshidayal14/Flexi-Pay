"use client"
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { formatEther } from 'ethers';
import Nav from '@/app/Components/Nav';
import Loader from '@/app/Components/Loader';
import toTransferPolygon from '@/hooks/toTransferPolygon';
import toTransferETH from '@/hooks/toTransferETH';
import toTransferBSC from '@/hooks/toTransferBSC';
import { RootState } from '@/provider/redux/store';
import "../../style/Sound2.css"
import toTransferChiado from "@/hooks/toTransferChiado";
import toTransferCore from "@/hooks/toTransferCore";
import toTransferFantom from "@/hooks/toTransferFantom";
import toTransferHarmony from "@/hooks/toTransferHarmony";

export default function Page() {
  const [type, setType] = useState<string>('ETH');
  const [eventData, setEventData] = useState<{
    from: string;
    to: string;
    amount: string;
    name: string;
    blockchain: string;
  } | null>(null);
  const accountName = useSelector((state: RootState) => state.SetAccount.name);

  useEffect(() => {
    let contractEventListeners: (() => void)[] = [];

    const setupListener = async () => {
      const handleTransferEvent = (
        _from: string,
        _to: string,
        _amount: string,
        _name: string,
        _blockchain: string
      ) => {
        const message = `${_from} sent ${formatEther(_amount)} to ${_to} on ${_blockchain} blockchain with name ${_name}`;
        console.log('Event Data:', message);
        if (_to.toLowerCase() === accountName.toLowerCase()) {
          setEventData({
            from: _from,
            to: _to,
            amount: formatEther(_amount),
            name: _name,
            blockchain: _blockchain,
          });
        }
      };

      const setupEventListener = async (getContract: any) => {
        const TransferTokenContract = getContract();
        console.log('Contract:', TransferTokenContract);

        await TransferTokenContract.on('Transfer', handleTransferEvent);
        contractEventListeners.push(() =>
          TransferTokenContract.removeAllListeners('Transfer')
        );
      };

      if (type === 'ETH') {
        const { getContractETH } = toTransferETH();
        await setupEventListener(getContractETH);
      } else if (type === 'BSC') {
        const { getContractBSC } = toTransferBSC();
        await setupEventListener(getContractBSC);
      } else if (type === 'PLG') {
        const { getContractPolygon } = toTransferPolygon();
        await setupEventListener(getContractPolygon);
      } else if(type === 'CHI'){
        const { getContractChiado } = toTransferChiado();
        await setupEventListener(getContractChiado);
      } else if(type === 'CORE'){
        const { getContractCore } = toTransferCore();
        await setupEventListener(getContractCore);
      } else if (type === 'FAN') {
        const { getContractFantom } = toTransferFantom();
        await setupEventListener(getContractFantom);
      } else if( type === 'HRN'){
        const { getContractHarmony } = toTransferHarmony();
        await setupEventListener(getContractHarmony);
      }
    };

    setupListener();

    return () => {
      contractEventListeners.forEach((removeListener) => removeListener());
    };
  }, [type, accountName]);

  useEffect(() => {
    if (eventData) {
      const message = `Received ${eventData.amount} ETH on ${eventData.blockchain} originally sent in unit ${eventData.name}`;
      console.log('Speaking:', message);
      speak(message);
    }
  }, [eventData]);

  const speak = (text: string) => {
    if (!speechSynthesis) {
      console.error('SpeechSynthesis API is not available.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0] || null;
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <Nav />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
          {eventData ? (
            <><Card className="leftyCardss">
              <Card className="leftyCard">
            <div className="invoice" style={{color:"white"}}>
              <div className="check-icon">✓</div>
              <h1 style={{fontSize:"50px" , textAlign:"center"}}>{eventData.amount} <span>ETH</span> </h1>
              
              <div className="details" style={{color:"white" , marginTop:"6%" , textAlign:"center"}}>
                  <p className='tran-id'><strong style={{marginRight:"20px"}}>Sender ID :</strong> {eventData.from}</p>
                  <p className='tran-id'><strong style={{marginRight:"20px"}}>Receiver ID :</strong> {eventData.to}</p>
                  <p className='tran-id'><strong style={{marginRight:"20px"}}>Unit :</strong>{eventData.name}</p>
                  
              </div></div></Card></Card>
            </>
          ) : (
            <Card className="leftyCardss">
            <Card className="leftyCard">
            <div
          style={{
    color: 'white',
    textAlign: 'center',
    fontSize: '35px',
    marginTop: '6%',
    fontWeight: 'bold',
  }}
  className="rainbow-background glow-text"
>
  CHOOSE BLOCKCHAIN
</div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}>
                <select
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  style={{
                    backgroundColor: 'black',
                    border: '2px solid rgb(248, 250, 255)',
                    width: '70%',
                    height: '40px',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '2rem',
                    margin: '3%',
                    boxShadow: '0 0 10px 2px rgba(0, 0, 255, 0.7)',
                    transition: 'box-shadow 0.3s ease-in-out',
                    padding:"10px 10px 10px 10px"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px 2px rgba(0, 0, 255, 1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 5px 1px rgba(0, 0, 255, 0.7)';
                  }}
                >
                 <option value="ETH">Ethereum</option>
                 <option value="BSC">Binance</option>
                 <option value="PLG">Polygon</option>
                 <option value="CHI">Chiado</option>
                 <option value="HRN">Harmony</option>
                 <option value="FAN">Fantom</option>
                 <option value="CORE">Coredao</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '10%' }}>
                <Loader />
              </div>
              <div style={{ textAlign: 'center', color: 'rgb(179, 174, 174)' }}>-------------- Waiting for transactions --------------</div>
            </Card></Card>
          )}
        
      </div>
    </div>
  );
}
