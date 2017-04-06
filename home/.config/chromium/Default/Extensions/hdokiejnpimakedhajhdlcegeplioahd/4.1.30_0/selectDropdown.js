DropdownInput=function(a,b){DialogInput.ErrorDisplayInput.call(this);this.inputObject=new DialogInput.Input(a,b&&b.dialog);this.shown=!1;this.onChangeCallback=null;this.disabled=!1;this.dropdownEnabled=!0;this.searchValue="";this.clearSearchValueTimeout=null;this.dynamic=!0;this.selectedOption=null;this.build(b);var c=this;c.clearSearchValue=function(){c.searchValue=""}};DropdownInput.prototype=Object.create(DialogInput.ErrorDisplayInput.prototype);DropdownInput.prototype.constructor=DropdownInput;
DropdownInput.prototype.ATTR_DROPDOWN_VALUE="dropdownValue";
(function(){DropdownInput.prototype.adjustView=function(){DialogInput.ErrorDisplayInput.prototype.adjustView.apply(this,arguments);var a=this.inputObject.getElement();a.css("margin","");this.dropdownElement.parent().css({"margin-top":a.css("margin-top"),"margin-right":a.css("margin-right"),"margin-bottom":a.css("margin-bottom"),"margin-left":a.css("margin-left")});a.css("margin",0);a=a.css("border-bottom-right-radius");this.dropdownElement.css({"margin-top":"-"+a,"border-bottom-left-radius":a,"border-bottom-right-radius":a})};
DropdownInput.prototype.build=function(a){var b=this.inputObject.getElement();if("SELECT"===b.prop("nodeName")){this.dynamic=!1;a=[];for(var c=b.children(),f=0,g=c.length;f<g;++f){var d=c[f];a.push({value:d.getAttribute("value"),label:d.textContent.trim(),"class":d.getAttribute("class")})}c=LPTools.createElement("input",{"class":"dialogInput",type:"text",readonly:!0});b.before(c);b.remove();this.inputObject.setElement(c);b=this.inputObject.getElement()}this.dropdownElement=$(LPTools.createElement("div",
"dropdownMenu selectDropdownList"));this.dropdownElement.append(LPTools.createElement("ul"));c=$(LPTools.createElement("div","dropdownContainer"));b.before(c);c.append(b);c.append(this.dropdownElement);this.setOptions(a);var e=this,h=!1;b.unbind("blur").bind("blur",function(){h?(b.focus(),h=!1):e.hide()});b.unbind("keypress").bind("keypress",function(a){e.dropdownEnabled&&e.handleKeypress(String.fromCharCode(a.charCode))});b.unbind("keydown").bind("keydown",function(a){var b=a.keyCode||a.which;switch(b){case 8:case 46:e.dropdownEnabled&&
e.handleDelete(b);break;case 40:!1===e.shown&&(e.handleDownArrow(),a.preventDefault(),a.stopPropagation())}});e.toggleHandler=function(a){e.toggle(a)};e.enableClickToggle();e.dropdownElement.children().first().unbind("mousedown").bind("mousedown",function(a){e.setValue(e.getDropdownValue(a.target));a.stopPropagation();a.preventDefault()});e.dropdownElement.unbind("mousedown").bind("mousedown",function(a){a.stopPropagation();a.preventDefault();LPPlatform.canPreventBlur()||(h=!0)});b.addClass(this.getDropdownClass())};
DropdownInput.prototype.enableClickToggle=function(){this.inputObject.getElement().bind("mousedown",this.toggleHandler).addClass("clickToggles")};DropdownInput.prototype.disableClickToggle=function(){this.inputObject.getElement().unbind("mousedown",this.toggleHandler).removeClass("clickToggles")};DropdownInput.prototype.enableDropdown=function(){this.dropdownEnabled||(this.getElement().removeClass("dropdownDisabled"),this.dropdownEnabled=!0)};DropdownInput.prototype.disableDropdown=function(){this.dropdownEnabled&&
(this.getElement().addClass("dropdownDisabled"),this.dropdownEnabled=!1)};DropdownInput.prototype.getElement=function(){return this.inputObject.getElement()};DropdownInput.prototype.getDialog=function(){return this.inputObject.getDialog()};DropdownInput.prototype.buildError=function(){return this.buildErrorElement({alignTop:!0,element:this.dropdownElement.parent()})};DropdownInput.prototype.validate=function(){return!0};DropdownInput.prototype.getDropdownClass=function(){return"selectDropdown"};DropdownInput.prototype.setValues=
function(a){var b=[];if(a)for(var c=0,f=a.length;c<f;++c){var g=a[c];b.push({value:g,label:g})}this.setOptions(b)};DropdownInput.prototype.default=function(){};DropdownInput.prototype.addOption=function(a){this.options[a.value]=a};DropdownInput.prototype.removeValue=function(a,b){b&&this.setValue(b);delete this.options[a];this.dropdownElement.find("li["+DropdownInput.prototype.ATTR_DROPDOWN_VALUE+'="'+a+'"]').remove()};DropdownInput.prototype.setOptions=function(a,b){if(a){this.options={};this.orderedOptions=
[];var c=this.dropdownElement.children().first();c.empty();for(var f=0,g=a.length;f<g;++f){var d=a[f];d.index=f;void 0===d.element?d.element=LPTools.createElement("li",{dropdownValue:d.value,"class":d.class},d.label):d.element.setAttribute(this.ATTR_DROPDOWN_VALUE,d.value);b&&(d.element.className=b);"undefined"!==typeof d.click&&LPPlatform.addEventListener(d.element,"mousedown",d.click);c.append(d.element);this.options[d.value]=d;this.orderedOptions.push(d)}}};DropdownInput.prototype.focus=function(){this.getElement().focus()};
DropdownInput.prototype.onChange=function(a){this.onChangeCallback=a};DropdownInput.prototype.fireOnChange=function(a){if(null!==this.onChangeCallback)this.onChangeCallback(a)};DropdownInput.prototype.getDropdownValue=function(a){return $(a).closest("["+DropdownInput.prototype.ATTR_DROPDOWN_VALUE+"]").attr(DropdownInput.prototype.ATTR_DROPDOWN_VALUE)};DropdownInput.prototype.addKeyBoardNavigation=function(){LPTools.addKeyBoardNavigation(this.dropdownElement.children().first().children(),{mouseEvent:"mousedown",
useRightArrow:!1,focusHandler:this.getKeyboardNavigationFocusHandler()})};DropdownInput.prototype.getKeyboardNavigationFocusHandler=function(){return null};DropdownInput.prototype.show=function(a){!this.disabled&&(this.dropdownEnabled&&!this.shown&&LPTools.hasProperties(this.options))&&(this.shown=!0,this.inputObject.getElement().addClass("toggled"),this.addKeyBoardNavigation(),this.dropdownElement.show(),this.dropdownElement.scrollTop(0),Topics.get(Topics.DROPDOWN_SHOWN).publish(this),void 0!==a&&
a.stopPropagation())};DropdownInput.prototype.hide=function(){this.shown&&LPTools.hasProperties(this.options)&&(this.shown=!1,LPTools.removeKeyBoardNavigation(),this.dropdownElement.hide(),this.inputObject.getElement().removeClass("toggled"),Topics.get(Topics.DROPDOWN_HIDE).publish(this))};DropdownInput.prototype.toggle=function(a){this.shown?this.hide():this.show();void 0!==a&&a.stopPropagation()};DropdownInput.prototype.disable=function(){this.disabled||(this.getElement().parent().append(LPTools.createElement("div",
"dialogInputOverlay")),this.inputObject.disable(),this.disabled=!0)};DropdownInput.prototype.enable=function(){this.disabled&&(this.getElement().parent().children().last().remove(),this.inputObject.enable(),this.disabled=!1)};DropdownInput.prototype.setReadOnly=function(){this.getElement().prop("readonly",!0)};DropdownInput.prototype.removeReadOnly=function(){this.getElement().prop("readonly",!0)};DropdownInput.prototype.getValue=function(){var a=this.inputObject.getValue();if(this.selectedOption&&
this.selectedOption.label===a)return this.selectedOption.value;if(this.dropdownEnabled&&this.options)for(var b in this.options)if(a===this.options[b].label){a=b;break}return a};DropdownInput.prototype.getInputValue=function(a){return a.label};DropdownInput.prototype.clear=function(){DialogInput.ErrorDisplayInput.prototype.clear.apply(this,arguments);this.setValue("")};DropdownInput.prototype.setValue=function(a){if(this.dropdownEnabled&&this.options&&this.options[a]){var b=this.options[a];this.inputObject.setValue(this.getInputValue(b));
this.optionIndex=b.index;this.selectedOption=b}else this.inputObject.setValue(a),this.selectedOption=null;this.hide();this.fireOnChange(a)};DropdownInput.prototype.handleKeypress=function(a){this.searchValue+=a;this.updateValue(this.searchValue);this.clearSearchValueTimeout&&clearTimeout(this.clearSearchValueTimeout);var b=this.clearSearchValue;this.clearSearchValueTimeout=setTimeout(function(){b()},500)};DropdownInput.prototype.handleDelete=function(){this.searchValue="";this.updateValue(this.searchValue)};
DropdownInput.prototype.handleDownArrow=function(){this.show();LPTools.setNavIndex(this.optionIndex)};DropdownInput.prototype.queryMatches=function(a,b,c){a=a.label.toLowerCase();b=b.toLowerCase();b=a.indexOf(b);return c?-1<b:0===b};DropdownInput.prototype.updateValue=function(a){for(var b=0,c=this.orderedOptions.length;b<c;++b){var f=this.orderedOptions[b];if(this.queryMatches(f,a)){this.setValue(f.value);break}}}})(document);