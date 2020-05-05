import React from 'react';


const Register = ({ onRouteChange }) => {//加入頁面切換參數
	return (//要改一下input的格式 />才會正常
	<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
	  <main className="pa4 black-80">
	    <div className="measure">
	      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	        <legend className="f3 fw6 ph0 mh0">註 冊</legend>
	        <div className="mt3">
	          <label className="db fw6 lh-copy f6" htmlFor="name">姓名</label>
	          <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
	        </div>
	        <div className="mt3">
	          <label className="db fw6 lh-copy f6" htmlFor="email-address">電子郵件</label>
	          <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
	        </div>
	        <div className="mv3">
	          <label className="db fw6 lh-copy f6" htmlFor="password">密碼</label>
	          <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
	        </div>
	      </fieldset>
	      <div className="">
	        <input 
	        onClick={() => onRouteChange('home')}//監控登入, 登入後回到首頁
	        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
	        type="submit" 
	        value="註冊" />
	      </div>
	    </div>
      </main>
    </article>
	);
}

export default Register;