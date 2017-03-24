var SiteDialog=function(k){DialogWithGroupInput.call(this,k,{confirmOnClose:!1,hideButtons:!0,hideHeader:!0,type:Account,additionalClasses:"lmiDialog"});this.tiles=[];this.selectedTile=this.activeTile=null;this.isSelectable=!1};SiteDialog.prototype=Object.create(DialogWithGroupInput.prototype);SiteDialog.prototype.constructor=SiteDialog;
(function(){var k=function(b){return b.generatedPassword&&b.formData&&b.vaultItem};SiteDialog.prototype.initialize=function(b){DialogWithGroupInput.prototype.initialize.apply(this,arguments);var a=this;b.on("click",".neverSave",function(){bg.handleNeverURL({action:"never",cmd:"neverdomain",url:a.data.defaultData.url,fromsave:!0});bg.IntroTutorial.setState({enabled:!1});a.sendTrackingEvent("never");a.close()});a.backButton=b.find("#close").bind("click",function(){a.data.generatedPassword?k(a.data)?
(a.dialogContent.css({height:a.dialogContent.css("height")}),a.$element.addClass("removeGeneratedConfirmation"),a.sendTrackingEvent("undo")):(a.sendTrackingEvent("discard"),a.close()):(a.sendTrackingEvent("notnow"),a.close())});a.nextButton=b.find("#submit").bind("click",function(){a.isSelectable?a.selectedTile&&a.submit():a.submit()});b.find("#closeConfirmation").bind("click",function(){a.close()});b.find("#deleteGenerated").bind("click",function(){a.vaultItem.deleteItem();a.close()});b.find(".addNewSiteButton").bind("click",
function(){a.tiles[0].showDetails({clearErrors:!0,callback:function(){a.clearFields();a.defaultFields(a.data);a.originalData=a.getData();a.populateFields(a.data.dialogData);a.setAddText()}});a.tiles[0].unselect();a.tiles[0].setSelectable(!1);for(var b=1;b<a.tiles.length;++b)a.tiles[b].remove();$(this).hide()})};SiteDialog.prototype.sendTrackingEvent=function(b){var a=this.clickedEdit?"savesiteedit":"savesiteseen";b={action:b};this.clickedEdit&&$.extend(b,{changedEmail:this.inputFields.unencryptedUsername.getValue()!==
this.postSetupData.unencryptedUsername,changedPassword:this.inputFields.password.getValue()!==this.postSetupData.password,showedPassword:this.activeTile?this.activeTile.showedPassword():!1});bg.sendLpImprove(a,b)};SiteDialog.prototype.setAddText=function(){this.$element.find(".question").text(Strings.translateString("Add to LastPass?"));this.nextButton.text(Strings.translateString("Add"))};var r=function(b,a,d){var c=$.extend({},b.defaultData);a&&$.extend(c,a.getFormData($.extend(d,DialogInput.getProperties(b.dialogData),
DialogInput.getProperties(b.defaultData))));return c};SiteDialog.prototype.setup=function(b,a){a.saveOptions={saveFromSubmit:a.formData&&a.formData.loginForm?!0:!1,source:"saveSite"};var d=b.find(".addSiteFavicon");d.find("img").remove();d.append(LPTools.createElement("img",{"class":"favicon",src:a.favicon?a.favicon:"images/site/world.png"}));for(var c=this,x=!1,t=!1,p=b.find(".tileContainer"),d=b.find(".question"),g=b.find(".explanation"),q=b.find(".dialogForm"),y=b.find(".tile.template"),G=b.find(".deleteOverlayContainer.template"),
z,f={},l=y.find("[dialogFieldDisplay]"),h=0;h<l.length;++h)f[l[h].getAttribute("dialogFieldDisplay")]=!0;z=f;var A=DialogInput.getProperties(c.inputFields),f=function(a){a=a||{};var b=this,e=y.clone().removeClass("template"),d=e.find(".summaryView .tileTable"),g=e.find(".addSiteFavicon"),f=e.find(".tileEdit").detach(),h=e.find(".checkmark").detach(),j=null,m=c.data,n=!1,u=!1,v=null,l=!1,H=r(m,a.site,A),B=$.extend(r(m,a.site,A),m.dialogData),C=function(a){a&&c.clearErrors();c.originalData=H;c.populateFields(B)};
this.showedPassword=function(){return l};this.handleChange=function(a){c.requestAnimationFrame(function(b){e.addClass("transition");var c=function(a){e.removeClass("transition");b({callback:a&&a.callback})};a(function(a){tileHeight=LPTools.getOption(a,"tileHeight",e.children().first().outerHeight());if(tileHeight!==e.height()){e.css("height",tileHeight);var b=function(d){d.target===this&&(a&&a.transitionEndHandler&&transitionEndHandler(),c(a),e.unbind("transitionend",b))};e.bind("transitionend",b)}else c(a)})})};
this.showDetails=function(a){c.clickedEdit||(c.sendTrackingEvent("edit"),c.clickedEdit=!0);k(m)&&c.nextButton.text(Strings.translateString("Update"));null===v&&(v=e.height());this.handleChange(function(d){c.activeTile&&c.activeTile!==b&&c.activeTile.hideDetails();c.activeTile=b;C(a&&a.clearErrors);e.find(".tileContent").append(q);requestAnimationFrame(function(){e.addClass("details");x||(x=!0,c.adjustView(!0));d()});a&&a.callback&&a.callback()})};this.preSubmit=function(){c.activeTile!==this&&(c.activeTile&&
(c.activeTile.hideDetails(),c.activeTile=null),C());c.vaultItem=a.site};this.hideDetails=function(){B=c.getData();var a=q.clone();this.handleChange(function(b){e.find(".tileContent").append(a);requestAnimationFrame(function(){e.removeClass("details");b({transitionEndHandler:function(){a.remove()},tileHeight:v})})})};this.unselect=function(){n&&(c.selectedTile=null,n=!1,e.removeClass("selected"),c.$element.removeClass("selected"),c.nextButton.prop("disabled",!0))};this.toggleSelect=function(){n?(this.unselect(),
c.tiles.forEach(function(a){a!==b&&a.hideDeleteOverlay()})):(c.tiles.forEach(function(a){a!==b&&(a.showDeleteOverlay(),a.unselect())}),c.selectedTile=this,n=!0,e.addClass("selected"),c.$element.addClass("selected"),c.nextButton.prop("disabled",!1))};this.remove=function(){e.remove();for(var a=0;a<c.tiles.length;++a)if(c.tiles[a]===this){c.tiles.splice(a,1);break}};this.showDeleteOverlay=function(){t&&(null===j&&(j=G.clone().removeClass("template"),j.find(".cancelDeleteButton").bind("click",this.hideDeleteOverlay),
j.find(".deleteButton").bind("click",function(){a.site.deleteItem({confirm:!1,success:function(){b.remove()}});b.hideDeleteOverlay()})),e.append(j),requestAnimationFrame(function(){e.addClass("duplicate")}))};this.hideDeleteOverlay=function(){t&&(e.removeClass("duplicate"),j.one("transitionend",function(){e.hasClass("duplicate")||j.detach()}))};this.setSelectable=function(a){u=a;a=e.find(".favicon");u?(a.addClass("hoverFadeOut"),c.$element.addClass("selectable"),c.nextButton.prop("disabled",!0)):
(a.removeClass("hoverFadeOut"),c.$element.removeClass("selectable"),c.nextButton.prop("disabled",!1))};f.bind("click",function(){b.showDetails({clearErrors:!0})});h.bind("click",function(){b.toggleSelect()});e.on("click",".showPassword",function(){l=!0});var s=!1;e.bind("mouseenter",function(){s=!0;d.append(f);u&&g.append(h);requestAnimationFrame(function(){s&&e.addClass("hover")})});e.bind("mouseleave",function(){s=!1;e.removeClass("hover").one("transitionend",function(){s||(f.detach(),n||h.detach())})});
p.append(e);for(var I=a.site?a.site.getFormData(z):m.defaultData,D=e.find("[dialogFieldDisplay]"),w=0;w<D.length;++w){var E=D[w],F=I[E.getAttribute("dialogFieldDisplay")];F&&(E.textContent=F)}c.tiles.push(this)};if(a.matchingSites)if(0===a.matchingSites.length)k(a)?(d.text(Strings.translateString("Nice! We've now added this to LastPass")),this.nextButton.text(Strings.translateString("Got it")),this.backButton.text(Strings.translateString("Undo")),new f({site:a.vaultItem})):(this.setAddText(),g=new f,
a.defaultData.unencryptedUsername||g.showDetails());else if(1===a.matchingSites.length)k(a)?(d.text(Strings.translateString("Nice! We've updated your password.")),this.nextButton.text(Strings.translateString("Got it")),this.backButton.LP_hide()):(d.text(Strings.translateString("Update password?")),this.nextButton.text(Strings.translateString("Update")),a.defaultData.unencryptedUsername||b.find(".addNewSiteButton").show()),a.vaultItem=LPProxy.getSiteModel(a.matchingSites[0]),new f({site:a.vaultItem});
else{d.text(Strings.translateString("Which account should we update?"));a.defaultData.unencryptedUsername?(g.text(Strings.translateString("Choose one to update and delete the duplicate.")),t=!0):b.find(".addNewSiteButton").show();this.nextButton.text(Strings.translateString("Update"));for(g=0;g<a.matchingSites.length;++g)(new f({site:LPProxy.getSiteModel(a.matchingSites[g])})).setSelectable(!0)}a.generatedPassword&&!a.formData&&(d.text(Strings.translateString("Oops! What would you like to do with your generated password?")),
this.backButton.text(Strings.translateString("Discard")));DialogWithGroupInput.prototype.setup.apply(this,arguments);this.inputFields.unencryptedUsername.setValues(LPProxy.getSiteUsernames());this.inputFields.unencryptedUsername.disableClickToggle()};SiteDialog.prototype.validate=function(b){var a=DialogWithGroupInput.prototype.validate.apply(this,arguments);""===b.unencryptedUsername&&(this.addError("unencryptedUsername",Strings.translateString("Please enter a username.")),a=!1);return a};SiteDialog.prototype.getDialogActions=
function(){};SiteDialog.prototype.close=function(b){bg.LPTabState.clear();DialogWithGroupInput.prototype.close.apply(this,arguments)};SiteDialog.prototype.open=function(b){var a=this,d;if(b.generatedPassword&&b.formData)if(0===b.matchingSites.length)d=$.extend(r(b,void 0,void 0),b.dialogData),(new Account).addFromDialog(d,this.getGroup(d),{success:function(c){b.vaultItem=c;DialogWithGroupInput.prototype.open.call(a,b)}});else if(1===b.matchingSites.length&&b.defaultData.unencryptedUsername){var c=
LPProxy.getSiteModel(b.matchingSites[0]);d=$.extend(r(b,c,void 0),b.dialogData);c.saveFromDialog(d,this.getGroup(d),{success:function(c){b.vaultItem=c;DialogWithGroupInput.prototype.open.call(a,b)}})}else DialogWithGroupInput.prototype.open.call(a,b);else DialogWithGroupInput.prototype.open.call(a,b)};SiteDialog.prototype.showInitial=function(){var b=this;b.requestAnimationFrame(function(a){b.show();b.$element.addClass("animate-enter").one("animationend",function(){b.$element.removeClass("animate-enter");
a()})})};var p=null,q=!1;SiteDialog.prototype.showInProcessOverlay=function(){var b=this.$element;b.addClass("inProcess").one("animationend",function(){b.addClass("waiting");setTimeout(function(){q=!0;p&&p()},500)})};SiteDialog.prototype.hideInProcessOverlay=function(){};SiteDialog.prototype.closeOnSuccess=function(){var b=this,a=function(){b.$element.removeClass("waiting").addClass("success").one("animationend.success",function(){setTimeout(function(){b.close()},500)})};q?a():p=function(){setTimeout(function(){a()},
0)}};SiteDialog.prototype.performValidate=function(b){var a=this;if(a.selectedTile)if(a.selectedTile===a.activeTile)a.activeTile.handleChange(function(c){var d=b.callback;b.callback=function(){var b=arguments;c({callback:function(){d&&d.apply(a,b)}})};DialogWithGroupInput.prototype.performValidate.call(a,b)});else{var d=b.callback;b.callback=function(b){b||a.selectedTile.showDetails();d&&d.apply(this,arguments)};DialogWithGroupInput.prototype.performValidate.call(a,b)}};SiteDialog.prototype.getErrorOptions=
function(){return{"static":!0,alignTop:!0,showErrorLabel:!1}};SiteDialog.prototype.submit=function(){1===this.tiles.length&&(this.selectedTile=this.tiles[0]);this.selectedTile.preSubmit();DialogWithGroupInput.prototype.submit.apply(this,arguments);this.vaultItem?this.sendTrackingEvent("update"):this.sendTrackingEvent("add")};SiteDialog.prototype.postSetup=function(){DialogWithGroupInput.prototype.postSetup.apply(this,arguments);this.postSetupData=this.getData()};SiteDialog.prototype.getData=function(){var b=
DialogWithGroupInput.prototype.getData.apply(this,arguments),a=this.postSetupData;if(a&&b.fields)for(var d=0;d<b.fields.length;++d){var c=b.fields[d];a.unencryptedUsername&&a.unencryptedUsername===c.value?c.value=b.unencryptedUsername:a.password&&a.password===c.value&&(c.value=b.password)}return b}})();
