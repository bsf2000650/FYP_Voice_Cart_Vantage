import React, { useEffect } from 'react'
 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        botId: '4a791cc0-1222-47a5-9876-aca629446ea3',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: '4a791cc0-1222-47a5-9876-aca629446ea3',
      })
    }
  }, [])
 
  return <div id="webchat" />
}

// import "./style.css"
// import theme from "./theme.json"
 
// import { Webchat, WebchatProvider, useClient } from '@botpress/webchat'
 
// const Chatbot = () => {
//   const client = useClient({ clientId: '453254325-54325-435-345-345534253' })
 
//   return (
//     <WebchatProvider client={client}>
//       <Webchat />
//     </WebchatProvider>
//   )
// }
 
export default Chatbot



{/* <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
<script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
<script>
  window.botpressWebChat.init({
      "composerPlaceholder": "Chat with bot",
      "botConversationDescription": "This chatbot was built surprisingly fast with Botpress",
      "botId": "4a791cc0-1222-47a5-9876-aca629446ea3",
      "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
      "messagingUrl": "https://messaging.botpress.cloud",
      "clientId": "4a791cc0-1222-47a5-9876-aca629446ea3",
      "webhookId": "9ad324f4-dcce-48b6-b6d2-e54844c59f87",
      "lazySocket": true,
      "themeName": "prism",
      "frontendVersion": "v1",
      "showPoweredBy": true,
      "theme": "prism",
      "themeColor": "#2563eb",
      "allowedOrigins": []
  });
</script>*/}