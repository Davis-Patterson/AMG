"use strict";(self.webpackChunkamg=self.webpackChunkamg||[]).push([[972],{4972:(e,n,t)=>{t.r(n),t.d(n,{default:()=>N});var a=t(6540),i=t(3279),r=t(7767),l=t(817),s=t(255),o=(t(4295),t(3357)),c=t(5072),d=t.n(c),m=t(7825),h=t.n(m),p=t(7659),x=t.n(p),w=t(5056),g=t.n(w),u=t(540),f=t.n(u),v=t(1113),b=t.n(v),E=t(5451),k={};k.styleTagTransform=b(),k.setAttributes=g(),k.insert=x().bind(null,"head"),k.domAPI=h(),k.insertStyleElement=f(),d()(E.A,k),E.A&&E.A.locals&&E.A.locals;const N=function(){var e=(0,a.useContext)(i.B),n=(e.darkMode,e.newsData),t=e.setShowSplash,c=e.formatTitleForURL,d=(0,r.Zp)();(0,a.useEffect)((function(){window.scrollTo(0,0)}),[]);var m=function(e){t(!0),setTimeout((function(){d(e)}),200)};return n&&0!==n.length?a.createElement(a.Fragment,null,a.createElement("main",{className:"page-container",id:"page-container"},a.createElement("header",{className:"news-header",id:"about-header"},a.createElement("div",{className:"news-header-gradient-overlay"}),a.createElement("div",{className:"news-header-gradient-overlay"}),a.createElement("section",{className:"news-header-text-container"},a.createElement("div",{className:"news-title-container"},a.createElement("h1",{className:"news-title"},"NEWS"),a.createElement("p",{className:"news-tagline"},"Shaping culture through the power of articlery."))),a.createElement("section",{className:"news-header-pics-container"},a.createElement("img",{src:l,alt:"news header img",className:"news-header-pics"}))),a.createElement("div",{className:"news-content-container"},a.createElement("div",{className:"filter-controls-container"}),a.createElement("div",{className:"news-content"},n.map((function(e){return a.createElement("div",{key:e.id,className:"news-article"},a.createElement("img",{src:e.image,alt:e.title,className:"news-article-image"}),a.createElement("div",{className:"news-article-text"},a.createElement("div",{onClick:function(){return m("/news/".concat(c(e.title)))},className:"news-article-title"},e.title),a.createElement("p",{className:"news-article-desc"},e.desc),a.createElement("p",{className:"news-article-author"},"By ",e.author," on ",e.date),a.createElement("div",{onClick:function(){return m("/news/".concat(c(e.title)))},className:"read-more-button"},"Read More")))})))),a.createElement("div",{className:"gap"}))):a.createElement(a.Fragment,null,a.createElement("main",{className:"page-container",id:"page-container"},a.createElement("header",{className:"news-header",id:"about-header"},a.createElement("div",{className:"news-header-gradient-overlay"}),a.createElement("div",{className:"news-header-gradient-overlay"}),a.createElement("section",{className:"news-header-text-container"},a.createElement("div",{className:"news-title-container"},a.createElement("h1",{className:"news-title"},"NEWS"),a.createElement("p",{className:"news-tagline"},"Shaping culture through the power of artistry."))),a.createElement("section",{className:"news-header-pics-container"},a.createElement("img",{src:l,alt:"current studio pic",className:"news-header-pics"}))),a.createElement("section",{className:"loading-content-container"},a.createElement("div",{className:"loading-content"},a.createElement("div",{className:"skeleton-article-cards"},Array(4).fill().map((function(e,n){return a.createElement("div",{key:n,className:"skeleton-article-card"},a.createElement("div",{className:"skeleton-article-image"},a.createElement(s.A,{height:150,width:150}),a.createElement("div",{className:"circular-progress-container"},a.createElement(o.A,{size:40,sx:{color:"var(--clr-divider)"}}))),a.createElement("div",{className:"skeleton-article-content"},a.createElement("div",{className:"skeleton-shadow-container"},a.createElement(s.A,{width:300,height:15,style:{marginBottom:0}})),a.createElement("div",{className:"skeleton-shadow-container"},a.createElement(s.A,{width:300,height:15,style:{marginBottom:0}})),a.createElement("div",{className:"skeleton-shadow-container"},a.createElement(s.A,{width:300,height:15,style:{marginBottom:0}})),a.createElement("div",{className:"skeleton-button-shadow-container"},a.createElement(s.A,{width:100,height:30,style:{marginTop:10}}))))}))))),a.createElement("div",{className:"gap"})))}},5451:(e,n,t)=>{t.d(n,{A:()=>s});var a=t(1601),i=t.n(a),r=t(6314),l=t.n(r)()(i());l.push([e.id,".news-header {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  min-height: 400px;\n  position: relative;\n}\n\n.news-header-gradient-overlay {\n  position: absolute;\n  left: 0;\n  width: 70%;\n  height: 100%;\n  background: linear-gradient(\n    to right,\n    var(--clr-gradient-end) 0%,\n    var(--clr-gradient-start) 90%,\n    var(--clr-gradient-start) 100%\n  );\n  z-index: 5;\n}\n\n.news-header-text-container {\n  display: flex;\n  justify-content: center;\n  align-items: baseline;\n  flex-direction: column;\n  width: 50%;\n  height: 100%;\n  min-height: 400px;\n  position: absolute;\n  left: 0;\n  z-index: 10;\n}\n\n.news-header-logo {\n  width: 300px;\n}\n\n.news-title-container {\n  display: flex;\n  justify-content: center;\n  align-items: normal;\n  flex-direction: column;\n  text-align: left;\n}\n\n.news-title {\n  font-family: 'Arial', sans-serif;\n  font-size: 4.2em;\n  line-height: 0.8;\n  color: var(--clr-dark);\n  margin: 0px 0px 0px 50px;\n  font-weight: 900;\n  padding: 0px 0px 0px 0px;\n  text-align: left;\n}\n\n.news-tagline {\n  font-family: 'Titillium Web', sans-serif;\n  font-size: 1.4em;\n  font-weight: 500;\n  line-height: 0.9;\n  color: var(--clr-dark);\n  margin: 15px 0px 0px 50px;\n  text-align: left;\n  width: 65%;\n}\n\n.news-header-pics-container {\n  width: 100%;\n  height: 450px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  overflow: hidden;\n  position: relative;\n}\n\n.news-header-pics {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  position: absolute;\n  top: 0;\n  left: 0;\n  transition: transform 1.5s ease-in-out;\n}\n\n.news-content-container {\n  width: 80%;\n  margin: 60px 20px 20px 20px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.news-content {\n  width: 90%;\n}\n\n.news-article {\n  display: flex;\n  margin-bottom: 20px;\n  border-bottom: 1px solid var(--clr-news-break);\n  padding-bottom: 20px;\n}\n\n.news-article-image {\n  width: 200px;\n  height: 200px;\n  object-fit: cover;\n  margin-right: 20px;\n}\n\n.news-article-text {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin: 0px 0px 20px 0px;\n}\n\n.news-article-title {\n  font-family: 'Titillium Web', sans-serif;\n  font-size: 1.6em;\n  font-weight: 900;\n  color: var(--clr-news-title);\n  margin: 0px 0px 5px 0px;\n  cursor: pointer;\n}\n.news-article-title:hover {\n  color: var(--clr-news-title-dark);\n}\n\n.news-article-desc {\n  font-size: 1em;\n  color: var(--clr-dark);\n  margin: 10px 0px 5px 0px;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.news-article-author {\n  font-size: 0.9em;\n  color: var(--clr-text);\n  margin: 5px 0px 10px 0px;\n}\n\n.read-more-button {\n  background-color: var(--clr-news-title);\n  color: var(--clr-light);\n  border: none;\n  padding: 10px 15px;\n  cursor: pointer;\n  text-transform: uppercase;\n  font-weight: bold;\n  margin: 5px 0px 0px 0px;\n  width: 150px;\n  text-align: center;\n}\n\n.read-more-button:hover {\n  background-color: var(--clr-news-title-dark);\n}\n\n.skeleton-article-cards {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin: 0;\n}\n\n.skeleton-article-card {\n  display: flex;\n  flex-direction: row;\n  align-items: flex-start;\n  background-color: var(--clr-light);\n  border: 1px solid var(--clr-light);\n  overflow: visible;\n  width: 100%;\n  max-width: 800px;\n  margin: 10px;\n  padding: 20px;\n  cursor: pointer;\n}\n\n.skeleton-article-image {\n  width: 150px;\n  height: 150px;\n  position: relative;\n  border-radius: 8px;\n  background-color: var(--clr-light);\n  overflow: hidden;\n  margin-right: 20px;\n}\n.skeleton-article-card:hover .skeleton-article-image {\n  box-shadow: 0 4px 8px var(--clr-shadow1);\n  transition: box-shadow 0.15s ease-in-out;\n}\n\n.skeleton-article-content {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  width: 300px;\n}\n\n.skeleton-shadow-container {\n  width: 300px;\n  height: auto;\n  margin-bottom: 10px;\n}\n\n.skeleton-shadow-container:last-child {\n  margin-bottom: 0;\n}\n.skeleton-article-card:hover .skeleton-shadow-container {\n  box-shadow: 0 4px 8px var(--clr-shadow1);\n  transition: box-shadow 0.15s ease-in-out;\n}\n\n.skeleton-shadow-container > span {\n  width: 300px;\n  height: 15px;\n  display: block;\n  overflow: visible;\n  border-radius: 15px;\n}\n\n.skeleton-button-shadow-container {\n  width: 100px;\n  height: auto;\n  margin-bottom: 10px;\n}\n\n.skeleton-button-shadow-container:last-child {\n  margin-bottom: 0;\n}\n.skeleton-article-card:hover .skeleton-button-shadow-container {\n  box-shadow: 0 4px 8px var(--clr-shadow1);\n  transition: box-shadow 0.15s ease-in-out;\n}\n\n.skeleton-button-shadow-container > span {\n  width: 100px;\n  height: 30px;\n  display: block;\n  overflow: visible;\n  border-radius: 15px;\n}\n\n.circular-progress-container {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n",""]);const s=l},817:(e,n,t)=>{e.exports=t.p+"99db2953301eb37a207c.jpg"}}]);