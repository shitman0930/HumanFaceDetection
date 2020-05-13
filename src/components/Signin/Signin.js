import React from 'react';


class Signin extends React.Component  {//signin雖然是App.js的child, 但它也可以自己創造state! 好處就是APP不會太多程式碼
	constructor(props) {//因為要回應props
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}

	onEmailChange = (event) => {//自創功能, 監視email變化
      this.setState({signInEmail: event.target.value})
	}
	
	onPasswordChange = (event) => {//自創功能, 監視password變化
      this.setState({signInPassword: event.target.value})
	}

	onSubmitSignIn = () => {//自創功能, 回傳上面2個功能的值
       fetch('https://powerful-hamlet-57243.herokuapp.com/signin', {//傳回伺服器
       	 method:'post',//默認是GET
       	 headers: {'Content-Type': 'application/json'},//回傳json格式
       	 body: JSON.stringify({//沒寫後端就無法讀取
            email:this.state.signInEmail,
            password:this.state.signInPassword
       	 })//用server.js的database裡的john做測試, 成功的話network點signin, 右邊的response會寫success
       })
       .then(response => response.json())
       .then(user => {
       	if(user.id) {//
       		this.props.loadUser(user);
       		this.props.onRouteChange('home');
       	}
       })
	}
	
	render() {
		// const { onRouteChange } = this.props;沒寫也沒事??
		return (//要改一下input的格式 />才會正常
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
			  <main className="pa4 black-80">
			    <div className="measure">
			      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			        <legend className="f2 fw6 ph0 mh0">登 入</legend>
			        <div className="mt3">
			          <label className="db fw6 lh-copy f6" htmlFor="email-address">電子郵件</label>
			          <input 
			            className="f6 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			            type="email" 
			            name="email-address"  
			            id="email-address"
			            onChange={this.onEmailChange} 
			            />
			        </div>
			        <div className="mv3">
			          <label className="db fw6 lh-copy f6" htmlFor="password">密碼</label>
			          <input 
			            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			            type="password" 
			            name="password"  
			            id="password" 
			            onChange={this.onPasswordChange}
			            />
			        </div>
			      </fieldset>
			      <div className="">
			        <input 
			        onClick={this.onSubmitSignIn}
			        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
			        type="submit" 
			        value="登入" />
			      </div>
			      <div className="lh-copy mt3">
			        <p onClick={() => this.props.onRouteChange('register')} className="f6 link dim black db pointer">註冊</p>
			      </div>
			    </div>
		      </main>
		    </article>
                );
              }	
           }

export default Signin;