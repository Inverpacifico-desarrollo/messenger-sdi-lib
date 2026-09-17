import { ChatConfig, ChatProvider, FloatingChat } from '@/index';
import React from 'react';

const App = () => {
  const DEFAULT_CONFIG: ChatConfig = {
  apiBaseUrl: 'http://172.16.30.114',
  authToken: '4165|5XRSstvytJJUvxQxGxZdLnwTBB3n6QEW6tFs0zqsc2671e79',
  applicationId: 10,
  reverb: {
    key: 'rqy4nxbbfzvgz5yazh1z',
    host: 'dev-backend-erp.ganebyd.com',
    port: 443,
    wsPath: '/messenger-ws',
    scheme: 'https'
  }
}
  return (
    <ChatProvider config={DEFAULT_CONFIG}>
      <div className='w-full h-screen bg-slate-500' >
        <FloatingChat/>
      </div>
    </ChatProvider>
  );
}

export default App;
