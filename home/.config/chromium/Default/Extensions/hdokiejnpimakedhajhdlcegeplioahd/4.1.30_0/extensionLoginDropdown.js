ExtensionDropdown=function(){window.addEventListener("unload",function(){c()});var c=function(){Topics.get(Topics.CLEAR_DATA).publish()};return{open:function(){!bg.get("lploggedin")&&bg.get("g_badgedata")&&"notification"===bg.get("g_badgedata").cmd?(dialogs.notification.open({notification:bg.get("g_notification_data"),onResize:function(a,b){LPPlatform.setLoginPopoverSize(a,b)},onClose:function(){LPPlatform.closePopup()}}),bg.clear_badge()):dialogs.loginTab.open({isPopup:!0,onResize:function(a,b){LPPlatform.setLoginPopoverSize(a,
b)},onClose:function(){LPPlatform.closePopup()}})},reset:c}}();
