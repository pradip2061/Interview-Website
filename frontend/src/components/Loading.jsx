import React from 'react';
import ReactLoading from 'react-loading';

const Loading = ({ type, color,height,width }) => (
  <div className="flex justify-center  lg:w-320 w-[100%] h-screen bg-black/10">
    <ReactLoading type={type} color={color} height={height} width={width} className='mt-70'/>
  </div>
);

export default Loading;
