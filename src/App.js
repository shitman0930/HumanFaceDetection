import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';//就從這邊抓取臉部辨識的API
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({//就都從網站複製貼上的
 apiKey: '38084e90f9634ccd9efb9fb0a13b823c'
});

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

class App extends Component {
  constructor() {//就設定state
    super();
    this.state = {
       input: '',
       imageUrl: '',//跟input互相影響
       box:{}, //這就抓取臉部的方形box
       route: 'signin',//這會追蹤我們在哪個頁面
       isSignedIn: false
    }
  }

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

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input})//當imageurl改變就更新state
    app.models
      .predict(
      // Clarifai.COLOR_MODEL,//直接去原始碼抓model,會在console裡的output的data裡的color裡顯示圖片的顏色百分比組成
      Clarifai.FACE_DETECT_MODEL,//我們要用的是這個model, output/data/regions/region_info/bounding_box 會有各部份組成百分比
     // "a403429f2ddf4b49b307e318f00e528b", //api key, 可以免費點5000次/月
      this.state.input)//這邊改成this.state.imageUrl會有錯 
//因為setState的特有語法,由於各種原因(主要是性能），在React中調用setState()是異步的。在幕後，React會將對setState()的多個調用分批處理到一個調用中，然後一次重新渲染該組件，而不是針對每個狀態更改都重新渲染(這是AJAX)。因此，imageUrl參數在我們的示例中將永遠無法工作，因為當我們使用預測函數調用Clarifai時，React尚未完成狀態的更新。
//解決此問題的一種方法是使用回調函數：
//setState(updater, callback)
    .then(response => this.displayFacebox(this.calculateFaceLocation(response)))//回應抓取的臉部
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {//也是自創功能, 重點就頁面切換
    if(route === 'signout') {//如果在登出頁面的話,登入就為假
      this.setState({isSignedIn: false})
    } else if (route === 'home') {//如果在首頁的話, 登入就為真(要登入才能貼圖片網址看辨識)
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
      {route === 'home' //如果在首頁的話 就回應有大腦 排名 input那一頁 
      ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm 
          onInputChange={this.onInputChange}//設定props
          onButtonSubmit={this.onButtonSubmit}//設定pros
          />
          <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
      :(//不然就是停在登入註冊那一頁
        route === 'signin' 
        ? <Signin onRouteChange={this.onRouteChange} />
        : <Register onRouteChange={this.onRouteChange} />
       )
      
        }
    </div>
    );
  }
}

export default App;
