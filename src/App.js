import React, { useMemo, useEffect } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import WebApp from '@twa-dev/sdk'
import "@solana/wallet-adapter-react-ui/styles.css";

const App = () => {
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  useEffect(() => {
    // Initialize Telegram WebApp
    WebApp.ready();
    
    // Set the main button if needed
    WebApp.MainButton.setText('Connect Wallet');
    WebApp.MainButton.show();
    
    // Expand the WebApp to full height
    WebApp.expand();
  }, []);

  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div style={{ 
            textAlign: "center", 
            padding: "20px",
            background: WebApp.colorScheme === 'dark' ? '#1f1f1f' : '#ffffff',
            color: WebApp.colorScheme === 'dark' ? '#ffffff' : '#000000',
            minHeight: '100vh'
          }}>
            <h1>Connect Your Wallet</h1>
            <WalletMultiButton />
            
            {/* Add some Telegram-specific info */}
            <div style={{ marginTop: "20px" }}>
              <p>User ID: {WebApp.initDataUnsafe?.user?.id || 'Not available'}</p>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App; 