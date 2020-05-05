import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {//圖片位址就這個參數 
	return (//absoulte就是絕對位置 讓圖片維持一定的大小 width height auto(hei會自動根據width調整大小) 
		<div className='center ma'>
		<div className='absolute mt2'>
		  <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
	      <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}} ></div>
		</div>
		</div>
	);
}

export default FaceRecognition;