import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

const Title = (props: TitleProps) => {
  return (
    <div className="inline-block text-center">
      <h1 className="text-2xl font-bold relative mb-1">{props.children}</h1>
      <div className="w-[70%] h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-lg absolute"></div>
    </div>
  );
};

export default Title;
