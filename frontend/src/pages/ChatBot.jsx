import React, { useEffect } from 'react'
 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        botId: '2b1c5193-0e83-4299-b1ca-04ef8e9625cd',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '2b1c5193-0e83-4299-b1ca-04ef8e9625cd',
      })
    }
  }, [])
 
  return <div id="webchat" />
}
 
export default Chatbot



{/* <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
<script>
  window.botpressWebChat.init({
      "composerPlaceholder": "Chat with bot",
      "botConversationDescription": "This chatbot was built surprisingly fast with Botpress",
      "botId": "2b1c5193-0e83-4299-b1ca-04ef8e9625cd",
      "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
      "messagingUrl": "https://messaging.botpress.cloud",
      "clientId": "2b1c5193-0e83-4299-b1ca-04ef8e9625cd",
      "webhookId": "02f3b6f3-5113-447a-a1c0-e23225c9ef3d",
      "lazySocket": true,
      "themeName": "prism",
      "frontendVersion": "v1",
      "showPoweredBy": true,
      "theme": "prism",
      "themeColor": "#2563eb"
  });
</script> */}