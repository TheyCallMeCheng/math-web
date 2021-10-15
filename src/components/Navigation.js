import { injected } from './wallet/connector'
import React, { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core'
import { Link } from "react-router-dom";


function Navigation(){
    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    
    
    
    //Classic mm connection but using the web3React library
    async function connect() {
        try {
            await activate(injected)
            const chainID = await window.ethereum.request({ method: 'eth_chainId' });
            console.log(chainID);

            try{
                //To change during depl to 0xa4b1 (arbi)
                if(chainID != "0x4"){
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0x4' }],
                      });}
                    }catch(switchError){
                        if (switchError.code === 4902) {
                            try {
                                await window.ethereum.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [{ chainId: '0xa4b1', rpcUrl: 'https://arb1.arbitrum.io/rpc'}],
                                });
                            } catch (addError) {
                                //do nothing
                                console.log("Unsupported error")
                            }
                        }
                    }
            } catch (ex) {
                console.log(ex)
            }
    }

    async function disconnect() {
        try {
            await deactivate()
        } catch (ex) {
        console.log(ex)
        }
    }
    function shortAccount(account){
        return account.substring(0, 6) + "..." + account.substring(38, 42);
    }


    return(
    <nav className='navbar' >
        <Link to='/' className='navbar__title navbar__item'>Home</Link>
        
        {/* <Link class="isDisabled" to="/Gallery" className='navbar__item' >Gallery</Link>
        <Link class="isDisabled" to='/Marketplace' className='navbar__item' >Marketplace</Link>
        <Link class="isDisabled" to="/Rarity" className='navbar__item'>Rarity Check</Link> */}
        
        <Link to="/" className='navbar__item2' >Gallery</Link>
        <Link to='/' className='navbar__item2' >Marketplace</Link>
        <Link to="/" className='navbar__item2'>Rarity Check</Link>

        <div className='navbar__item'>
            <button className='meta' onClick={connect}>
                {active ? <span>{shortAccount(account)}</span> : <span class="hide">Connect to wallet</span>}
                <div id="unsupported chain">

                </div>
            </button>
        </div>        
    </nav>
    );
}

export default Navigation;