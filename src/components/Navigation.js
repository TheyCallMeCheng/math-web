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
        <Link to="/Gallery" className='navbar__item' >Gallery</Link>
        <Link to='/Marketplace' className='navbar__item' >Marketplace</Link>
        <div className='navbar__item'>Rarity Check</div>

        <div className='navbar__item'>
            <button className='meta' onClick={connect}>
                {active ? <span>{shortAccount(account)}</span> : <span>Connect to metamask</span>}
            </button>
        </div>        
    </nav>
    );
}

export default Navigation;