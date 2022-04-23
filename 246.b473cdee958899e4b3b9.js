"use strict";(self.webpackChunkcomplete_frontend_project_somehelp=self.webpackChunkcomplete_frontend_project_somehelp||[]).push([[246],{2246:(P,p,s)=>{s.r(p),s.d(p,{AuthModule:()=>J});var l=s(8583),c=s(9320),e=s(639),r=s(3679),g=s(1817),v=s(2340),m=s(1841);let d=(()=>{class t{constructor(n){this.http=n}authentificate(n){return this.http.post(`${v.N.rotanApiHost}/api/user/login`,n)}}return t.\u0275fac=function(n){return new(n||t)(e.LFG(m.eN))},t.\u0275prov=e.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var h=s(8645),x=s(3013),u=s(3928),f=s(4207);function y(t,i){1&t&&(e.TgZ(0,"div"),e._uU(1," E-Mail is required. "),e.qZA())}function M(t,i){1&t&&(e.TgZ(0,"div"),e._uU(1," E-Mail is not valid. "),e.qZA())}function _(t,i){if(1&t&&(e.TgZ(0,"div",11),e.YNc(1,y,2,0,"div",12),e.YNc(2,M,2,0,"div",12),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.email.errors.required),e.xp6(1),e.Q6J("ngIf",n.email.errors.email)}}function C(t,i){1&t&&(e.TgZ(0,"div"),e._uU(1," Passwort is required. "),e.qZA())}function I(t,i){if(1&t&&(e.TgZ(0,"div",11),e.YNc(1,C,2,0,"div",12),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.Q6J("ngIf",n.password.errors.required)}}let T=(()=>{class t{constructor(n,o,a,O,j){this.formBuilder=n,this.apiAuthService=o,this.store=a,this.router=O,this.messageService=j}ngOnInit(){this.initForm()}tryLogin(){this.checkValidity()?this.apiAuthService.authentificate(this.loginForm.value).subscribe(n=>{this.store.dispatch(new g.u(n.user)),this.store.dispatch(new g.D(n.userToken)),this.messageService.add({severity:"success",summary:"Success",detail:"Your access data is valid."}),this.router.navigate(["admin"])},n=>{this.messageService.add({severity:"error",summary:"Error",detail:n.error})}):this.markAsTouched(this.loginForm)}initForm(){this.loginForm=this.formBuilder.group({email:[null,[r.kI.required,r.kI.email]],password:[null,r.kI.required]})}get email(){return this.loginForm.get("email")}get password(){return this.loginForm.get("password")}checkValidity(){return this.loginForm.invalid&&this.markAsTouched(this.loginForm),this.loginForm.valid}markAsTouched(n){Object.keys(n.controls).forEach(o=>{const a=n.get(o);a instanceof r.NI?a.markAsTouched({onlySelf:!0}):a instanceof r.cw&&this.markAsTouched(a)})}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(r.qu),e.Y36(d),e.Y36(h.yh),e.Y36(c.F0),e.Y36(x.ez))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-login-component"]],decls:14,vars:3,consts:[[1,"main-container"],[1,"main-container__logo"],["src","assets/images/rotan_logo.png",1,"logo"],[1,"main-container__login-form",3,"formGroup"],[1,"title"],[1,"line"],[1,"input-field"],["formControlName","email","type","text","pInputText","","placeholder","Email",1,"p-inputtext-sm"],["class","error",4,"ngIf"],["formControlName","password","type","password","pInputText","","placeholder","Password",1,"p-inputtext-sm"],["pButton","","type","submit","label","SIGN IN",1,"p-button-sm","p-button-secondary",3,"click"],[1,"error"],[4,"ngIf"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e._UZ(2,"img",2),e.qZA(),e.TgZ(3,"form",3),e.TgZ(4,"span",4),e._uU(5,"Rotan Profi Shoes GmbH"),e.qZA(),e._UZ(6,"hr",5),e.TgZ(7,"div",6),e._UZ(8,"input",7),e.YNc(9,_,3,2,"div",8),e.qZA(),e.TgZ(10,"div",6),e._UZ(11,"input",9),e.YNc(12,I,2,1,"div",8),e.qZA(),e.TgZ(13,"button",10),e.NdJ("click",function(){return o.tryLogin()}),e.qZA(),e.qZA(),e.qZA()),2&n&&(e.xp6(3),e.Q6J("formGroup",o.loginForm),e.xp6(6),e.Q6J("ngIf",o.email.invalid&&(o.email.dirty||o.email.touched)),e.xp6(3),e.Q6J("ngIf",o.password.invalid&&(o.password.dirty||o.password.touched)))},directives:[r._Y,r.JL,r.sg,r.Fj,r.JJ,r.u,u.o,l.O5,f.Hq],styles:['.main-container[_ngcontent-%COMP%]{border-radius:10px;height:300px;width:500px;background-color:#fff;display:flex;flex-direction:row}.main-container__logo[_ngcontent-%COMP%]{width:40%;border-right:1px solid #d8d6d6;display:flex;flex-direction:column;justify-content:center;align-items:center}.main-container__login-form[_ngcontent-%COMP%]{margin-top:30px;width:60%;display:flex;flex-direction:column;justify-content:center;align-items:center}.logo[_ngcontent-%COMP%]{width:140px;height:130px}.title[_ngcontent-%COMP%]{font-size:20px;font-weight:bold;font-family:"Bebas Neue",cursive}.line[_ngcontent-%COMP%]{width:70%}.input-field[_ngcontent-%COMP%]{margin-bottom:20px;height:40px}.error[_ngcontent-%COMP%]{margin-top:5px;margin-left:8px;font-size:10px;color:red}']}),t})();const A=[{path:"",pathMatch:"full",redirectTo:"login"},{path:"login",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-login"]],decls:3,vars:0,consts:[[1,"login-container"],[1,"login"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e._UZ(2,"app-login-component"),e.qZA(),e.qZA())},directives:[T],styles:[".login-container[_ngcontent-%COMP%]{height:100%;width:100%;position:fixed;background-size:cover;background-position:center;filter:blur(0px);background-image:url(background2.00780e2284bc91b80964.jpg)}.login[_ngcontent-%COMP%]{margin-top:200px;display:flex;justify-content:center}"]}),t})()}];let Z=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[c.Bz.forChild(A)],c.Bz]}),t})();var U=s(3758);let k=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[l.ez]]}),t})();var N=s(7965);let J=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({providers:[d],imports:[[l.ez,Z,u.j,f.hJ,r.u5,r.UX,k,m.JF,U.$,N.EV]]}),t})()}}]);