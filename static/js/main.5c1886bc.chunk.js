(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{30:function(t,n,e){"use strict";e.r(n);var r,i,o,a,s,c,l,u,d,h,f,g,p,b,m,y,v=e(0),j=e.n(v),k=e(16),O=e.n(k),x=e(7),S=e.n(x),w=e(10),z=e(4),B=e(8),P=e(5),L=e(6),A=function(){function t(n,e,r){Object(P.a)(this,t),this.parts=void 0,this.origin=void 0,this.rotated=void 0,this.parts=new Array(n).fill(!1),this.origin=e,this.rotated=r}return Object(L.a)(t,[{key:"getParts",get:function(){return this.parts}},{key:"getLength",get:function(){return this.parts.length}},{key:"getOrigin",get:function(){return this.origin}},{key:"getRotated",get:function(){return this.rotated}},{key:"hit",value:function(t){if(t>this.parts.length-1)throw new Error("Value higher than ship length");this.parts[t]=!0}},{key:"isSunk",value:function(){return this.parts.every((function(t){return t}))}}]),t}(),E=function(){function t(n){Object(P.a)(this,t),this.size=void 0,this.tiles=void 0,this.ships=void 0,this.size=n,this.tiles=Array.from({length:n},(function(){return new Array(n).fill(!1)})),this.ships=[]}return Object(L.a)(t,[{key:"getTiles",get:function(){return this.tiles}},{key:"getSize",get:function(){return this.size}},{key:"getShips",get:function(){return this.ships}},{key:"getBoardStates",get:function(){for(var t={shipHit:[],shipNotHit:[],missed:[],notShot:[]},n=0;n<this.size;++n)for(var e=0;e<this.size;++e){var r=this.tiles[n][e];if("boolean"===typeof r)r?t.missed.push([n,e]):t.notShot.push([n,e]);else{var i=r.getParts,o=r.getOrigin;i[o[0]-n+(o[1]-e)]?t.shipHit.push([n,e]):t.shipNotHit.push([n,e])}}return t}},{key:"getValidTiles",get:function(){for(var t=this,n=[],e=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],r=function(r){for(var i=function(i){e.every((function(n){return r+n[0]<0||r+n[0]>t.size-1||i+n[1]<0||i+n[1]>t.size-1||!1===t.tiles[r+n[0]][i+n[1]]}))&&n.push([r,i])},o=0;o<t.size;++o)i(o)},i=0;i<this.size;++i)r(i);return n}},{key:"placeShip",value:function(t,n,e){var r=this,i=this.getBoardStates.notShot,o=new A(t,[n[0],n[1]],e),a=Array.from({length:t},(function(t,n){return e?[n,0]:[0,n]})),s=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];a.forEach((function(t){if(!i.some((function(e){return e[0]===n[0]-t[0]&&e[1]===n[1]-t[1]})))throw new Error("Invalid location.");s.forEach((function(e){if(!(n[0]-t[0]+e[0]<0||n[0]-t[0]+e[0]>r.size-1||n[1]-t[1]+e[1]<0||n[1]-t[1]+e[1]>r.size-1)&&r.tiles[n[0]-t[0]+e[0]][n[1]-t[1]+e[1]])throw new Error("Invalid location.")}))})),a.forEach((function(t){r.tiles[n[0]-t[0]][n[1]-t[1]]=o})),this.ships.push(o)}},{key:"removeShip",value:function(t){var n=this;if("boolean"!==typeof this.tiles[t[0]][t[1]]){var e=this.tiles[t[0]][t[1]],r=e.getLength,i=e.getOrigin,o=e.getRotated;return Array.from({length:r},(function(t,n){return o?[n,0]:[0,n]})).forEach((function(t){n.tiles[i[0]-t[0]][i[1]-t[1]]=!1})),this.ships=this.ships.filter((function(t){return t.getLength!==r||t.getOrigin[0]!==i[0]||t.getOrigin[1]!==i[1]||t.getRotated!==o})),e}}},{key:"rotateShip",value:function(t){var n=this.removeShip(t);if(n)try{return this.placeShip(n.getLength,n.getOrigin,!n.getRotated),!0}catch(e){return this.placeShip(n.getLength,n.getOrigin,n.getRotated),!1}return!1}},{key:"moveShip",value:function(t,n){var e=this.removeShip(t);if(e)try{return this.placeShip(e.getLength,n,e.getRotated),!0}catch(r){return this.placeShip(e.getLength,t,e.getRotated),!1}return!1}},{key:"receiveAttack",value:function(t){var n=this.getBoardStates;if(![].concat(Object(B.a)(n.shipNotHit),Object(B.a)(n.notShot)).some((function(n){return n[0]===t[0]&&n[1]===t[1]})))return!1;if(n.notShot.find((function(n){return n[0]===t[0]&&n[1]===t[1]})))return this.tiles[t[0]][t[1]]=!0,!0;if(n.shipNotHit.find((function(n){return n[0]===t[0]&&n[1]===t[1]}))){var e=this.tiles[t[0]][t[1]];return e.hit(e.getOrigin[0]-t[0]+(e.getOrigin[1]-t[1])),this.markAroundSunk(e),!0}return!1}},{key:"allSunk",value:function(){return this.ships.every((function(t){return t.isSunk()}))}},{key:"distributeShips",value:function(t){var n=this,e=[];return t.sort((function(t,n){return n-t})).forEach((function(t){var r=!1,i=[],o=[Math.floor(Math.random()*n.size),Math.floor(Math.random()*n.size)],a=Math.random()<.5;do{try{do{o=[Math.floor(Math.random()*n.size),Math.floor(Math.random()*n.size)],a=Math.random()<.5}while(i.find((function(t){return t[0][0]===o[0]&&t[0][1]===o[1]&&t[1]===a})));n.placeShip(t,o,a),r=!0}catch(s){i.push([o,a]),r=!1}}while(!r&&i.length<n.size*n.size);e.push(r)})),e.every((function(t){return t}))}},{key:"markAroundSunk",value:function(t){var n=this;if(t.isSunk()){var e=t.getOrigin,r=Array.from({length:t.getLength},(function(n,e){return t.getRotated?[e,0]:[0,e]})),i=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];r.forEach((function(t){i.forEach((function(r){e[0]-t[0]+r[0]<0||e[0]-t[0]+r[0]>n.size-1||e[1]-t[1]+r[1]<0||e[1]-t[1]+r[1]>n.size-1||n.tiles[e[0]-t[0]+r[0]][e[1]-t[1]+r[1]]||(n.tiles[e[0]-t[0]+r[0]][e[1]-t[1]+r[1]]=!0)}))}))}}}]),t}(),M=e(3),T=e(2),N=T.d.div(r||(r=Object(M.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  \n  .board-wrapper {\n    opacity: .4;\n    counter-reset: row column;\n    font-size: 1rem;\n    font-weight: 700;\n\n    .board-row {\n      counter-increment: row;\n      \n      &:last-child {\n        .board-element {\n          counter-increment: column;\n\n          &::after {\n            content: counter(column, upper-latin);\n          }\n        }\n      }\n      \n      &::before {\n        content: counter(row);\n      }\n      \n      .board-element {\n        .board-tile {\n          position: relative;\n          width: calc(1.4rem + 1vw);\n          height: calc(1.4rem + 1vw);\n          background-color: ",";\n          border: 2px solid ",";\n          border-radius: 2px;\n        }\n        \n        .ship-not-hit {\n          background-color: ",";\n          cursor: pointer;\n        }\n        \n        .ship-hit {\n          background-color: #c86b85;\n\n          &::after {\n            content: '\\f00d';\n            position: absolute;\n            font-family: 'Font Awesome 5 Free', sans-serif;\n            font-weight: 1000;\n            font-size: 15px;\n            left: 50%;\n            top: 50%;\n            transform: translate(-50%, -50%);\n          }\n        }\n\n        .ship-sunk {\n          background-color: #bbbbbb;\n\n          &::after {\n            content: '\\f00d';\n            position: absolute;\n            font-family: 'Font Awesome 5 Free', sans-serif;\n            font-weight: 1000;\n            font-size: 15px;\n            left: 50%;\n            top: 50%;\n            transform: translate(-50%, -50%);\n          }\n        }\n\n        .missed {\n          background-color: #bce6eb;\n\n          &::after {\n            content: '\\f111';\n            position: absolute;\n            font-family: 'Font Awesome 5 Free', sans-serif;\n            font-weight: 1000;\n            font-size: 7px;\n            left: 50%;\n            top: 50%;\n            transform: translate(-50%, -50%);\n          }\n        }\n\n        .marked {\n          background-color: ",";\n        }\n\n        .marked-origin {\n          background-color: ",";\n\n          &::after {\n            content: '\\f0e2';\n            position: absolute;\n            font-family: 'Font Awesome 5 Free', sans-serif;\n            font-weight: 1000;\n            font-size: 13px;\n            left: 50%;\n            top: 50%;\n            transform: translate(-50%, -50%);\n          }\n        }\n\n        .valid {\n          background-color: ",";\n        }\n\n        .valid-origin {\n          background-color: ",";\n        }\n\n        .invalid {\n          background-color: ",";\n        }\n\n        .invalid-origin {\n          background-color: ",";\n        }\n      }\n    }\n  }\n\n  .active {\n    opacity: .8;\n\n    .board-row {\n\n      .board-element {\n\n        .board-tile {\n\n          &:hover {\n            border: 2px solid #878891;\n            cursor: pointer;\n          }\n        }\n      }\n    }\n  }\n"],["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  \n  .board-wrapper {\n    opacity: .4;\n    counter-reset: row column;\n    font-size: 1rem;\n    font-weight: 700;\n\n    .board-row {\n      counter-increment: row;\n      \n      &:last-child {\n        .board-element {\n          counter-increment: column;\n\n          &::after {\n            content: counter(column, upper-latin);\n          }\n        }\n      }\n      \n      &::before {\n        content: counter(row);\n      }\n      \n      .board-element {\n        .board-tile {\n          position: relative;\n          width: calc(1.4rem + 1vw);\n          height: calc(1.4rem + 1vw);\n          background-color: ",";\n          border: 2px solid ",";\n          border-radius: 2px;\n        }\n        \n        .ship-not-hit {\n          background-color: ",";\n          cursor: pointer;\n        }\n        \n        .ship-hit {\n          background-color: #c86b85;\n\n          &::after {\n            content: '\\\\f00d';\n            position: absolute;\n            font-family: 'Font Awesome 5 Free', sans-serif;\n            font-weight: 1000;\n            font-size: 15px;\n            left: 50%;\n            top: 50%;\n            transform: translate(-50%, -50%);\n          }\n        }\n\n        .ship-sunk {\n          background-color: #bbbbbb;\n\n          &::after {\n            content: '\\\\f00d';\n            position: absolute;\n            font-family: 'Font Awesome 5 Free', sans-serif;\n            font-weight: 1000;\n            font-size: 15px;\n            left: 50%;\n            top: 50%;\n            transform: translate(-50%, -50%);\n          }\n        }\n\n        .missed {\n          background-color: #bce6eb;\n\n          &::after {\n            content: '\\\\f111';\n            position: absolute;\n            font-family: 'Font Awesome 5 Free', sans-serif;\n            font-weight: 1000;\n            font-size: 7px;\n            left: 50%;\n            top: 50%;\n            transform: translate(-50%, -50%);\n          }\n        }\n\n        .marked {\n          background-color: ",";\n        }\n\n        .marked-origin {\n          background-color: ",";\n\n          &::after {\n            content: '\\\\f0e2';\n            position: absolute;\n            font-family: 'Font Awesome 5 Free', sans-serif;\n            font-weight: 1000;\n            font-size: 13px;\n            left: 50%;\n            top: 50%;\n            transform: translate(-50%, -50%);\n          }\n        }\n\n        .valid {\n          background-color: ",";\n        }\n\n        .valid-origin {\n          background-color: ",";\n        }\n\n        .invalid {\n          background-color: ",";\n        }\n\n        .invalid-origin {\n          background-color: ",";\n        }\n      }\n    }\n  }\n\n  .active {\n    opacity: .8;\n\n    .board-row {\n\n      .board-element {\n\n        .board-tile {\n\n          &:hover {\n            border: 2px solid #878891;\n            cursor: pointer;\n          }\n        }\n      }\n    }\n  }\n"])),(function(t){return t.theme.colors.gridBackground}),(function(t){return t.theme.colors.tile_border}),(function(t){return t.theme.colors.ship}),(function(t){return t.theme.colors.marked}),(function(t){return t.theme.colors.marked}),(function(t){return t.theme.colors.valid}),(function(t){return t.theme.colors.valid}),(function(t){return t.theme.colors.invalid}),(function(t){return t.theme.colors.invalid})),R=T.d.h4(i||(i=Object(M.a)(["\n  margin-top: .6rem;\n  font-weight: 500;\n  font-size: 1.3rem;\n"]))),F=e(1),I=function(t){var n=t.player,e=t.game,r=t.state,i=t.loop,o=t.rotate,a=t.move,s=t.turn,c=t.init,l=t.reset,u=Object(v.useState)(""),d=Object(z.a)(u,2),h=d[0],f=d[1],g=Object(v.useState)(null),p=Object(z.a)(g,2),b=p[0],m=p[1],y=Object(v.useCallback)((function(){if(document.querySelectorAll('.board-tile[data-player="'.concat(n,'"]')).forEach((function(t){t.classList.remove("ship-not-hit"),t.classList.remove("ship-hit"),t.classList.remove("ship-sunk"),t.classList.remove("missed"),t.classList.remove("marked-origin"),t.classList.remove("marked")})),0===n&&r.shipNotHit.forEach((function(t){var e=document.querySelector('.board-tile[data-x="'.concat(t[0],'"][data-y="').concat(t[1],'"][data-player="').concat(n,'"]'));null===e||void 0===e||e.classList.add("ship-not-hit")})),r.shipHit.forEach((function(t){var r=document.querySelector('.board-tile[data-x="'.concat(t[0],'"][data-y="').concat(t[1],'"][data-player="').concat(n,'"]'));e.getPlayer(n).getBoard.getTiles[t[0]][t[1]]&&(e.getPlayer(n).getBoard.getTiles[t[0]][t[1]].isSunk()?null===r||void 0===r||r.classList.add("ship-sunk"):null===r||void 0===r||r.classList.add("ship-hit"))})),r.missed.forEach((function(t){var e=document.querySelector('.board-tile[data-x="'.concat(t[0],'"][data-y="').concat(t[1],'"][data-player="').concat(n,'"]'));null===e||void 0===e||e.classList.add("missed")})),b&&!e.getInit){var t=b.getOrigin,i=Array.from({length:b.getLength-1},(function(t,n){return b.getRotated?[n+1,0]:[0,n+1]})),o=document.querySelector('.board-tile[data-x="'.concat(t[0],'"][data-y="').concat(t[1],'"][data-player="').concat(n,'"]'));null===o||void 0===o||o.classList.add("marked-origin"),i.forEach((function(e){var r=document.querySelector('.board-tile[data-x="'.concat(t[0]-e[0],'"][data-y="').concat(t[1]-e[1],'"][data-player="').concat(n,'"]'));null===r||void 0===r||r.classList.add("marked")}))}}),[e,b,n,r.missed,r.shipHit,r.shipNotHit]),j=function(t){var r=t.target,c=parseInt(r.getAttribute("data-x"),10),l=parseInt(r.getAttribute("data-y"),10);if(n===1-s&&1===n&&e.getInit)i([c,l]);else if(0===n&&!e.getInit)if(b){if(b){var u=b.getOrigin;u[0]===c&&u[1]===l?(o([c,l]),O(),m(null)):(a([u[0],u[1]],[c,l]),O(),m(null))}}else{var d=e.getPlayer(0).getBoard.getTiles[c][l];"boolean"!==typeof d&&m(d)}},k=function(t){if(b){var n,r=t.target,i=parseInt(r.getAttribute("data-x"),10),o=parseInt(r.getAttribute("data-y"),10),a=b.getOrigin;n=i===a[0]&&o===a[1]?Array.from({length:b.getLength},(function(t,n){return b.getRotated?[0,n]:[n,0]})):Array.from({length:b.getLength},(function(t,n){return b.getRotated?[n,0]:[0,n]}));var s=new E(e.getPlayer(0).getBoard.getSize);e.getPlayer(0).getBoard.getShips.forEach((function(t){t.getOrigin[0]===a[0]&&t.getOrigin[1]===a[1]||s.placeShip(t.getLength,t.getOrigin,t.getRotated)}));var c=s.getValidTiles;if(n.every((function(t){return c.find((function(n){return i-t[0]===n[0]&&o-t[1]===n[1]}))}))){var l=document.querySelector('.board-tile[data-x="'.concat(i,'"][data-y="').concat(o,'"][data-player="',0,'"]'));null===l||void 0===l||l.classList.add("valid-origin"),n.forEach((function(t){if(0!==t[0]||0!==t[1]){var n=document.querySelector('.board-tile[data-x="'.concat(i-t[0],'"][data-y="').concat(o-t[1],'"][data-player="',0,'"]'));null===n||void 0===n||n.classList.add("valid")}}))}else{var u=document.querySelector('.board-tile[data-x="'.concat(i,'"][data-y="').concat(o,'"][data-player="',0,'"]'));null===u||void 0===u||u.classList.add("invalid-origin"),n.forEach((function(t){if(0!==t[0]||0!==t[1]){var n=document.querySelector('.board-tile[data-x="'.concat(i-t[0],'"][data-y="').concat(o-t[1],'"][data-player="',0,'"]'));null===n||void 0===n||n.classList.add("invalid")}}))}}},O=function(){document.querySelectorAll('.board-tile[data-player="'.concat(0,'"]')).forEach((function(t){t.classList.remove("valid-origin"),t.classList.remove("valid"),t.classList.remove("invalid-origin"),t.classList.remove("invalid")}))};return Object(v.useEffect)((function(){e.getInit?f(s===1-n?"active":""):f("active"),y()}),[s,c,e,n,y]),Object(v.useEffect)((function(){l&&y()}),[l,y]),Object(v.useEffect)((function(){y()})),Object(F.jsxs)(N,{children:[Object(F.jsx)("table",{className:"board-wrapper ".concat(h),children:Object(F.jsx)("tbody",{children:e.getPlayer(n).getBoard.getTiles.map((function(t,e){return Object(F.jsx)("tr",{className:"board-row",children:t.map((function(t,r){return Object(F.jsx)("td",{className:"board-element",children:Object(F.jsx)("div",{"data-x":"".concat(e),"data-y":"".concat(r),"data-player":n,className:"board-tile",onClick:j,onMouseMove:k,onMouseLeave:O},"(".concat(e,", ").concat(r,")"))},r)}))},e)}))})}),Object(F.jsx)(R,{children:"".concat(e.getPlayer(n).getName," board")})]})},H=T.d.div(o||(o=Object(M.a)(["\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  gap: .7rem;\n  top: 1rem;\n  ",";\n  ",";\n  \n  @media (max-width: 1100px) {\n    display: none;\n  }\n  @media (max-width: 920px) {\n    display: flex;\n  }\n  @media (max-width: 550px) {\n    display: none;\n  }\n"])),(function(t){return"player"===t.player&&Object(T.c)(a||(a=Object(M.a)(["\n    align-items: flex-end;\n    right: 95%;\n  "])))}),(function(t){return"computer"===t.player&&Object(T.c)(s||(s=Object(M.a)(["\n    left: 95%;\n  "])))})),W=T.d.div(c||(c=Object(M.a)(["\n  display: flex;\n  gap: .3rem;\n"]))),q=T.d.div(l||(l=Object(M.a)(["\n  width: .7rem;\n  height: .7rem;\n  background-color: ",";\n"])),(function(t){return t.sunk?function(t){return t.theme.colors.shipSunk}:function(t){return t.theme.colors.ship}})),C=function(t){var n=t.player,e=t.ships;return Object(F.jsx)(H,{player:n,children:e.sort((function(t,n){return t.getLength-n.getLength})).map((function(t,n){return Object(F.jsx)(W,{children:t.getParts.map((function(n,e){return t.isSunk()?Object(F.jsx)(q,{sunk:!0},e):Object(F.jsx)(q,{sunk:!1},e)}))},n)}))})},G=T.d.div(u||(u=Object(M.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  gap: 4vh;\n"]))),V=T.d.div(d||(d=Object(M.a)(["\n  display: flex;\n  padding: 0 6vh 0 6vh;\n  gap: 0.5vh;\n  position: relative;\n"]))),J=function(t){var n=t.game,e=t.updateTurn,r=t.turn,i=t.init,o=t.reset,a=Object(v.useState)(n.getPlayer(0).getBoard.getBoardStates),s=Object(z.a)(a,2),c=s[0],l=s[1],u=Object(v.useState)(n.getPlayer(1).getBoard.getBoardStates),d=Object(z.a)(u,2),h=d[0],f=d[1],g=Object(v.useState)(n.getPlayer(0).getBoard.getShips),p=Object(z.a)(g,2),b=p[0],m=p[1],y=Object(v.useState)(n.getPlayer(1).getBoard.getShips),j=Object(z.a)(y,2),k=j[0],O=j[1],x=function(){l(n.getPlayer(0).getBoard.getBoardStates)},B=function(){var t=Object(w.a)(S.a.mark((function t(r){var i;return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(i=function(t,n){return new Promise((function(e){return setTimeout(e,Math.floor(Math.random()*(n-t))+t)}))},-1!==n.getWinner){t.next=20;break}if(!n.playerTurn([r[0],r[1]])){t.next=20;break}if(n.setWinner=n.isWinner(),f(n.getPlayer(1).getBoard.getBoardStates),O(n.getPlayer(1).getBoard.getShips),e(),n.next(),-1!==n.getWinner){t.next=20;break}return e(),t.next=13,i(500,2e3);case 13:n.computerTurn(),n.setWinner=n.isWinner(),e(),n.next(),e(),x(),m(n.getPlayer(0).getBoard.getShips);case 20:case"end":return t.stop()}}),t)})));return function(n){return t.apply(this,arguments)}}(),P=function(t){n.getPlayer(0).getBoard.rotateShip(t),x()},L=function(t,e){n.getPlayer(0).getBoard.moveShip(t,e),x()};return Object(v.useEffect)((function(){o&&(l(n.getPlayer(0).getBoard.getBoardStates),f(n.getPlayer(1).getBoard.getBoardStates),m(n.getPlayer(0).getBoard.getShips),O(n.getPlayer(1).getBoard.getShips))}),[o,n]),Object(F.jsxs)(G,{children:[Object(F.jsxs)(V,{children:[Object(F.jsx)(C,{player:"player",ships:b}),Object(F.jsx)(I,{player:0,game:n,state:c,loop:B,rotate:P,move:L,turn:r,init:i,reset:o})]}),Object(F.jsxs)(V,{children:[Object(F.jsx)(I,{player:1,game:n,state:h,loop:B,rotate:P,move:L,turn:r,init:i,reset:o}),Object(F.jsx)(C,{player:"computer",ships:k})]})]})},_=function(){function t(n,e){Object(P.a)(this,t),this.board=void 0,this.name=void 0,this.board=n,this.name=e}return Object(L.a)(t,[{key:"getBoard",get:function(){return this.board}},{key:"getName",get:function(){return this.name}},{key:"chooseAttack",value:function(t){var n=t.getBoardStates,e=[];if(n.shipHit.length>0){var r=n.shipHit.filter((function(n){return!t.getTiles[n[0]][n[1]].isSunk()}));if(r.length>0){var i=[[-1,0],[0,-1],[0,1],[1,0]];if(r.forEach((function(r){t.getTiles[r[0]][r[1]].getParts.filter((function(t){return t})).length>1&&(i=t.getTiles[r[0]][r[1]].getRotated?[[-1,0],[1,0]]:[[0,-1],[0,1]]),i.forEach((function(i){r[0]+i[0]<0||r[0]+i[0]>t.getSize-1||r[1]+i[1]<0||r[1]+i[1]>t.getSize-1||n.shipHit.find((function(t){return t[0]===r[0]+i[0]&&t[1]===r[1]+i[1]}))||n.missed.find((function(t){return t[0]===r[0]+i[0]&&t[1]===r[1]+i[1]}))||e.push([r[0]+i[0],r[1]+i[1]])}))})),e.length>0)return e[Math.floor(Math.random()*e.length)]}}return(e=[].concat(Object(B.a)(n.shipNotHit),Object(B.a)(n.notShot)))[Math.floor(Math.random()*e.length)]}}]),t}(),D=function(){function t(n,e){Object(P.a)(this,t),this.shipSizes=void 0,this.players=void 0,this.currentPlayer=void 0,this.initialized=void 0,this.winner=void 0,this.shipSizes=n,this.players=[new _(new E(e),"Player"),new _(new E(e),"Computer")],this.currentPlayer=0,this.initialized=!1,this.winner=-1,this.players[0].getBoard.distributeShips(this.shipSizes),this.players[1].getBoard.distributeShips(this.shipSizes)}return Object(L.a)(t,[{key:"init",value:function(){this.players[0].getBoard.getShips.length!==this.shipSizes.length||this.initialized||(this.initialized=!0)}},{key:"getCurrentPlayer",get:function(){return this.players[this.currentPlayer]}},{key:"getOpponent",get:function(){return this.players[1-this.currentPlayer]}},{key:"getTurn",get:function(){return this.currentPlayer}},{key:"getWinner",get:function(){return this.winner}},{key:"setWinner",set:function(t){this.winner=t}},{key:"getInit",get:function(){return this.initialized}},{key:"getShips",get:function(){return this.shipSizes}},{key:"getPlayer",value:function(t){return this.players[t]}},{key:"next",value:function(){this.currentPlayer=1-this.currentPlayer}},{key:"playerTurn",value:function(t){return this.getOpponent.getBoard.receiveAttack(t)}},{key:"computerTurn",value:function(){var t,n=!1;do{t=this.getCurrentPlayer.chooseAttack(this.getOpponent.getBoard),n=this.getOpponent.getBoard.receiveAttack(t)}while(!n)}},{key:"isWinner",value:function(){return this.getOpponent.getBoard.allSunk()?this.currentPlayer:-1}}]),t}(),K=T.d.div(h||(h=Object(M.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-top: 1rem;\n"]))),Q=T.d.div(f||(f=Object(M.a)(["\n  display: flex;\n  font-size: 3rem;\n  align-items: center;\n  border-bottom: 4px solid ",";\n  color: ",";\n\n"])),(function(t){return t.theme.colors.displayBorder}),(function(t){return t.theme.colors.displayBorder})),U=T.d.h1(g||(g=Object(M.a)(["\n  text-align: center;\n  padding: .5rem;\n  font-size: 3rem;\n"]))),X=T.d.div(p||(p=Object(M.a)(["\n  display: flex;\n  padding: 2rem;\n  justify-content: center;\n  align-items: center;\n"]))),Y=T.d.div(b||(b=Object(M.a)(["\n  padding: .7rem;\n  display: flex;\n  border: 2px solid ",";\n  border-radius: 0.2rem;\n  background-color: ",";\n  \n  h2 {\n    font-size: 1.5rem;\n    font-weight: 500;\n  }\n"])),(function(t){return t.theme.colors.displayBorder}),(function(t){return t.theme.colors.displayBackground})),Z=T.d.div(m||(m=Object(M.a)(['\n  display: flex;\n  justify-content: center;\n  margin: 1rem;\n\n  .startGame {\n    cursor: pointer;\n    font-family: "Montserrat", sans-serif;\n    padding: .7rem 1.4rem;\n    border: 2px solid ',";\n    border-radius: 5px;\n    font-size: 1rem;\n    font-weight: 600;\n  }\n  \n  .disabled {\n    border: 2px solid gray;\n    color: gray;\n  }\n"])),(function(t){return t.theme.colors.displayBorder})),$=e(32),tt=function(){var t=[5,4,3,3,2],n=Object(v.useState)(new D(t,10)),e=Object(z.a)(n,2),r=e[0],i=e[1],o=Object(v.useState)("Move/Rotate ships"),a=Object(z.a)(o,2),s=a[0],c=a[1],l=Object(v.useState)(r.getTurn),u=Object(z.a)(l,2),d=u[0],h=u[1],f=Object(v.useState)(r.getInit),g=Object(z.a)(f,2),p=g[0],b=g[1],m=Object(v.useState)(!1),y=Object(z.a)(m,2),j=y[0],k=y[1],O=function(){r.getInit?-1!==r.getWinner?c("".concat(r.getPlayer(r.getWinner).getName," won!")):r.getInit&&c("".concat(r.getCurrentPlayer.getName," turn")):c("Move/Rotate ships")},x=function(){var n=Object(w.a)(S.a.mark((function n(){return S.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:i(new D(t,10)),k(!0),c("Move/Rotate ships"),b(!1);case 4:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return Object(F.jsxs)("div",{className:"app",children:[Object(F.jsx)(K,{children:Object(F.jsxs)(Q,{children:[Object(F.jsx)($.a,{}),Object(F.jsx)(U,{children:"Battleship"}),Object(F.jsx)($.a,{})]})}),Object(F.jsx)(X,{children:Object(F.jsx)(Y,{children:Object(F.jsx)("h2",{className:"display",children:s})})}),Object(F.jsx)(J,{game:r,updateTurn:function(){h(r.getTurn),O()},turn:d,init:p,reset:j}),Object(F.jsx)(Z,{children:p?0===r.getTurn||-1!=r.getWinner?Object(F.jsx)("button",{className:"startGame",type:"button",onClick:x,children:"Restart Game"}):Object(F.jsx)("button",{className:"startGame disabled",type:"button",children:"Restart Game"}):Object(F.jsx)("button",{className:"startGame",type:"button",onClick:function(){r.init(),O(),b(r.getInit),k(!1)},children:"Start Game"})})]})},nt={colors:{ship:"#787878",shipSunk:"#bbbbbb",tile_border:"#393b44",marked:"#adadad",valid:"#8db596",invalid:"#9f5f80",displayBackground:"#f4f4f4",background:"#eeeeee",gridBackground:"#abd5eb",displayBorder:"#333333"}},et=Object(T.b)(y||(y=Object(M.a)(["\n  *, *:before, *:after {\n      box-sizing: border-box;\n      padding: 0;\n      margin: 0;\n      word-wrap: break-word;\n    }\n    \n    html {\n      line-height: 1.6;\n      position: relative;\n      min-height: 100%;\n    }\n    \n    body {\n      font-family: 'Montserrat', sans-serif;\n      background-color: ",";\n      -webkit-font-smoothing: antialiased;\n      -moz-osx-font-smoothing: grayscale;\n    } \n    \n    h1, h2, h3, h4, h5, h6 {\n      line-height: 1.2;\n    }\n    \n    a {\n      text-decoration: none;\n    }\n    \n    img {\n      display: block;\n      width: 100%;\n    }\n    \n    button {\n      cursor: pointer;\n    }\n"])),(function(t){return t.theme.colors.background}));O.a.render(Object(F.jsx)(j.a.StrictMode,{children:Object(F.jsxs)(T.a,{theme:nt,children:[Object(F.jsx)(et,{}),Object(F.jsx)(tt,{})]})}),document.getElementById("root"))}},[[30,1,2]]]);
//# sourceMappingURL=main.5c1886bc.chunk.js.map