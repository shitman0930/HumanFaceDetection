import React from 'react';


const Rank = ({ name, entries }) => {
	return (
	  <div>
        <div className='white f3'>
        {`${name} , 您輸入的圖片位址次數目前是...`}
        </div>
        <div className='white f1'>
        {entries}
        </div>
	  </div>
	);
}

export default Rank;