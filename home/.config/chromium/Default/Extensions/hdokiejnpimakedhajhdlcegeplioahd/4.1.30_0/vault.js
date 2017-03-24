LPVault={};
(function(d,b,ua){var va=Strings.translateString("Folder (a-z)"),wa=Strings.translateString("Folder (z-a)"),x=Strings.translateString("Name (a-z)"),y=Strings.translateString("Name (z-a)"),Q=Strings.translateString("Most Recent"),xa=Strings.translateString("Sender (a-z)"),ya=Strings.translateString("Sender (z-a)"),za=Strings.translateString("Recipient (a-z)"),Aa=Strings.translateString("Recipient (z-a)"),G=[va,wa,x,y,Q],cb=[x,y],db=[x,y,za,Aa,Q],eb=[x,y,xa,ya,Q],fb=[x,y],gb=[x,y],m=function(a){this.options=a};
m.prototype.getAddElement=function(){void 0===this.addElement&&(this.addElement=LPTools.createElement("div","addMenuItem"),this.build(this.addElement,this.options.icon?this.options.icon:"images/vault_4.0/Add.png"));return this.addElement};m.prototype.build=function(a,c){a.appendChild(LPTools.createElement("span",null,Strings.Vault[this.options.text]));var b=LPTools.createElement("div"),g=LPTools.createElement("div"),l=LPTools.createElement("img",{src:c});a.appendChild(b);b.appendChild(g);g.appendChild(l);
$(a).bind("click",this.options.func)};m.prototype.getMenuElement=function(){void 0===this.menuElement&&(this.menuElement=LPTools.createElement("li","addMenuItem"),this.build(this.menuElement,this.options.additionalIcon));return this.menuElement};var hb=new m({text:"ADD_SITE",icon:"images/vault_4.0/Sites_Active.png",func:function(){b.openSiteDialog({saveOptions:{source:"vault"}})}}),da=new m({text:"ADD_NOTE",icon:"images/vault_4.0/Notes_Active.png",additionalIcon:"images/vault_4.0/Add_Secure_Note.png",
func:function(){b.openNoteDialog({saveOptions:{source:"vault"}})}}),ib=new m({text:"ADD_FORM_FILL",icon:"images/vault_4.0/Form_Fills_Active.png",func:function(){b.openFormFillDialog({saveOptions:{source:"vault"}})}}),jb=new m({text:"ADD_SHARED_FOLDER",func:function(){b.openCreateSharedFolderDialog()}}),kb=new m({text:"ADD_IDENTITY",func:function(){b.openIdentityDialog()}}),lb=new m({text:"GIVE_EMER_ACCESS",func:function(){dialogs.addEmergencyAccess.open()}}),mb=new m({text:"ADD_CREDIT_MON",func:function(){b.openCreateCreditMonitoringDialog()}}),
Ba=new m({text:"ADD_FOLDER",additionalIcon:"images/vault_4.0/Add_Folder.png",func:function(){b.openFolderDialog()}}),H=new m({text:"SHARE_ITEMS",additionalIcon:"images/vault_4.0/Add_Share.png",func:function(){b.openShareDialog()}}),nb=Strings.translateString("search my vault"),p=null,ea=$("#advacedOptionsOverlay"),ob=$("#inProgressOverlay"),R=$("#tools"),pb=$("#options"),n=$("#mainScroll"),s=$("#addMenu"),Ca=$("#addMenuItems"),Da=$("#addMenuButton"),Ea=$("#addMenuButtonCustom"),Fa=$("#gridButton"),
Ga=$("#listButton"),S=$("#collapseAllToggle"),T=$("#sizeToggle"),Ha=$("#orderOption"),Ia=$("#sortOrderMenu"),qb=$("#sortOrderOption"),fa=$("#userMenuItems"),D=$("#leftMenuMinimizeButton"),Ja=$("#moreActions"),Ka=d.getElementById("contextMenu").parentElement,h=$(d.body),ga=$("#advancedMenuItem"),ha=d.getElementById("sortOrderMenu").children[0],k=$("#vaultSearch"),La=$("#userMenuContainer"),rb=$("#pageTitle"),U=null,z=null,V=!0,t=null,q=null,f=null,Ma=function(a,c){f.getContainer()===c&&(f.removeBodyState(),
f.addBodyState())},e=function(a){a=a||{};this.state=a.bodyState;this.menuElement=a.menuElement||null;this.emptyState=this.state+"Empty";this.container=null;this.sortOptions=a.sortOptions||null;this.persistent=LPTools.getOption(a,"persistent",!0);this.searchPlaceholder=LPTools.getOption(a,"searchPlaceholder",nb);this.title=a.title||"";this.addMenu=a.addMenu;this.additionalOptionButtons=a.additionalOptionButtons;this.scrollParent=a.scrollParent;this.notificationCount=a.notificationCount;var c=this;
Topics.get(Topics.CLEAR_DATA).subscribe(function(){c.clear()});a.menuElement&&a.menuElement.bind("click",function(){c.parent?c.parent.show(c):c.show()})};e.prototype.applyContainerFunction=function(a){var c=this.getContainer();if(null!==c)switch(typeof a){case "string":var b=[];if(1<arguments.length)for(var g=1,l=arguments.length;g<l;++g)b.push(arguments[g]);return c[a].apply(c,b);case "function":return a(c)}};e.prototype.updateNotificationCount=function(a){var c=0,b=this.menuElement.find(".tabNotification");
"undefined"!==typeof a?(c=parseInt(b.text()),W(b,c-a),this.parent&&this.parent.updateNotificationCount(a)):this.notificationCount&&(c=this.notificationCount(),W(b,c));return c};e.prototype.getSortOptions=function(){return this.sortOptions};e.prototype.getContainer=function(){return this.container};e.prototype.setContainer=function(a,c){if(this.container=a)a._buildOptions.stateChangeCallback=Ma,LPTools.getOption(c,"checkForStateChange",!0)&&f===this&&Ma(a.isEmpty(),a),f===this&&""!==k.val()&&b.search(k.val())};
e.prototype.openAll=function(){this.applyContainerFunction("openAll")};e.prototype.collapseAll=function(){this.applyContainerFunction("collapseAll")};e.prototype.createSelectionContextMenu=function(){return this.applyContainerFunction("createSelectionContextMenu")};e.prototype.isEmpty=function(){return this.applyContainerFunction("isEmpty")};e.prototype.search=function(a){var c=this.applyContainerFunction("applySearch",a);a&&null===c&&!this.isEmpty()?h.addClass("searchEmpty"):h.removeClass("searchEmpty")};
e.prototype.clearSelected=function(){this.applyContainerFunction("clearSelected")};e.prototype.getSelectedItems=function(){return this.applyContainerFunction("getSelectedItems")};e.prototype.getSortOrder=function(){void 0===this.sortOrder&&(this.sortOrder=LPProxy.getPreference(this.state+"SortOrder",this.sortOptions?this.sortOptions[0]:null));return this.sortOrder};e.prototype.setSortOrder=function(a){this.sortOrder=a;LPProxy.setPreferences(this.state+"SortOrder",a)};e.prototype.addBodyState=function(){h.addClass(this.getState());
var a=this.getContainer();null!==a&&a.isEmpty()&&0===oneMinuteSignup.getReminderCount()?h.addClass("empty"):h.removeClass("empty")};e.prototype.removeBodyState=function(){h.removeClass(this.emptyState);h.removeClass(this.state)};e.prototype.hide=function(){null!==this.menuElement&&this.menuElement.removeClass("selected");this.parent&&null!==this.parent.menuElement&&this.parent.menuElement.removeClass("selected");this.removeBodyState();if(this.additionalOptionButtons)for(var a=0,c=this.additionalOptionButtons.length;a<
c;++a)this.additionalOptionButtons[a].detach();this.persistent?this.applyContainerFunction("hide"):this.clear()};e.prototype.getAddMenuItems=function(){var a=[];if(this.addMenu&&0<this.addMenu.length)for(var c=0,b=this.addMenu.length;c<b;++c){var g=this.addMenu[c];if(g!==H||LPFeatures.allowIndividualSharing())(g!==da||LPFeatures.allowNotes())&&a.push(g)}return a};e.prototype.show=function(){if(f!==this){null!==f&&(k.val(""),A(),f.hide());k.attr("placeholder",this.searchPlaceholder);null!==this.menuElement&&
this.menuElement.addClass("selected");this.parent&&null!==this.parent.menuElement&&this.parent.menuElement.addClass("selected");rb.text(this.title);this.addBodyState();this.scrollParent.scrollTop(0);var a=this.getSortOptions();if(null===f||f.getSortOptions()!==a)if(null!==a){LPTools.removeDOMChildren(ha);for(var c=0,C=a.length;c<C;++c){var g=d.createElement("li"),l=a[c];g.textContent=l;LPPlatform.addEventListener(g,"click",sb(l));ha.appendChild(g)}Ha.show()}else Ha.hide();f=this;(a=this.getSortOrder())&&
b.sort(a);this.additionalOptionButtons&&pb.append(this.additionalOptionButtons);Ca.children().detach();Ea.children().detach();a=this.getAddMenuItems();if(0<a.length){Ea.append(a[0].getAddElement());for(c=a.length-1;0<c;--c)Ca.append(a[c].getMenuElement());Da.show()}else Da.hide()}};e.prototype.getState=function(){return this.isEmpty()?this.emptyState:this.state};e.prototype.clear=function(){this.container&&(this.container.destruct(),this.container=null)};var j=function(a){a.bodyState=a.bodyState||
a.contentID;e.call(this,a);this.contentElement=d.getElementById(a.contentID);this.containerType=a.containerType;this.dataSource=a.dataFunction;this.buildOptions=a.buildOptions;this.filter=a.filter;var c=this;Topics.get(Topics.IDENTITY_ENABLE).subscribe(function(a){c.refresh(a)});c.initializeCallback=function(a,b){var l=new c.containerType(a,c.buildOptions);l.initialize(c.contentElement,c.scrollParent);c.filter&&l.applyFilter(c.filter,{checkForStateChange:!1});c.setContainer(l,{checkForStateChange:LPTools.getOption(b,
"checkForStateChange",!1)});Topics.get(Topics.DIALOG_LOADED).publish()}};j.prototype=Object.create(e.prototype);j.prototype.constructor=j;j.prototype.makeDataRequest=function(a,c){c.error=function(){Topics.get(Topics.DIALOG_LOADED).publish()};LPRequest.makeDataRequest(a,c)};j.prototype.initialize=function(a,c){if(null===this.container&&null!==this.containerType&&null!==this.dataSource){var b=this,g=a;a=g?function(a,c){b.initializeCallback(a,c);g()}:b.initializeCallback;Topics.get(Topics.DIALOG_LOADING).publish();
this.dataSource.call(this,a,c)}};j.prototype.show=function(a){if(null===this.container){var c=this;c.initialize(function(){a&&a();e.prototype.show.apply(c)})}else e.prototype.show.apply(this),a&&a()};j.prototype.refresh=function(a){null!==this.container&&(this.container.destruct(),this.container=null,this.initialize(null,{identity:a,checkForStateChange:!0}))};var B=function(a){e.call(this,a);this.setContainer(a.container||null);this.filter=a.filter};B.prototype=Object.create(e.prototype);B.prototype.constructor=
B;B.prototype.show=function(){this.container.applyFilter(this.filter,{checkForStateChange:!1});e.prototype.show.apply(this,arguments)};var Na=function(a){var c=null;if(a.views&&0<a.views.length){for(var b=0,g=a.views.length;b<g;++b)a.views[b].parent=this;this.show=function(b,C){b?(b.show(C),c=b):(null===c&&(c=a.defaultView()),c.show(C))};this.clear=function(){c=null};this.menuElement=a.menuElement;var l=a.menuElement.find(".notificationBubble");this.updateNotificationCount=function(a){W(l,parseInt(l.text())-
a)};b=function(){for(var c=0,b=0,C=a.views.length;b<C;++b)c+=a.views[b].updateNotificationCount();W(l,c)};Topics.get(Topics.LOGIN).subscribe(b);Topics.get(Topics.REFRESH_DATA).subscribe(b);var d=this;Topics.get(Topics.CLEAR_DATA).subscribe(function(){d.clear()})}},r=new B({filter:{showEmptyGroups:!0,func:function(a){return a instanceof AccountBaseDisplay||a instanceof ApplicationDisplay||a instanceof GroupDisplay}},sortOptions:G,menuElement:$("#vaultMenuItem"),bodyState:"site",scrollParent:n,title:Strings.translateString("Sites"),
addMenu:[hb,da,H,Ba]}),Oa=new B({filter:{showEmptyGroups:!1,func:function(a){return a instanceof NoteDisplay||a instanceof GroupDisplay}},sortOptions:G,menuElement:$("#notesMenuItem"),bodyState:"note",scrollParent:n,title:Strings.translateString("Secure Notes"),addMenu:[da,H,Ba]}),Pa=new B({filter:{showEmptyGroups:!1,multiSelect:!1,hasFolderView:!1,func:function(a){return a instanceof FormFillDisplay}},sortOptions:cb,menuElement:$("#formFillMenuItem"),bodyState:"formFill",scrollParent:n,title:Strings.translateString("Form Fills"),
addMenu:[ib]}),Qa=new j({containerType:IdentityContainer,dataFunction:function(a){for(var c=[],b=0,g=p._identities.length;b<g;++b)c.push(p._identities[b].newDisplayObject());a(c)},sortOptions:gb,contentID:"identityContent",bodyState:"identity",scrollParent:n,searchPlaceholder:Strings.translateString("search my identities"),buildOptions:{multiSelect:!1},title:Strings.translateString("Identities"),addMenu:[kb]}),X=new j({containerType:CreditMonitoringContainer,dataFunction:function(a,c){this.makeDataRequest(LPProxy.getCreditMonitoringData,
{success:function(b){for(var g=!0,l=[],d=0,e=b.length;d<e;++d){var f=b[d];"1"!==f.premium&&(g=!1);l.push(new CreditMonitoringProfile(f))}b=$("#creditMonitoring .viewExplanation");g?(b.hide(),X.title=Strings.translateString("Premium Credit Monitoring")):(b.show(),X.title=Strings.translateString("Credit Monitoring"));a(l,c)}})},persistent:!1,contentID:"creditMonitoring",scrollParent:n,title:Strings.translateString("Credit Monitoring"),addMenu:[mb]}),tb=GridListContainer,ub=Strings.translateString("search my deleted items"),
vb={allowDrag:!1,stickyFolders:!0,stickyFolderParent:d.getElementById("main")},wb=Strings.translateString("Deleted Items"),Ra,Sa=LPTools.createElement("div",{"class":"optionButton optionButtons",id:"purgeAllButton"},Strings.Vault.PURGE_ALL);LPPlatform.addEventListener(Sa,"click",function(){var a=ia.getContainer();a&&(a=a.getItemModelChildren(),0<a.length&&a[0].purge({itemsForAction:a}))});Ra=$(Sa);var ia=new j({containerType:tb,dataFunction:function(a){this.makeDataRequest(LPProxy.getDeletedItems,
{success:a})},filter:{showEmptyGroups:!1},sortOptions:G,contentID:"deletedItems",scrollParent:n,persistent:!1,searchPlaceholder:ub,buildOptions:vb,title:wb,additionalOptionButtons:[Ra]});ia.refresh=function(){};var I=new j({containerType:EmergencyAccessRecipientContainer,dataFunction:function(a){this.makeDataRequest(LPProxy.getEmergencyAccessRecipientInfo,{success:a})},filter:{showEmptyGroups:!1},sortOptions:G,menuElement:$("#emergencyTrustedMenuItem"),contentID:"emergencyTrustedContainer",bodyState:"emergencyTrusted",
scrollParent:n,persistent:!1,searchPlaceholder:Strings.translateString("search people I trust"),buildOptions:{allowDrag:!1},title:Strings.translateString("People I Trust"),addMenu:[lb]}),J=new j({containerType:EmergencyAccessSharerContainer,dataFunction:function(a){this.makeDataRequest(LPProxy.getEmergencyAccessSharerInfo,{success:a})},filter:{showEmptyGroups:!1},notificationCount:function(){var a=0,c=bg.get("g_emer_sharers");if(c)for(var b=0,g=c.length;b<g;++b)"0"===c[b].accepted&&++a;return a},
sortOptions:G,menuElement:$("#emergencyTrustingMenuItem"),contentID:"emergencyTrusting",bodyState:"emergencyTrusting",scrollParent:n,persistent:!1,searchPlaceholder:Strings.translateString("search people who trust me"),buildOptions:{allowDrag:!1},title:Strings.translateString("People Who Trust Me")}),ja=new Na({menuElement:$("#emergencyAccessMenuItem"),defaultView:function(){return 0<J.notificationCount()?J:I},views:[I,J]}),xb=IndividualShareContainer,yb=$("#receivedSharesMenuItem"),zb=Strings.translateString("search my received shares"),
Ab=Strings.translateString("Shared with Me"),K=new j({containerType:xb,sortOptions:eb,menuElement:yb,contentID:"receivedSharesContent",bodyState:"receivedShares",scrollParent:n,persistent:!1,notificationCount:function(){return bg.get("g_pendings").length},searchPlaceholder:zb,buildOptions:{multiSelect:!1},filter:{showEmptyGroups:!1,multiSelect:!1},title:Ab,addMenu:[H],dataFunction:function(a){this.makeDataRequest(LPProxy.getReceivedShareData,{params:{},success:function(c){for(var b=LPProxy.getAllModelItems(),
g=[],d=0,e=b.length;d<e;++d){var f=b[d],h=c[f.getID()];h&&("1"===h.state&&f instanceof AccountBase)&&g.push(new AcceptedReceivedSharedItem(f,h))}b=LPProxy.getPendingRecievedShares();d=!1;e=0;for(f=b.length;e<f;++e){var h=b[e],j=c[h._model.getID()];j?h._model._shareData=j:d=!0}d&&LPProxy.refreshSites();a(g.concat(b))}})}}),Bb=IndividualShareContainer,Cb=$("#sentSharesMenuItem"),Db=Strings.translateString("search my sent shares"),Eb=Strings.translateString("Shared with Others"),L=new j({containerType:Bb,
sortOptions:db,menuElement:Cb,contentID:"sentSharesContent",bodyState:"sentShares",scrollParent:n,persistent:!1,searchPlaceholder:Db,buildOptions:{multiSelect:!1},filter:{showEmptyGroups:!1,multiSelect:!1},title:Eb,addMenu:[H],dataFunction:function(a,c){this.makeDataRequest(LPProxy.getSentShareData,{params:{},success:function(b){for(var g=LPProxy.getAllModelItems(),d=[],e=0,f=g.length;e<f;++e)var h=g[e],d=d.concat(LPTools.buildSentShareItems(h,b[h.getID()]));a(d,c)}})}}),Fb=SharedFolderContainer,
Gb=$("#sharedFoldersMenuItem"),Hb=Strings.translateString("search my shared folders"),Ib=Strings.translateString("Shared Folders"),Jb=[jb],Y=$(LPTools.buildCheckbox(null,{text:Strings.translateString("View Deleted Shared Folders")}));Y.attr("id","showDeletedSharedFoldersButton");Y.addClass("optionButtons");Y.bind("click",function(){M?ka():la()});var u=new j({containerType:Fb,dataFunction:function(a){this.makeDataRequest(LPProxy.getSharedFolderData,{params:{},success:function(c){for(var b=LPProxy.getAllSharedGroupModelsByID(),
d=[],e=0,f=c.length;e<f;++e){var h=c[e];h.sharedata&&d.push(new SharedFolderItem(b[h.shareid],h))}a(d)}})},notificationCount:function(){return bg.get("g_pending_shares").length},sortOptions:fb,menuElement:Gb,contentID:"sharedFoldersContent",bodyState:"sharedFolders",scrollParent:n,searchPlaceholder:Hb,buildOptions:{multiSelect:!1},title:Ib,addMenu:Jb,additionalOptionButtons:[Y]});u.initialize=function(a,c){var b=a;j.prototype.initialize.call(this,b?function(){var a={checkForStateChange:!1};M?la(a):
ka(a);b()}:function(){var a={checkForStateChange:!1};M?la(a):ka(a)},c)};var N=new Na({menuElement:$("#sharingMenuItem"),defaultView:function(){return 0<K.notificationCount()?K:LPProxy.getAccountClass()===Constants.USER_FREE?L:LPFeatures.allowSharedFolders()?u:K},views:[u,L,K]});(new e({menuElement:$("#oneMinuteSignUpMenuItem"),bodyState:"onemin",title:Strings.translateString("One Minute SignUp")})).show=function(){oneMinuteSignup.show(oneMinuteSignup.modes.normal)};var O=function(){LPTools.hideContextMenu(q);
q=null},E=function(a){a.preventDefault();a.stopPropagation()},na=function(){O();fa.hide("fast");La.removeClass("selected");ma();Ta()},A=function(){f&&f.clearSelected()},sb=function(a){return function(c){O();b.sort(a);E(c)}},ma=function(){ga.removeClass("selected");R.hide("fast");ea.hide()},Ua=function(){s.addClass("open")},Ta=function(){s.removeClass("open")};b.initialize=function(a){var c=$("#showReminders");bg.get("g_one_minute_signup_enabled")?oneMinuteSignup.fetchReminders():c.addClass("hidden");
bg.isOffline()?(c.attr("data-toggle","tooltip"),c.attr("title","You have to be online."),c.addClass("disabled")):(c.removeAttr("data-toggle"),c.removeAttr("title"),c.removeClass("disabled"));oneMinuteSignup.setTour(v);try{Topics.get(Topics.CLEAR_DATA).publish();LPProxy.initializeModel();d.body.removeAttribute("class");Topics.get(Topics.REFRESH_PREFERENCES).publish();$(".leftMenuItem").removeClass("selected");LPProxy.getPreference("gridView")||b.displayAsList();LPProxy.getPreference("compactView")&&
b.displayCompact();p=LPProxy.getUser();p.initialize(fa,$("#userMenuText"));VaultState.setIdentities(p._identities);LPProxy.enableCurrentIdentity(p._identities);p.isFree()&&this.showAdPane();this.firstTimeLogin();LPTools.parseUserSpecificMenu(d.getElementById("tools"),p._accountClass);LPTools.parseUserSpecificMenu(d.getElementById("more"),p._accountClass);oa();LPProxy.getSecurityChallengeScore(Va);D.attr("title","Maximize Menu");LPPlatform.showIntroTutorial();if(LPFeatures.allowGift()){var e=$("#specialOfferMenu");
e.show();e.bind("click",function(){bg.openURL(LPProxy.getBaseURL()+"gift.php")})}var g=LPProxy.getAccountClass(),f=d.getElementById("sharedFoldersMenuItem").parentElement;g===Constants.USER_FREE&&($("#emptySharedFoldersIcon .tourText").append(LPTools.createElement("a",{"class":"nbtn rbtn dynamicWidth",href:LPProxy.getBaseURL()+"go-premium",target:"_blank"},Strings.translateString("Upgrade to Premium"))),f.parentElement.appendChild(f));$(f.parentElement).children().last().addClass("last");Wa();if(!bg.get("g_onemin_advert_enabled")||
!LPPlatform.lpIsExtension())$("#vaultFooter").addClass("disabled");else{var j=bg.get("g_onemin_advert_app_threshold"),m=LPProxy.getAllModelItems().length;j&&m>j?$("#vaultFooter").addClass("disabled"):$("#vaultFooter").removeClass("disabled")}$("#linkToOnemin","#vaultFooter").click(function(){bg.sendLpImprove("oneminute::notificationfromvaultomsstart");oneMinuteSignup.show(oneMinuteSignup.modes.normal);return!1})}catch(n){LPPlatform.logException(n)}finally{var k=$("#vaultLoadingOverlay");LPTools.getOption(a,
"fadeIn",!1)?(k.addClass("fadeIn"),setTimeout(function(){k.addClass("loaded")},500)):k.addClass("loaded");h.addClass("loaded")}};var Ya=function(){LPProxy.getPreference("leftMenuMaximize")&&Xa()},Wa,Kb=function(a){b.openReceivedShareCenter(function(){var c=LPProxy.getPendingRecievedShare(a);c&&b.openAcceptShareDialog(c)})},Lb=function(a){b.openReceivedShareCenter(function(){var c=LPProxy.getPendingRecievedShare(a);c&&c.reject()})};Wa=function(){var a=LPTools.getURLParams(),c;for(c in a){var d=a[c];
"cmd"===c&&(c=d);switch(c){case "opengoogleauth":case "opensettings":Topics.get(Topics.EDIT_SETTINGS).publish();break;case "openhistory":LPProxy.openHistory();break;case "openbookmarklets":LPProxy.openBookmarklets();break;case "linkpersonal":b.openLinkAccountDialog();break;case "unlinkpersonal":b.unlinkAccount();break;case "sharedfolder":case "sf":b.openSharingCenter();break;case "addidentity":b.openManageIdentities();b.openIdentityDialog();break;case "showdeleted":b.openDeletedItems();break;case "viewcreditmon":b.openCreditMonitoring();
break;case "share":for(var g=[],d=d.split(","),e=0,h=d.length;e<h;++e){var j=d[e],k=LPProxy.getSiteModel(j);k||(k=LPProxy.getNoteModel(j));k&&g.push(k)}0<g.length&&b.openShareDialog(g);break;case "edit":LPProxy.getSiteModel(d)?b.openSiteDialog({vaultItem:d}):LPProxy.getNoteModel(d)&&b.openNoteDialog({vaultItem:d});break;case "acceptshare":Kb(d);break;case "rejectshare":Lb(d)}}if(null===f)switch(a.view){case "emergencyAccess":I.show();break;case "emergencyAccessOthers":J.show();break;default:r.show()}};
var Za=function(a){if(a){a=a.getAllSubGroupsIncludingFavorites(!0);for(var c=[],b=0,d=a.length;b<d;++b){var e=a[b];e.isExpanded()&&c.push(e._model.getName())}LPPlatform.setOpenGroups(c)}},Va=function(a){$("#securityScore").text(null!==a?Math.round(a)+"%":"")};b.toggleInProgressOverlay=function(){ob.toggle()};var W=function(a,c){0<c?(a.text(c),a.show()):a.hide()},oa,$a=!1;oa=function(){if(!$a)for(var a=LPProxy.getEmergencyAccessRecipientModels(),c=0,b=a.length;c<b;++c){var d=a[c];if(d.allowedAccess()||
d.hasRequestedAccess()){dialogs.denyEmergencyAccess.open({sharee:d});$a=!0;break}}};b.openVault=function(){r.show()};b.openNotes=function(){Oa.show()};b.openFormFills=function(){Pa.show()};b.toggleAdvancedMenu=function(a){ga.toggleClass("selected");R.toggle("fast");ea.toggle();E(a)};b.clear=function(){p&&(p.destruct(),p=null);d.body.setAttribute("class","loggedout"+(LPPlatform.canBackgroundOpenPopover()?" canopenpopover":" cannotopenpopover"));$("#vaultLoadingOverlay").removeClass("loaded fadeIn");
k.val("");A();q=t=z=U=f=null};var Xa=function(){h.hasClass("maximized")?(h.removeClass("maximized"),D.removeClass("opened"),D.attr("title","Maximize Menu"),LPProxy.setPreferences("leftMenuMaximize",!1)):(h.addClass("maximized"),D.addClass("opened"),D.attr("title","Minimize Menu"),LPProxy.setPreferences("leftMenuMaximize",!0))};b.addSource=function(a){if(a){if(!a.saveOptions||!a.saveOptions.source)a.saveOptions={source:"vault"}}else a={saveOptions:{source:"vault"}};return a};b.openSiteDialog=function(a){dialogs.site.open(b.addSource(a))};
b.openTour=function(){LPProxy.getPreference("seenVault4.0")?(Ya(),k.focus()):v.show()};b.openNoteDialog=function(a){dialogs.note.open(b.addSource(a))};b.openFormFillDialog=function(a){dialogs.formFill.open(b.addSource(a))};b.openFolderDialog=function(a,b){dialogs.folder.open({vaultItem:a,defaultData:{groupParent:b?b.getName():""},groups:r.getContainer().getAllSubGroups()})};b.openCreateSharedFolderDialog=function(a,b){LPProxy.getAccountClass()===Constants.USER_FREE?dialogs.upgradePremium.open({upgradeText:[LPTools.createElement("h1",
"upgradeDialogHeader",Strings.translateString("Need to share passwords with family or friends?")),LPTools.createElement("p","dialogText",Strings.translateString("Go Premium now to create a Shared Folder, invite family or friends, and fill the folder with passwords and notes. Give up to 5 people access to the Shared Folder. Changes are synced automatically, and you can assign read-only access. Go Premium now to create a Shared Folder!"))]}):dialogs.createSharedFolder.open({group:a,children:b})};b.openSettingsDialog=
function(){null===U&&(AccountSettingsService.call(function(a){U=a;b.openSettingsDialog()},function(){Notifications.displayErrorMessage("Could not retrieve account settings!")}),Topics.get(Topics.DIALOG_LOADING).publish());dialogs.settings.open(U)};b.openLinkAccountDialog=function(){LPProxy.callAcctsIFrameCommand("linkpersonal")};b.unlinkAccount=function(){var a=LPProxy.getLinkedAccount();a&&a.unlink()};var pa=!1;Topics.get(Topics.ALL_COLLAPSED).subscribe(function(){pa=!0;S.addClass("selected");S.attr("title",
Strings.Vault.EXPAND_ALL)});Topics.get(Topics.ALL_EXPANDED).subscribe(function(){pa=!1;S.removeClass("selected");S.attr("title",Strings.Vault.COLLAPSE_ALL)});b.toggleCollapseAll=function(){pa?(Topics.get(Topics.EXPAND_ALL).publish(),Topics.get(Topics.ALL_EXPANDED).publish()):(Topics.get(Topics.COLLAPSE_ALL).publish(),Topics.get(Topics.ALL_COLLAPSED).publish())};var qa=!1;b.displayLarge=function(){Topics.get(Topics.DISPLAY_LARGE).publish();qa=!1;T.removeClass("selected");T.attr("title",Strings.Vault.COMPACT_VIEW);
LPProxy.setPreferences("compactView",!1)};b.displayCompact=function(){Topics.get(Topics.DISPLAY_COMPACT).publish();qa=!0;T.addClass("selected");T.attr("title",Strings.Vault.LARGE_VIEW);LPProxy.setPreferences("compactView",!0)};b.toggleSize=function(){qa?(b.displayLarge(),bg.lpevent(V?"v_grd_lrg":"v_lst_lrg")):(b.displayCompact(),bg.lpevent(V?"v_grd_cmp":"v_lst_cmp"))};b.displayAsGrid=function(){Topics.get(Topics.DISPLAY_GRID).publish();Fa.addClass("selected");Ga.removeClass("selected");LPProxy.setPreferences("gridView",
!0);V=!0};b.displayAsList=function(){Topics.get(Topics.DISPLAY_LIST).publish();Ga.addClass("selected");Fa.removeClass("selected");LPProxy.setPreferences("gridView",!1);V=!1};b.search=function(a){f&&f.search(a)};var ab=function(a,b){switch(b){case x:a.sortByName(!0);break;case y:a.sortByName(!1);break;case va:a.sortByFolder(!0);break;case wa:a.sortByFolder(!1);break;case Q:a.sortItemsByMostRecent();break;case xa:case za:a.sortByEmail(!0);break;case ya:case Aa:a.sortByEmail(!1)}};b.sort=function(a){qb.text(a);
ab(f.getContainer(),a);f.setSortOrder(a)};b.showMoreOptionsMenu=function(){Ja.show("fast")};b.hideMoreOptionsMenu=function(){Ja.hide("fast")};b.openEmergencyAccess=function(){ja.show()};b.openEmergencyAccessTrusted=function(){ja.show(I)};b.openEmergencyAccessTrusting=function(){ja.show(J)};b.openSharingCenter=function(){N.show()};b.openReceivedShareCenter=function(a){N.show(K,a)};b.openSentShareCenter=function(a){N.show(L,a)};b.openSharedFolderCenter=function(a){N.show(u,a)};var M=!1,ka=function(a){u.getContainer().applyFilter({showEmptyGroups:!1,
multiSelect:!1,func:function(a){return!a._model.isDeleted()}},a);M=!1},la=function(a){u.getContainer().applyFilter({showEmptyGroups:!1,multiSelect:!1,func:function(){return!0}},a);M=!0};b.openAcceptShareDialog=function(a){dialogs.acceptShare.open({vaultItem:a,groups:r.getContainer().getAllSubGroups()})};b.openShareDialog=function(a){LPTools.openShareDialog(a)};b.openSharedFolderDialog=function(a,b){dialogs.sharedFolder.open(a,b)};b.openSharedFolderAccessDialog=function(a){dialogs.sharedfolderAccess.open(a)};
b.openManageIdentities=function(){Qa.show()};b.openIdentityDialog=function(a){dialogs.identity.open(a)};b.enableIdentity=function(a){null!==z&&z!==a&&(z.disable(),LPProxy.enableIdentity(a));z=a;a=t?t._filter:null;null!==t&&(Za(t),t.destruct());var b=LPProxy.getAllItems({identity:z}),b=new GridListContainer(b,{separateItems:!0,separateFavorites:!0,stickyFolders:!0,ignoreFilterOnSearch:!0,keyboardNavigation:!0,stickyFolderParent:d.getElementById("main"),folderStateChange:Za}),e=LPPlatform.getOpenGroups();
if(null!==e){for(var g=!0,f=b.getAllSubGroupsIncludingFavorites(!0),h=0,j=f.length;h<j;++h){var k=f[h];e[k._model.getName()]?(k.expand(),g=!1):k.collapse()}g&&Topics.get(Topics.ALL_COLLAPSED).publish()}ab(b,r.getSortOrder());b.initialize(d.getElementById("vaultContent"),n);b.applyFilter(a);r.setContainer(b);Oa.setContainer(b);Pa.setContainer(b);t=b};b.openCreditMonitoring=function(){X.show()};b.openCreateCreditMonitoringDialog=function(){dialogs.createCreditMonitoring.open()};b.openDeletedItems=function(){ia.show()};
var v,F=0,P=null,w=null,Mb=d.getElementById("tourItems"),Z=$("#tourLeft"),ra=$("#tourRight");Z.hide();Z.bind("click",function(){v.reverse()});ra.bind("click",function(){v.advance()});for(var Nb=function(a){return function(){v.goTo(a)}},w=d.getElementById("tourSteps").children,aa=0,Ob=w.length;aa<Ob;++aa)LPPlatform.addEventListener(w[aa],"click",Nb(aa));w[0].setAttribute("class","tourStep selected");var ba=function(a){if(a!==F&&0<=a&&a<w.length){w[F].setAttribute("class","tourStep");var b="tour"+(a+
1);Mb.setAttribute("class",b);h.addClass(b);P&&h.removeClass(P);P=b;F=a;w[F].setAttribute("class","tourStep selected");0===a?Z.hide():Z.show();a===w.length-1?ra.hide():ra.show()}},sa=function(){ba(F+1)},ta=function(){ba(F-1)};v={advance:sa,reverse:ta,goTo:function(a){ba(a)},hide:function(){h.removeClass("tourState");h.removeClass(P);P=null;Topics.get(Topics.RIGHT_ARROW).unsubscribe(sa);Topics.get(Topics.LEFT_ARROW).unsubscribe(ta)},show:function(){ba(0);h.addClass("tourState");Topics.get(Topics.RIGHT_ARROW).subscribe(sa);
Topics.get(Topics.LEFT_ARROW).subscribe(ta)}};b.showAdPane=function(){var a=d.getElementById("ad"),b=d.createElement("iframe");b.setAttribute("src",ua.getPartnerURL(LPProxy.getBaseURL()+"ads.php?nobr=1&noga=1&rand="+Math.floor(1E3*Math.random())+"&v="+LPProxy.getVersion()));a.appendChild(b);h.addClass("freeUser");setInterval(function(){b.setAttribute("src",ua.getPartnerURL(LPProxy.getBaseURL()+"ads.php?v=4.0&nobr=1&noga=1&rand="+Math.floor(1E3*Math.random())+"&v="+LPProxy.getVersion()))},3E5)};b.firstTimeLogin=
function(){if(bg.get("g_first_time_login")){var a=LPTools.createElement("iframe",{"class":"displaynone",src:LPProxy.getBaseURL()+"lppixel.php"});$("#main").after(a)}};h.bind("click",function(){na()});$("#vault").bind("click",function(){A();na()});$("#loginButton").bind("click",function(){bg.open_login()});LPPlatform.addEventListener(window,"unload",function(){Topics.get(Topics.CLEAR_DATA).publish()});k.LP_addSearchHandlers("inputLight",function(a){b.search(a)});k.bind("keydown",function(a){if(40===
(a.keyCode||a.which)){var b=f.getContainer();b&&(b=b.getAllChildrenOrdered(),0<b.length&&(b[0].focus(),a.preventDefault(),a.stopPropagation()))}});$("#orderOption").bind("click",function(a){Ia.toggle("fast");q=Ia;LPTools.addKeyBoardNavigation(ha.children);E(a)});$("#actions").bind("click",function(a){if(null===q||q.get(0).parentElement!==Ka){var b=f.createSelectionContextMenu();Ka.appendChild(b);b.removeAttribute("style");q=$(b);q.show("fast")}else O();E(a)});$("#sharingMenuItem").bind("click",function(){b.openSharingCenter()});
ga.bind("click",b.toggleAdvancedMenu);ea.bind("click",ma);D.bind("click",Xa);LPPlatform.addEventListener(d.getElementById("settingsMenuItem"),"click",function(){Topics.get(Topics.EDIT_SETTINGS).publish()});$("#linkAccountMenuItem").bind("click",function(){b.openLinkAccountDialog()});R.on("click",".toolsMenuItem.subMenuOption",function(){return!1});R.on("click",".toolsMenuItem",ma);s.bind("mouseenter",Ua);s.bind("mouseleave",Ta);s.bind("touchstart",function(a){s.unbind("mousenter");s.unbind("mouseleave");
s.hasClass("open")||(Ua(),a.preventDefault())});LPPlatform.addEventListener(d.getElementById("collapseAllToggle"),"click",function(){b.toggleCollapseAll()});LPPlatform.addEventListener(d.getElementById("showReminders"),"click",function(){oneMinuteSignup.show(oneMinuteSignup.modes.reminder)});LPPlatform.addEventListener(d.getElementById("sizeToggle"),"click",function(){b.toggleSize()});LPPlatform.addEventListener(d.getElementById("gridButton"),"click",function(){b.displayAsGrid()});LPPlatform.addEventListener(d.getElementById("listButton"),
"click",function(){b.displayAsList()});LPPlatform.addEventListener(d.getElementById("userMenuContainer"),"click",function(a){La.toggleClass("selected");fa.toggle("fast");E(a)});var bb=function(){v.hide();LPProxy.getPreference("seenVault4.0")||LPProxy.setPreferences("seenVault4.0",!0);Ya()};LPPlatform.addEventListener(d.getElementById("skipTour"),"click",bb);LPPlatform.addEventListener(d.getElementById("tourOpenMyVault"),"click",bb);LPPlatform.addEventListener(d.getElementById("manageIdentitiesMenuItem"),
"click",function(){b.openManageIdentities()});LPPlatform.addEventListener(d.getElementById("creditMonitoringMenuItem"),"click",function(){b.openCreditMonitoring()});LPPlatform.addEventListener(d.getElementById("openTourMenuItem"),"click",function(){v.show()});$(".toolsMenuItem.subMenuOption").bind("click",function(a){$(a.target.parentElement.nextElementSibling).toggle("fast");$(a.target).toggleClass("selected");E(a)});LPPlatform.addEventListener(d.getElementById("toolsImport"),"click",function(){LPProxy["import"]()});
LPPlatform.addEventListener(d.getElementById("toolsExport"),"click",function(){LPProxy["export"]()});LPPlatform.addEventListener(d.getElementById("toolsOpenFavorites"),"click",function(){LPProxy.openAllFavorites()});LPPlatform.addEventListener(d.getElementById("bookmarkletsMenuItem"),"click",function(){LPProxy.openBookmarklets()});LPPlatform.addEventListener(d.getElementById("historyMenuItem"),"click",function(){LPProxy.openHistory()});LPPlatform.addEventListener(d.getElementById("deletedMenuItem"),
"click",function(){b.openDeletedItems()});LPPlatform.addEventListener(d.getElementById("generateSharingKeys"),"click",function(){bg.lpevent("v_gsk");dialogs.sharingKey.open()});$("#generateSharingKeys").hide();LPPlatform.addEventListener(d.getElementById("generatePasswordMenuItem"),"click",function(){bg.lpevent("v_gpw");dialogs.generatePassword.open({fillGenerated:!1,saveOptions:{source:"vault"}})});$("#generatePasswordMenuItem").hide();$("#removedLinkedAccountMenuItem").bind("click",function(){b.unlinkAccount()});
$("#tryEnterprise").bind("click",function(){dialogs.enterpriseTrial.open()});$("#emergencyAccessMenuItem").bind("click",function(){b.openEmergencyAccess()});$("#securityMenuItem").bind("click",function(){bg.lpevent("v_sec");bg.openseccheck()});$("#adminConsoleMenuItem").bind("click",function(){bg.lpevent("v_oec");bg.openentconsole()});Topics.get(Topics.ITEMS_DESELECTED).subscribe(function(){b.hideMoreOptionsMenu()});Topics.get(Topics.ITEMS_SELECTED).subscribe(function(){b.showMoreOptionsMenu()});
Topics.get(Topics.SELECT_COUNT_CHANGE).subscribe(function(a){0<a&&$("#selectedItemCounter").text(a+" selected")});Topics.get(Topics.CONTEXT_MENU).subscribe(function(a,b){b.parentElement!==d.body&&d.body.appendChild(b);q=LPTools.displayContextMenu(a,b)});Topics.get(Topics.CONTEXT_CLOSE).subscribe(function(){O()});Topics.get(Topics.ITEM_SHARE).subscribe(function(a){b.openShareDialog(a)});Topics.get(Topics.IDENTITY_ENABLE).subscribe(function(a){b.enableIdentity(a)});Topics.get(Topics.CLEAR_DATA).subscribe(function(){b.clear();
Dialog.prototype.closeAllDialogs(!0);LPProxy.closeIFrame()});Topics.get(Topics.LOGIN).subscribe(function(a){b.initialize(a);Dialog.prototype.closeAllDialogs()});Topics.get(Topics.REQUEST_SUCCESS).subscribe(function(a){LPTools.getOption(a,"incrementAccountsVersion",!1)&&A()});var ca=function(a,b,d){k.val("");A();t.addChild(a.newDisplayObject(),b,d)};Topics.get(Topics.SITE_ADDED).subscribe(ca);Topics.get(Topics.NOTE_ADDED).subscribe(ca);Topics.get(Topics.FORM_FILL_ADDED).subscribe(ca);Topics.get(Topics.APPLICATION_ADDED).subscribe(ca);
Topics.get(Topics.EDIT_SHARED_FOLDER_ACCESS).subscribe(function(a){b.openSharedFolderAccessDialog(a)});Topics.get(Topics.EDIT_SITE).subscribe(function(a){b.openSiteDialog(a)});Topics.get(Topics.EDIT_NOTE).subscribe(function(a){b.openNoteDialog(a)});Topics.get(Topics.EDIT_FORM_FILL).subscribe(function(a){b.openFormFillDialog(a)});Topics.get(Topics.EDIT_APPLICATION).subscribe(function(a){dialogs.application.open(a)});Topics.get(Topics.EDIT_SETTINGS).subscribe(function(){LPProxy.callAcctsIFrameCommand("settings")});
Topics.get(Topics.EDIT_IDENTITY).subscribe(function(a){b.openIdentityDialog(a)});Topics.get(Topics.ACCEPT_SHARE).subscribe(function(a){b.openAcceptShareDialog(a)});Topics.get(Topics.RENAME_FOLDER).subscribe(function(a){b.openFolderDialog(a)});Topics.get(Topics.CREATE_SUB_FOLDER).subscribe(function(a){b.openFolderDialog(null,a)});Topics.get(Topics.GROUP_ADDED).subscribe(function(a,b){k.val("");A();r.getContainer().addChild(a.newDisplayObject(),b);if(a instanceof SharedGroup){var d=u.getContainer();
if(null!==d){var e=new SharedFolderItem(a);d.addChild(e)}}});Topics.get(Topics.ESCAPE).subscribe(function(){var a=Dialog.prototype.getCurrentDialog();a&&a.close();A();na()});Topics.get(Topics.EDIT_SHARED_FOLDER).subscribe(function(a,c){b.openSharedFolderDialog(a,c)});Topics.get(Topics.IDENTITY_ADDED).subscribe(function(a){Qa.getContainer().addChild(a.newDisplayObject())});Topics.get(Topics.REFRESH_DATA).subscribe(function(){LPProxy.initializeModel();oa();LPProxy.getSecurityChallengeScore(Va);Topics.get(Topics.IDENTITY_ENABLE).publish(z);
Dialog.prototype.closeInProcessDialogs();VaultItemDialog.prototype.refreshOpenDialogs();Topics.get(Topics.REFRESH_PREFERENCES).publish();O()});Topics.get(Topics.UPDATE_NOTIFICATION_COUNT).subscribe(function(a){f&&f.updateNotificationCount("number"===typeof a?a:1)});Topics.get(Topics.ACCOUNT_LINKED).subscribe(function(){$("#linkAccountMenuItem").LP_hide();$("#removedLinkedAccountMenuItem").LP_show()});Topics.get(Topics.ACCOUNT_UNLINKED).subscribe(function(){$("#linkAccountMenuItem").LP_show();$("#removedLinkedAccountMenuItem").LP_hide()});
Topics.get(Topics.CREATE_SHARED_FOLDER).subscribe(function(a,c){b.openCreateSharedFolderDialog(a,c)});Topics.get(Topics.REPROMPT).subscribe(function(a){dialogs.reprompt.open({successCallback:a})});Topics.get(Topics.CONFIRM).subscribe(function(a){dialogs.confirmation.open(a)});Topics.get(Topics.EMERGENCY_RECIPIENT_ADDED).subscribe(function(a){I.getContainer().addChild(a.newDisplayObject())});Topics.get(Topics.EDIT_EMERGENCY_RECIPIENT).subscribe(function(a){dialogs.addEmergencyAccess.open({vaultItem:a})});
Topics.get(Topics.REAPPLY_SEARCH).subscribe(function(a,b){var d=k.val();d&&a.applySearch(d,b)});Topics.get(Topics.ENROLLED_CREDIT_MONITORING).subscribe(function(){X.refresh()});Topics.get(Topics.ITEM_SHARED).subscribe(function(){L.refresh()});Topics.get(Topics.REFRESH_PREFERENCES).subscribe(function(){LPFeatures.updateFeatures({"import":!0,noexport:!1,share:!0,share_onlyfolders:!1,show_notes:!0,bookmarklets:!0,hideidentities:!1,showcredmon:!0,link_personal:!0,show_formfills:!0});LPProxy.hasReceivedShares()?
h.removeClass("noReceivedShares"):h.addClass("noReceivedShares");switch(f){case L:LPFeatures.allowIndividualSharing()||(N.clear(),r.show(),dialogs.alert.open({title:Strings.translateString("Policy Update"),text:Strings.translateString("Your enterprise has prohibited individual sharing.")}));break;case u:LPFeatures.allowSharedFolders()||(r.show(),dialogs.alert.open({title:Strings.translateString("Policy Update"),text:Strings.translateString("Your enterprise has prohibited sharing.")}))}});Topics.get(Topics.INITIALIZED).subscribe(function(){Strings.translate(d.body)});
LPPlatform.addEventListener(d,"DOMContentLoaded",function(){Notifications.initialize()})})(document,LPVault,BuildVariables);
