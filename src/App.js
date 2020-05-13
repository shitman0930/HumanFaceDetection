import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesOptions = {
  particles: {//這一段就要自己了解一下particlesJS
   number: {
    vaule: 30,
    density: {
      ebable: true,
      value_area: 800
      }
    }
  }
}

const initialState = {//就每次登入保持初始狀態 不會有上一個人貼過的圖片留著
       input: '',
       imageUrl: '',//跟input互相影響
       box:{}, //這就抓取臉部的方形box
       route: 'signin',//首頁就設定在登入頁面 可是登出都跑到註冊頁面~"~
       isSignedIn: false,//預設為登出
       user: {//284加上的user, 後端server.js抄來的, 通通empty, 有人註冊就會新增
       id:'',
       name: '',
       email: '',
       entries: 0,
       joined: ''
       }
    }

class App extends Component {
  constructor() {//就設定state
    super();
    this.state = initialState;
  }

loadUser = (data) => {//從register.js抓取數據, 回應上面寫的this.state裡的user
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}

  // componentDidMount() {就測試有沒有跟後端連接
  //   fetch('http://localhost:3001/')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  calculateFaceLocation = (data) =>{//自創一個抓取臉部的功能
       const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
       const image = document.getElementById('inputimage');//從FaceRecognition.js那邊抓
       const width =Number(image.width);//就寬度跟高度一定是數字
       const height =Number(image.height);//要做變化就去FaceReco...那邊的width跟height改 這邊會自動適應
       return {//有一點數學,回應box{}裡面的狀態,把bounding_box裡的數據變成方形box
         leftCol: clarifaiFace.left_col * width,//左邊*寬度
         topRow: clarifaiFace.top_row * height,//上面*長度
         rightCol: width - (clarifaiFace.right_col * width),
         bottomRow: height - (clarifaiFace.bottom_row * height)
       }
    }
  
  displayFacebox =(box) => {//也是自創功能, 是個object,要抓取this.state裡的box{}的值,那個值就是calculateFaceLocation裡return的數據, 所以下面的onButton...裡的response function可以用this.display..來包住this.calcalculateFaceLocation
      this.setState({box: box})
  }

  onInputChange = (event) => {//就有事件發生, input改變的時候
     this.setState({input:event.target.value});//state一更新 就輸出這邊的值
  }

  onPictureSubmit = () => {
    this.setState({imageUrl:this.state.input})//當imageurl改變就更新state
     fetch('https://powerful-hamlet-57243.herokuapp.com/imageurl', {
          method:'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input:this.state.input//只回傳這個就可以了
        })
      })//fetch就會有.then joson()
     .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://powerful-hamlet-57243.herokuapp.com/image', {//就Signin.js抄來的改一下
          method:'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id:this.state.user.id//只回傳這個就可以了
        })
      })
        .then(response =>response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(console.log)//error handing, 不要有我們未知的錯誤發生
      }  
      this.displayFacebox(this.calculateFaceLocation(response))
    })//回應抓取的臉部
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {//也是自創功能, 重點就頁面切換
    if(route === 'signout') {//如果在登出頁面的話,登入就為假
      this.setState(initialState)
    } else if (route === 'home') {//如果在home的話, 登入就為真(要登入才能貼圖片網址看辨識)
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state//把this.state通通寫到這行
    return (
    <div className="App">
          <Particles className='particles'
              params={particlesOptions}//設定props
          />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      {route === 'home' //如果在home的話 就回應有大腦 排名 input那一頁 
      ? <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm 
          onInputChange={this.onInputChange}//設定props
          onPictureSubmit={this.onPictureSubmit}//設定props
          />
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
      :(//不然就是停在登入註冊頁面, 可是登出都跑到註冊頁面, 影片311下面有解答0..0
        route === 'signin' || route === 'signout'
        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
       )
      
        }
    </div>
    );
  }
}

export default App;
