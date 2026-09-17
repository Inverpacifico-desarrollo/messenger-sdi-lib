import { ChatConfig, ChatProvider, FloatingChat } from '@/index';
import React, { useMemo } from 'react';

const App = () => {
  const config: ChatConfig = useMemo(() => ({
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://172.16.30.114',
    authToken: import.meta.env.VITE_AUTH_TOKEN || '',
    applicationId: Number(import.meta.env.VITE_APPLICATION_ID) || 10,
    reverb: {
      key: import.meta.env.VITE_REVERB_KEY || '',
      host: import.meta.env.VITE_REVERB_HOST || '',
      port: Number(import.meta.env.VITE_REVERB_PORT) || 443,
      wsPath: import.meta.env.VITE_REVERB_WS_PATH || '/messenger-ws',
      scheme: (import.meta.env.VITE_REVERB_SCHEME as 'http' | 'https') || 'https'
    }
  }), []);

  return (
    <ChatProvider config={config}>
      <div className='w-full h-screen bg-slate-500'>
        <FloatingChat />
      </div>
    </ChatProvider>
  );
};

export default App;
