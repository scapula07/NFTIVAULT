
# Table of content

1. Project Description
1. Stack Requirenments/ Technologies
1. Dapp Architecture


## Project Description

NFTivault is an NFT marketplace for creators to mint and sell their video contents in form of an NFT. Our platform enables creators to list their NFTs in exchange for a royalty fee that will be specified or inputed by the creator.

Buyers can purchase these NFTs in exchnage with the Harmony Native token(ONE) or with our custom token V3T.

### Dapp features or Hack challange

 Our dapp include the following features;

1. Ethereum naming service integration - ENS service
2. NFT minting -NFTport API

4. NFT marketplace enabling creators to list NFTs and buyers to purchase NFT
6. Staking pool, each user can stake ONE or V3T on our platform within a staking period and the rewards from this period can be used to purchase NFT from Collection listed on our platform. A governace system is used to determined the choice of nft.


## Dapp architecture

###  Hackathon challanges  implementation 




###   ENS service



The Ethereum Name Service (ENS) is a distributed, open, and extensible naming system based on the Ethereum blockchain.

We were able to integrate ENS into in our dapp using the Ethers js library to resolve ENS names and avaters.


![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/telemed%2FScreen%20Shot%202023-01-11%20at%2011.26.45%20AM.png?alt=media&token=4c9e219f-4ece-4ebe-ab7d-24c37e5170b6)




````js

           const connectAccount=async()=>{
       
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
        
   

                   }catch(error){
                     if(error.code === 4001) {
                      
                      } else {
                        console.error(error);
                     }
                 }
             }


````




### NFT gated access -NFTport API



````js
       

	      const minRegtNft=async()=>{
		toast("Minting NFT")
		  const options = {
		  method: 'POST',
		  headers: {
	                accept: 'application/json',
	                'content-type': 'application/json',
		      Authorization: '5ac96cad-d645-41cc-880f-1e85c554dd4a'
		   },
		  body: JSON.stringify({
	                       chain: 'goerli',
			contract_address: '0xbb01D6DA9D221609D102f413e5A444888798075c',
			metadata_uri: avater? avater :"https://i.redd.it/4iyd1x1xha681.jpg",
			mint_to_address:  account
		  })
		};
		
		fetch('https://api.nftport.xyz/v0/mints/customizable', options)
		  .then(response => response.json())
		  .then(response => {
			toast("NFT minted")
			  setAccess(true)
			  console.log(response)
	
		  })
		  .catch(err => console.error(err));


		  
	
	  }

      



````







Vultrivius works on four smart contracts :

1. A NFT marketplace smart contract - This contract implement the basic logic of our marketplace i.e listing ,purchase or sales of NFT

 *contract Link* -<https://github.com/scapula07/Vutrivius-harmony-hack/blob/master/contracts/vultriviusNftMarketpalce.sol>



2. A staking pool smart contract -an Erc20 contract implement the logic for users to stake,unstake,purchaseNft etc.

 our staking contract implement the *Harmony VRF* , which is used to generate random bytes onchain . The bytes generated is converted to an integer and used to select stakers from the pool.
 
  *contract Link* -<https://github.com/scapula07/Vutrivius-harmony-hack/blob/master/contracts/vultriviusStaking.sol>
  
2. A governace token contract - a governace token is minted 1:1 to each user that staker ONE or V3T in our platform. This token is retrieved or used to unstake amd to vote during governace


 *contract Link* -<https://github.com/scapula07/Vutrivius-harmony-hack/blob/master/contracts/vultriviusGovernce.sol>
 

3. NFT collection Contract


 *contract Link* -<https://github.com/scapula07/Vutrivius-harmony-hack/blob/master/contracts/ArchitectNftCollection.sol>
 
 
Vultrivius implements covalent APIs  :

1. To fetch users transactions on the dapp <https://github.com/scapula07/Vutrivius-harmony-hack/blob/master/src/pages/Profile/transactions.js>
1. To fetch users token balances

### 3d VR  Repo <https://github.com/scapula07/3d-models-vultrivius>
   We use the Three.js engine to load models of architectural designs that can be optionally provided by Creators.

### NFT Cross-Bridge 

A cross-bridge between Ethereum and Polygon chain was implemented using the Maticjs sdk(POS). The contracts for both tokens were mapped using the polygon Token mapper.

User can transfer their NFT item across chain ,from ethereum to polygonm or vice versa.

