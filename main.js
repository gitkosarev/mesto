(()=>{"use strict";var t={baseUrl:"https://mesto.nomoreparties.co/",cohort:"cohort-62",token:"09d5475f-e954-4f6d-9cca-0bea06143685"};function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e(t)}function n(t,n){for(var o=0;o<n.length;o++){var r=n[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,i=function(t,n){if("object"!==e(t)||null===t)return t;var o=t[Symbol.toPrimitive];if(void 0!==o){var r=o.call(t,"string");if("object"!==e(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===e(i)?i:String(i)),r)}var i}var o=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._url=e,this._token=n}var e,o;return e=t,(o=[{key:"getUserInfo",value:function(){return fetch(this._url,{method:"GET",headers:{authorization:this._token,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"getInitialCards",value:function(){return fetch(this._url,{method:"GET",headers:{authorization:this._token,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"updateProfile",value:function(t,e){return fetch(this._url,{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:t,about:e})}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"saveCard",value:function(t,e){return fetch(this._url,{method:"POST",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({name:t,link:e})}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"deleteCard",value:function(){return fetch(this._url,{method:"DELETE",headers:{authorization:this._token,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"putLike",value:function(){return fetch(this._url,{method:"PUT",headers:{authorization:this._token,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"deleteLike",value:function(){return fetch(this._url,{method:"DELETE",headers:{authorization:this._token,"Content-Type":"application/json"}}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}},{key:"updateAvatar",value:function(t){return fetch(this._url,{method:"PATCH",headers:{authorization:this._token,"Content-Type":"application/json"},body:JSON.stringify({avatar:t})}).then((function(t){return t.ok?t.json():Promise.reject(t)}))}}])&&n(e.prototype,o),Object.defineProperty(e,"prototype",{writable:!1}),t}();function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function i(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var c=function(){function t(e){var n=e.nameSelector,o=e.descriptionSelector,r=e.avatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._profileNameEl=document.querySelector(n),this._profileDescriptionEl=document.querySelector(o),this._avatarSelectorEl=document.querySelector(r)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._profileNameEl.textContent,description:this._profileDescriptionEl.textContent,avatar:this._avatarSelectorEl.src}}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.description;this._profileNameEl.textContent=e,this._profileDescriptionEl.textContent=n}},{key:"setUserAvatar",value:function(t){this._avatarSelectorEl.src=t}}])&&i(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}function u(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==a(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==a(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===a(r)?r:String(r)),o)}var r}var l=function(){function t(e,n,o,r,i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._data=e,this._templateSelector=n,this._handleImageClick=o,this._handleRemoval=r,this._handleLike=i,this._clone=document.querySelector(this._templateSelector).content.cloneNode(!0),this._imageEl=this._clone.querySelector(".card__image"),this._likeButton=this._clone.querySelector(".card__like-button"),this._trashButtonEl=this._clone.querySelector(".card__trash-button"),this._likeCounterEl=this._clone.querySelector(".card__like-counter")}var e,n;return e=t,(n=[{key:"create",value:function(){return this._fillData(),this._setEventListeners(),this._clone}},{key:"_fillData",value:function(){this._clone.querySelector(".card__title").textContent=this._data.name,this._imageEl.src=this._data.link,this._imageEl.alt=this._data.alt,this._setLikeCounter(this._data)}},{key:"_setLikeCounter",value:function(t){this._likeCounterEl.textContent=t.likes?t.likes.length:0}},{key:"_setEventListeners",value:function(){var t=this;this._imageEl.addEventListener("click",(function(){t._handleImageClick(t._data)})),this._likeButton.addEventListener("click",this._handleLikeClick.bind(this)),this._data.isOwner?this._trashButtonEl.addEventListener("click",this._handleTrashClick.bind(this)):this._trashButtonEl.remove()}},{key:"_handleLikeClick",value:function(t){var e=this,n=t.target.classList.toggle("card__like-button_active");this._handleLike(n,this._data._id,(function(t){e._setLikeCounter(t)}))}},{key:"_handleTrashClick",value:function(t){this._handleRemoval(this._data._id,(function(){var e=t.target;this._removeCard(e)}),this)}},{key:"_removeCard",value:function(t){t.closest(".card").remove()}}])&&u(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function f(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==s(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==s(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===s(r)?r:String(r)),o)}var r}var p=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._config=e,this._formEl=n,this._buttonEl=this._formEl.querySelector(this._config.submitButtonSelector),this._inputList=Array.from(this._formEl.querySelectorAll(this._config.inputSelector))}var e,n;return e=t,(n=[{key:"enableValidation",value:function(){this._setEventListeners(),this._toggleButtonState()}},{key:"resetValidation",value:function(){var t=this;this._toggleButtonState(),this._inputList.forEach((function(e){t._hideInputError(e)}))}},{key:"_setEventListeners",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._checkValidity(e),t._toggleButtonState()}))}))}},{key:"_toggleButtonState",value:function(){this._formEl.checkValidity()?this._enableSubmitButton():this._disableSubmitButton()}},{key:"_enableSubmitButton",value:function(){this._buttonEl.classList.remove(this._config.inactiveButtonClass),this._buttonEl.disabled=!1}},{key:"_disableSubmitButton",value:function(){this._buttonEl.classList.add(this._config.inactiveButtonClass),this._buttonEl.disabled=!0}},{key:"_showInputError",value:function(t,e){var n=this._formEl.querySelector(".".concat(t.id,"-error"));t.classList.add(this._config.inputErrorClass),n.textContent=e,n.classList.add(this._config.errorClass)}},{key:"_hideInputError",value:function(t){var e=this._formEl.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._config.inputErrorClass),e.classList.remove(this._config.errorClass),e.textContent=""}},{key:"_checkValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}}])&&f(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}function h(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==y(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==y(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===y(r)?r:String(r)),o)}var r}var d=function(){function t(e,n){var o=e.items,r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._items=o,this._renderer=r,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"renderItems",value:function(){var t=this;this._items.forEach((function(e){t._renderer(e)}))}},{key:"addItem",value:function(t){this._container.append(t)}},{key:"prependItem",value:function(t){this._container.prepend(t)}}])&&h(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function m(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==v(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==v(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===v(r)?r:String(r)),o)}var r}var b=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._element=document.querySelector(e),this._bindedHandleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"setEventListeners",value:function(){this._element.addEventListener("mousedown",this._bindedHandleMousedownClose.bind(this))}},{key:"open",value:function(){this._element.classList.add("popup_opened"),document.addEventListener("keydown",this._bindedHandleEscClose)}},{key:"close",value:function(){this._element.classList.remove("popup_opened"),document.removeEventListener("keydown",this._bindedHandleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_bindedHandleMousedownClose",value:function(t){t.target.classList.contains("popup_opened")&&this.close(),t.target.classList.contains("popup__close-button")&&this.close()}}])&&m(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function _(t){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(t)}function g(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==_(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==_(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===_(r)?r:String(r)),o)}var r}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var o=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=k(t)););return t}(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(arguments.length<3?t:n):r.value}},S.apply(this,arguments)}function E(t,e){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},E(t,e)}function k(t){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},k(t)}var w=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&E(t,e)}(c,t);var e,n,o,r,i=(o=c,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=k(o);if(r){var n=k(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===_(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function c(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),(n=i.call(this,t))._handleSubmit=e,n._formEl=n._element.querySelector(".popup__form"),n._inputList=Array.from(n._element.querySelectorAll(".popup__input")),n}return e=c,(n=[{key:"setEventListeners",value:function(){var t=this;S(k(c.prototype),"setEventListeners",this).call(this),this._formEl.addEventListener("submit",(function(e){e.preventDefault(),t._handleSubmit(t._getInputValues())}))}},{key:"close",value:function(){S(k(c.prototype),"close",this).call(this),this._formEl.reset()}},{key:"_getInputValues",value:function(){var t={};return this._inputList.forEach((function(e){t[e.name]=e.value})),t}}])&&g(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),c}(b);function j(t){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},j(t)}function P(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==j(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==j(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===j(r)?r:String(r)),o)}var r}function O(){return O="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var o=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=L(t)););return t}(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(arguments.length<3?t:n):r.value}},O.apply(this,arguments)}function C(t,e){return C=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},C(t,e)}function L(t){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},L(t)}var T=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&C(t,e)}(c,t);var e,n,o,r,i=(o=c,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=L(o);if(r){var n=L(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===j(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function c(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),(e=i.call(this,t))._popupImageEl=e._element.querySelector(".popup__image"),e._popupImageCaptionEl=e._element.querySelector(".popup__caption"),e}return e=c,(n=[{key:"open",value:function(t){this._popupImageCaptionEl.textContent=t.name,this._popupImageEl.src=t.link,this._popupImageEl.alt=t.alt,O(L(c.prototype),"open",this).call(this)}}])&&P(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),c}(b);function R(t){return R="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},R(t)}function I(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,r=function(t,e){if("object"!==R(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==R(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===R(r)?r:String(r)),o)}var r}function q(){return q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var o=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=U(t)););return t}(t,e);if(o){var r=Object.getOwnPropertyDescriptor(o,e);return r.get?r.get.call(arguments.length<3?t:n):r.value}},q.apply(this,arguments)}function B(t,e){return B=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},B(t,e)}function U(t){return U=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},U(t)}var A=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&B(t,e)}(c,t);var e,n,o,r,i=(o=c,r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=U(o);if(r){var n=U(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===R(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function c(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,c),(n=i.call(this,t))._handleSubmit=e,n._formEl=n._element.querySelector(".popup__form"),n}return e=c,(n=[{key:"setEventListeners",value:function(){var t=this;q(U(c.prototype),"setEventListeners",this).call(this),this._formEl.addEventListener("submit",(function(e){e.preventDefault(),t._handleSubmit(),t.close()}))}},{key:"open",value:function(t){q(U(c.prototype),"open",this).call(this),this._handleSubmit=t}}])&&I(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),c}(b),x=".cards",D="#cardTemplate",V={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__submit",inactiveButtonClass:"popup__submit_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},z={};Array.from(document.querySelectorAll(V.formSelector)).forEach((function(t){var e=new p(V,t),n=t.getAttribute("name");z[n]=e,e.enableValidation()}));var H,N=new c({nameSelector:".profile__name",descriptionSelector:".profile__description",avatarSelector:".profile__avatar-image"}),J=new w("#addCardPopup",(function(e){J.close(),function(e){var n;n={name:e.name,link:e.description,alt:"фото ".concat(e.name)},new o("".concat(t.baseUrl,"v1/").concat(t.cohort,"/cards"),t.token).saveCard(n.name,n.link).then((function(t){t.isOwner=!0;var e=it(t);H.prependItem(e),console.log("Photo successfully saved. id: ".concat(t._id))})).catch((function(t){console.error("Error while saving photo. Response status: ".concat(t.status))}))}(e)}));J.setEventListeners();var M=new w("#editProfilePopup",(function(e){N.setUserInfo(e),M.close(),new o("".concat(t.baseUrl,"v1/").concat(t.cohort,"/users/me"),t.token).updateProfile(e.name,e.description).then((function(t){console.log("Profile successfully updated for user with id: ".concat(t._id))})).catch((function(t){console.error("Error while updating profile. Response status: ".concat(t.status))}))}));M.setEventListeners();var F=new T("#openImagePopup");F.setEventListeners();var G=new A("#confirmPopup");G.setEventListeners();var K=new w("#avatarPopup",(function(e){var n=e.description;new o("".concat(t.baseUrl,"v1/").concat(t.cohort,"/users/me/avatar"),t.token).updateAvatar(n).then((function(t){N.setUserAvatar(n),K.close(),console.log("Avatar successfully updated for current user with id: ".concat(t._id))})).catch((function(t){console.error("Error while updating avatar. Response status: ".concat(t.status))}))}));K.setEventListeners();var Q,W,X=document.querySelector(".profile__avatar-edit"),Y=document.querySelector(".profile__edit-button"),Z=document.querySelector(".profile__add-button"),$=document.querySelector("#addCardForm"),tt=document.querySelector("#editProfileForm"),et=tt.querySelector(".popup__input_value_name"),nt=tt.querySelector(".popup__input_value_description");function ot(e,n,r){G.open((function(){n.bind(r)(),new o("".concat(t.baseUrl,"v1/").concat(t.cohort,"/cards/").concat(e),t.token).deleteCard().then((function(t){console.log("Photo successfully deleted. Id: ".concat(e,". Result: ").concat(t.message))})).catch((function(t){console.error("Error while deleting photo. Response status: ".concat(t.status))}))}))}function rt(e,n,r){var i=new o("".concat(t.baseUrl,"v1/").concat(t.cohort,"/cards/").concat(n,"/likes"),t.token);e?i.putLike().then((function(t){r(t),console.log("Like successfully added. Card id: ".concat(n))})).catch((function(t){console.error("Error while adding like. Card id: ".concat(n,". Response status: ").concat(t.status))})):i.deleteLike().then((function(t){r(t),console.log("Like successfully deleted. Card id: ".concat(n))})).catch((function(t){console.error("Error while deleting like. Card id: ".concat(n,". Response status: ").concat(t.status))}))}function it(t){return new l(t,D,F.open.bind(F),ot,rt).create()}X.addEventListener("click",(function(){K.open()})),Y.addEventListener("click",(function(){var t;t=N.getUserInfo(),et.value=t.name,nt.value=t.description,M.open()})),Z.addEventListener("click",(function(){z[$.getAttribute("name")].resetValidation(),J.open()})),Q=new o("".concat(t.baseUrl,"v1/").concat(t.cohort,"/users/me"),t.token),W=new o("".concat(t.baseUrl,"v1/").concat(t.cohort,"/cards"),t.token),Promise.all([Q.getUserInfo(),W.getInitialCards()]).then((function(t){var e;e=t[0],N.userId=e._id,N.setUserInfo({name:e.name,description:e.about}),N.setUserAvatar(e.avatar),console.log("your id: ".concat(e._id)),function(t){if("content"in document.createElement("template")){var e=t.map((function(t){return t.alt="фото ".concat(t.name),t}));(H=new d({items:e,renderer:function(t){!function(t){t.isOwner=t.owner&&t.owner._id&&t.owner._id===N.userId;var e=it(t);H.addItem(e)}(t)}},x)).renderItems()}}(t[1])})).catch((function(t){console.error(t)}))})();