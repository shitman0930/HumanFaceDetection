import React from 'react';


class Register extends React.Component  {//跟Signin.js一樣設定state
	constructor(props) {//因為要回應props
		super(props);
		this.state = {
			email: '',
			password: '',
			name: ''
		}
	}
    
    onNameChange = (event) => {//自創功能, 監視name變化, 就多了這個
      this.setState({name: event.target.value})
	}

	onEmailChange = (event) => {//自創功能, 監視email變化
      this.setState({email: event.target.value})
	}
	
	onPasswordChange = (event) => {//自創功能, 監視password變化
      this.setState({password: event.target.value})
	}

    onSubmitSignIn = () => {//自創功能, 回傳上面3個功能的值
       fetch('http://localhost:3001/register', {//傳回伺服器
       	 method:'post',//默認是GET
       	 headers: {'Content-Type': 'application/json'},//回傳json格式
       	 body: JSON.stringify({//沒寫後端就無法讀取
            email:this.state.email,
            password:this.state.password,
            name:this.state.name
       	 })//用server.js的database裡的john做測試, 成功的話network點signin, 右邊的response會寫success
       })
       .then(response => response.json())
       .then(user => {
       	if(user.id) {//就之前改signin就改過了這邊沒改
       		this.props.loadUser(user)//這是全部需要的, 所以從App抓取(就加this.props), 回去App加功能
       		this.props.onRouteChange('home');
       	}
       })
	}

	render() {
      
	  return (//要改一下input的格式 />才會正常
	<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
	  <main className="pa4 black-80">
	    <div className="measure">
	      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	        <legend className="f3 fw6 ph0 mh0">註 冊</legend>
	        <div className="mt3">
	          <label className="db fw6 lh-copy f6" htmlFor="name">姓名</label>
	          <input 
	            className="f6 pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
	            type="text" 
	            name="name"  
	            id="name"
	            onChange={this.onNameChange} 
	          />
	        </div>
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
	        onClick={this.onSubmitSignIn}//監控登入, 登入後回到首頁
	        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
	        type="submit" 
	        value="註冊" />
	      </div>
	    </div>
      </main>
    </article>
	);
  }
}

export default Register;