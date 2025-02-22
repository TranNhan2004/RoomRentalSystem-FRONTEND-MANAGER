'use client';

import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center space-x-2 text-3xl">
      <p>Đang tải dữ liệu</p>
      <span className="dot animate-bounce1">.</span>
      <span className="dot animate-bounce2">.</span>
      <span className="dot animate-bounce3">.</span>
    </div>
  );
};

export default Loading;