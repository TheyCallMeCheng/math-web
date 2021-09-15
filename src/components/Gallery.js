import React, { useState, useEffect } from 'react';
import abiDecoder from 'abi-decoder'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
const IPFS = require('ipfs-http-client');

//Contract declaration and init
const contract_abi = require('./abi.json'); //To change during deployment
const web3 = new Web3("https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"); //To change during deployment
const contractAddr = "0x1130753c69717efa1aa8450005e026788810bcd6"; //To change during deployment

function Gallery(){
    const baseUrl = 'https://ipfs.io/ipfs';
    useEffect(() => {
        load();
    });
    

    abiDecoder.addABI(contract_abi);
    var contract = new web3.eth.Contract(
        contract_abi,       
        web3.utils.toChecksumAddress(contractAddr)
    );

    var ImageCounter = 0;
    function renderImage(obj) {
        let images = [];
        obj.forEach(element => {
            console.log(element.image);
            let temp = (
                <div class="galleryViewr">
                    <h1>{element.name}</h1>
                    <img src={element.image} />
                </div>
            )
            images.push(temp);
        });
        try{
            ReactDOM.render(
                images,
                document.getElementById('galleryId')
            );
        }catch(e){
            console.log("window changed, but we fine");
        }
    }

    async function getObject(string) {
        let metadataObj;
        try{
        let res = await fetch(baseUrl + string.substring(6))
                    .then(response => response.json())
                    .then(data => metadataObj = data)
        }catch(ex){
            console.log("Not found " + string);
        }
        return metadataObj;
    }


    async function load() {
        const node = await IPFS.create();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(accounts[0])
        let walletNfts = await contract.methods.walletOfOwner(accounts[0]).call();
        if(walletNfts.length < 1){
            let notOwner = document.getElementById("notOwner");
            console.log(notOwner);
            try{
            notOwner.style.display = "block";
            }catch(e){
                
            }

        }
        console.log(walletNfts);
        var obj = [];
        var uri;
        for await (let variable of walletNfts) {

            console.log(variable);
            try{
                uri = await contract.methods.tokenURI(variable).call();
                let temp = await getObject(uri);
                console.log(temp);
                if(typeof temp != "undefined"){
                    obj.push(temp);
                }
            }catch(ex)
            {
                console.log(ex)
            }
        }     
        renderImage(obj);
    }
    return(
        <div class="Gallery" >
            <h1>Gallery</h1>
            <div>
                <div class="" >
                    <div id="galleryId" class=" img-container">
                        <img class="spinner" src={process.env.PUBLIC_URL + 'Loading.gif'}></img>
                    </div> 
                    <div>
                        <h3 id="notOwner">
                            You don't own any SN :(
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Gallery;