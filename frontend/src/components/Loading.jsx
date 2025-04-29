import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color,height,width }) => (
  <div className="flex justify-center  w-320 h-screen bg-black/10">
    <ReactLoading type={type} color={color} height={height} width={width} className='mt-70'/>
  </div>
);

export default Loading;
