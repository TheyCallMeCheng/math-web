import React, { useState } from 'react';
import abiDecoder from 'abi-decoder'
import ReactDOM from 'react-dom'
import Web3 from 'web3'

function Marketplace(){
    return(
       <div id="marketplace">
           
           <div class="market-nav-container">

            </div>

            <h1>
                Marketplace
            </h1>

            <div id='market-container'>
                <div class='market-element'>
                    <h2>
                        Coming soon
                    </h2>
                </div>

            </div>
       </div>
    );
}
export default Marketplace;