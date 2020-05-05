import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {//監控登出, 登出後回到登入頁面
	
		if(isSignedIn) {//isSignedIn在App.js的this.state設定,默認為false,就一開始沒登入就是了, 要注意不能用字串'';如果有登入的話就回應這個
		 return (//點登出就會去登出頁面	
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
		  <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>登出</p>
		</nav>
	     );
		} else {//不然就回應這兩個
			return (//點登入去登入頁面, 點註冊去註冊頁面
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
		  <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>登入</p>
		  <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>註冊</p>
		</nav>
		);
	}
}

export default Navigation;