import React, { useState } from 'react';
import abiDecoder from 'abi-decoder'
import ReactDOM from 'react-dom'
import Web3 from 'web3'

function Marketplace(){
    return(
       <div id="marketplace">
           
           <div class="market-nav-container">
                <div>
                    <dropdown>
                        hello?
                    </dropdown>
                </div>
            </div>

            <h1>
                Marketplace
            </h1>

            <div id='market-container'>
                <div class='market-element'>
                    <h2>
                        Potato #1
                    </h2>
                    <img src="https://gateway.pinata.cloud/ipfs/QmVQRRVVWQ6SMfCz5EpsxwXFatqJ3qahbbvZqrgVBJtecK/0.png" />
                </div>
                <div class='market-element'>
                    <h2>
                        Potato #2
                    </h2>
                    <img src="https://gateway.pinata.cloud/ipfs/QmVQRRVVWQ6SMfCz5EpsxwXFatqJ3qahbbvZqrgVBJtecK/0.png" />
                </div>
                <div class='market-element'>
                    <h2>
                        Potato #3
                    </h2>
                    <img src="https://gateway.pinata.cloud/ipfs/QmVQRRVVWQ6SMfCz5EpsxwXFatqJ3qahbbvZqrgVBJtecK/0.png" />
                </div>

            </div>
       </div>
    );
}
export default Marketplace;