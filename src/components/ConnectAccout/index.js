import React,{useState,useCallback,useEffect } from 'react'
import "./connect.css"
import Modal from '../Modal'
import {AiOutlineCloseCircle} from "react-icons/ai"
import metamaskImg from "../../assests/metamask.png"
// import { connectHarmony } from '../../HarmonySdkHelpers'
import { AccountState,  PkState} from '../../recoilstate/globalState'
import { useRecoilState } from 'recoil'
import Avater from "../../assests/profileAvater.png"
import { Link } from 'react-router-dom'
import detectEthereumProvider from "@metamask/detect-provider"
import Web3 from "web3";
import { ethers } from 'ethers'

export default function ConnectAccount() {
    
    
    const [trigger,setTrigger] =useState(false)
    const [Wallet, setWallet] = useState('')
    const [privatek,setPk]=useRecoilState(PkState)
    const [account,setAccount]=useRecoilState(AccountState)  
    const [ensName,setENSName] =useState("")
    const [ensAvater,setENSAvater] =useState("")
 
    
   const web3loader = useCallback(
      async() => {
  
       const webProvider = await detectEthereumProvider();
  
      // console.log(webProvider)
          if(webProvider){
            const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
         console.log(chainId)
       
  
      const accounts = await window.ethereum?.request({ method: 'eth_accounts' })
          handleAccountsChanged(accounts)
        }
    }
    , [])
    useEffect(()=>{
        window.addEventListener('load', web3loader)
        window.ethereum?.on('accountsChanged', handleAccountsChanged);
    
        return () => {
          web3loader()
        }
        },[web3loader])

    function handleAccountsChanged(accounts) {
            //window.location.reload();
           }
    
    
    
    

    console.log(privatek)
    
    
    const connectWallet=async()=>{
       
      try{
 
          const provider = new ethers.providers.Web3Provider(window.ethereum)


          await provider.send("eth_requestAccounts", []);
          
           const newsigner = provider.getSigner()
          
         
         const account= await newsigner .getAddress()
          const resolvedENSname= await provider?.lookupAddress(account);
          const resolvedENSAvater= await provider?.getAvatar(resolvedENSname ) 
          setENSName(resolvedENSname)
          setENSAvater(resolvedENSAvater)
           setAccount( account)
          setAccount(account)
         }catch(error){
           if(error.code === 4001) {
              // EIP-1193 userRejectedRequest error
              // If this happens, the user rejected the connection request.
             //  console.log('metamask did not connect');
            } else {
              console.error(error);
           }
       }
   }
     
     
  return (
    <>   
          {account?.length===0&&
          <div className='btn-color px-4 rounded-full text-xs py-3 text-black' 
          onClick={()=>setTrigger(true)}
            >
              Connect wallet
            </div>
            }

           {account?.length>1&&
          <>

        {ensName?.length>1?
        <div className='btn-color px-4 rounded-full text-xs  text-black py-3 flex items-center space-x-2' 
          
            >
              <img src={ensAvater} className="rounded-full h-5 w-5"/>
          <span className='text-md font-semibold'> {ensName}</span>
        </div>
          :

          <div className='btn-color px-4 rounded-full  text-black text-xs py-3 flex items-center space-x-2' 
    
    >
     
        <span className='text-md font-semibold'> {account?.slice(0,7)+"..."+account?.slice(-4)}</span>
      </div>
       }
           </>
     }
        <Modal trigger={trigger} cname="h-80 w-2/5 shadow rounded-lg py-4 px-8"> 
            
        <div className='connect-modal '>
               <main className='flex justify-end'>
                 <button onClick={()=>setTrigger(false)}><AiOutlineCloseCircle className="text-md" /></button>
                </main>

                <main className='flex flex-col items-center space-y-2'>
                    <h5 className='text-2xl font-semibold text-white'>Connect Wallet</h5>
                    <p className='text-slate-700'>Link your wallet and account to continue</p>
                </main>

                <main className='flex flex-col space-y-4 pt-4'>
                    {Wallet===""&&
                    <>
                   <div className='flex  space-x-2 items-center wallet-bg py-4 px-4 rounded-sm'
                       onClick={connectWallet}
                     >
                    <img src={metamaskImg} className="" alt='' />
                    <main>
                        <h5 className='font-semibold text-sm text-slate-300'>Metamask</h5>
                        <p className='text-xs text-slate-700'>The popular crypto wallet is secure and flexible</p>
                    </main>
                   </div>

                   <div className='flex space-x-2 items-center wallet-bg py-4 px-4 rounded-sm '
                     onClick={()=>setWallet("otherWallets")}
                    >
                    <h5 className='bg-white'>
                     <img src="https://algorand-governance-platform-web.s3.amazonaws.com/static/media/Other.eac2bef4.svg" alt='' className=''/>
                    </h5>
                    <main>
                      <h5 className='font-semibold text-sm text-slate-300'>Other wallets</h5>
                      <p className='text-xs text-slate-700'>The popular crypto wallet is secure and flexible</p>
                     </main>
                   </div>
                   </>
                      }

                    {Wallet==="otherWallets"&&
                       <main className='flex flex-col space-y-4'>
                        <div className='flex  space-x-2 items-center wallet-bg py-4 px-4 rounded-sm'>
                          <input
                           className='w-full h-full outline-none py-1 wallet-bg text-slate-300 border-0'
                           placeholder='Paste your private keys '
                           onChange={(e)=>setPk(e.target.value)}
                           />
                        </div>

                        <button className='py-1 px-4 text-xs w-20  text-black btn-color border border-slate-400 rounded-full hover:bg-rose-400 hover:border-0'
                          onClick={connectWallet}
                             >
                          Connect
                        </button>
                       </main>

                    }
                </main>

      </div>
        </Modal>
    </>
  )
}
