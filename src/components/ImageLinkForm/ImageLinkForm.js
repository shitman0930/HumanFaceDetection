import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {//props已經在App.js設定過了, 所以直接寫onIput...即可
	return (
	  <div>
		<p className='f3'>
		{'這可以識別你圖片位址中的臉部，試一下吧！'}
		</p>
		<div className='center'>
		   <div className='form center pa4 br3 shadow-5'>
			 <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}//onChange就react內建的語法(event)
			  />
			 <button 
			   className='w-30 grow f4 white bg-light-purple'
               onClick={onButtonSubmit}//onClick就react內建的語法(event)?
			 >辨識臉部</button> 
		   </div>
		</div>
	  </div>
	);
}

export default ImageLinkForm;