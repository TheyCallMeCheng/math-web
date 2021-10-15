import Web3 from 'web3'
import abiDecoder from 'abi-decoder'
import React,{ useState } from 'react';
const BigNumber = require("bignumber.js");


//Contract declaration and init
const contract_abi = require('./abi.json'); //To change during deployment
const web3 = new Web3("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"); //To change during deployment
const contractAddr = "0x1130753c69717efa1aa8450005e026788810bcd6"; //To change during deployment


function Mint(){

    abiDecoder.addABI(contract_abi);
    var contract = new web3.eth.Contract(
        contract_abi,       
        web3.utils.toChecksumAddress(contractAddr)
    );
    const [input, setInput] = useState(1);

    async function sendMint(){
        console.log("It's working! ");
        console.log("Input = " + input);

        //Get the ethereum account
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const chainID = await window.ethereum.request({ method: 'eth_chainId' });
        console.log(chainID);
        console.log(accounts[0]);


        let mintPrice = await contract.methods.getPrice().call();
        mintPrice = mintPrice * input; //We must calculate the price * the minting number
        console.log("Mint price= " + mintPrice);

        const mint = await contract.methods.mint(
            input
        );
        var encodedABI = mint.encodeABI();
        
        //To remove during deployment
        console.log("Account: " + accounts[0]);

        var tx = {
            from: accounts[0],
            to: web3.utils.toChecksumAddress(contractAddr),
            //gas: "141179", Not needed, metamask will do the job
            data: encodedABI,
            //gasPrice: web3.utils.toWei("10", 'Gwei'), Not needed too
            value: web3.utils.toHex(mintPrice) // value must be sent in hex
        }

        //If chainID diffrent from arbitrum, don't send the tx
        if(chainID == "0x4"){
        //this function tells Metamask to sign the transaction with the data (variable tx)
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [tx],
          });
        }else{
            alert("You are not connected to arbitrum");
        }
    }

    return(
        <div id="mint-page">
            <div class="centered">
                <img id="main-pic" src={process.env.PUBLIC_URL + 'main-pic.png'} />
                <p>
                <h1>Synthetic Noise</h1>
                <br/>
                An algorithmically created media collection that aims to depict
                <br/>
                the beauty of mathematics through generative art
                </p>
                <button class="dwl_parent">
                    <a class="download_button" href={process.env.PUBLIC_URL + 'SNpresentation.pdf'} download>
                        Download blackpaper
                    </a>
                </button>
                <div class="container-input hide">
                    <input type="number" step="1" class="input-field" value={input} onInput={e => setInput(e.target.value)} placeholder="1" min="1" max="25" style={{padding: "10px", }}></input>
                    <input type="button" value="mint" name="Mint" text="mint" class="mint-button" onClick={sendMint}></input>
                </div>
                <p class='disclaimer hide'>Make sure you are connected to Arbitrum Mainnet</p>

                <div class="social">
                    <a href="https://twitter.com/SynthNoise" target="_blank">
                        <img src={process.env.PUBLIC_URL + 'twitter-icon.png'} />
                    </a>
                    <a href="https://discord.gg/Kfgm3JUE" target="_blank">
                        <img src={process.env.PUBLIC_URL + 'discord-icon.png'} />
                    </a>
                    <a class="hide" href="https://t.me/Sythetic_Noise" target="_blank">
                        <img src={process.env.PUBLIC_URL + 'telegram-icon.png'} />
                    </a>
                </div>
                
            </div>
            <div id="s-text" >
                <div class="center2">
                    <p>
                        Each piece portrays a unique mathematical function immersed in solid color background. Some functions are simple and well-known by anyone. Others are complex and shocking to think they derive from pure mathematical formulas.
                    </p>
                    <br/>
                    <br/>
                    <p>
                        To obtain something truly unique, some of them are deformed with the introduction of noise! Noise gives us chaos. Noise gives us beauty. Noise gives us the perfect amount of imperfectness, just like the world we live in.         
                    </p>
                    <br/>
                    <br/>
                    <p>
                        
                        Noise helps us generate a collection that is always surprising and never boring to explore.
                    </p>
                </div>
                <div class="bg-image">
                    <img src={process.env.PUBLIC_URL + 'main2.png'}  id="bg-img-1"/>
                    <img src={process.env.PUBLIC_URL + 'main3.jpg'}  id="bg-img-2" />
                </div>
            </div>
            <div id="s-3">
                <h2>Preview</h2>
                    <div class="preview">
                        <img src={process.env.PUBLIC_URL + 'g1.png'} />
                        <img src={process.env.PUBLIC_URL + 'g2.png'} />
                        <img src={process.env.PUBLIC_URL + 'g3.png'} />
                        <img src={process.env.PUBLIC_URL + 'g4.png'} />
                        <img src={process.env.PUBLIC_URL + 'g5.png'} />
                        <img src={process.env.PUBLIC_URL + 'g6.png'} />
                        <img src={process.env.PUBLIC_URL + 'g7.png'} />
                        <img src={process.env.PUBLIC_URL + 'g8.png'} />
                        <img src={process.env.PUBLIC_URL + 'g9.png'} />
                        <img src={process.env.PUBLIC_URL + 'g10.png'} />
                        <img src={process.env.PUBLIC_URL + 'g11.png'} />
                        <img src={process.env.PUBLIC_URL + 'g12.png'} />
                        <img src={process.env.PUBLIC_URL + 'g13.png'} />
                        <img src={process.env.PUBLIC_URL + 'g14.png'} />
                        <img src={process.env.PUBLIC_URL + 'g15.png'} />
                </div>
               
            </div>
            <div id="s-2">
                <div class="center2" >
                    <h2>Minting details</h2>
                    <p>
                        Minting details will be revealed soon on our Discord server
                    </p>
                    
                </div>
               
            </div>

            
        </div>
    );
}

export default Mint;