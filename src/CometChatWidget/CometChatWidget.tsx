import React, { useEffect, useState } from "react";
import { CometChatUIKit, UIKitSettingsBuilder } from '@cometchat/chat-uikit-react';
import { CometChatHome } from "../components/CometChatHome/CometChatHome";
import { COMETCHAT_CONSTANTS } from "../AppConstants";

const CometChatWidget = () => {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let appId = COMETCHAT_CONSTANTS.APP_ID
    let region = COMETCHAT_CONSTANTS.REGION
    let authKey = COMETCHAT_CONSTANTS.AUTH_KEY
    let uid = params.get("uid");

    if (!appId || !region || !authKey || !uid) {
       appId = COMETCHAT_CONSTANTS.APP_ID || (localStorage.getItem('appId') ?? ""); // Use the latest appId if available
       region = COMETCHAT_CONSTANTS.REGION || (localStorage.getItem('region') ?? ""); // Default to 'us' if region is not found
       authKey = COMETCHAT_CONSTANTS.AUTH_KEY || (localStorage.getItem('authKey') ?? ""); 
      
    }
  
    const uiKitSettings = new UIKitSettingsBuilder()
      .setAppId(appId)
      .setRegion(region)
      .setAuthKey(authKey)
      .subscribePresenceForAllUsers()
      .build();
 
    if (uiKitSettings != null) {
      CometChatUIKit.init(uiKitSettings)?.then(() => {
      console.log("CometChat UI Kit initialized successfully.");
      
            if(!uid){
                return;
            }
          CometChatUIKit.login(uid)
            .then(() => {

                console.log("CometChat UI Kit initialized and user logged in successfully.");
              setIsReady(true);
            })
            .catch((err) => setError("Login failed: " + (err?.message || err)));
        })
        .catch((err) => setError("Init failed: " + (err?.message || err)));
    } else {
      setError("Failed to build UIKit settings.");
    }
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      {error ? <p>{error}</p> : isReady ? <CometChatHome /> : <p>Loading chat...</p>}
    </div>
  );
};

export default CometChatWidget;