'use client';

import React from 'react';



// Cấu hình mặc định
const defaultConfig ={
  minLoadingTime: 160,     // 160ms là thời gian tối thiểu để người dùng nhận thấy
  completionTime: 500,     // 500ms cho animation hoàn thành
  height: 3,              // Chiều cao 3px
  startColor: '#00FF88',  // Màu xanh lá cây
  endColor: '#344FFB',    // Màu xanh dương
  animationDuration: 1500, // 1.5s cho một chu kỳ animation
  animationDelay: 750     // 0.75s delay giữa 2 thanh
};

export const Loading = ({
  isLoading, 
  isCompleting,
  config = defaultConfig 
}) => {
  // Kết hợp config mặc định với config tùy chỉnh
  const finalConfig = { ...defaultConfig, ...config };

  // Không hiển thị gì nếu không trong trạng thái loading
  if (!isLoading) return null;

  // Style cho thanh loading sử dụng CSS variables
  const progressStyle = {
    '--loading-height': `${finalConfig.height}px`,
    '--loading-start-color': finalConfig.startColor,
    '--loading-end-color': finalConfig.endColor,
    '--loading-animation-duration': `${finalConfig.animationDuration}ms`,
    '--loading-animation-delay': `${finalConfig.animationDelay}ms`,
    '--loading-completion-time': `${finalConfig.completionTime}ms`,
  };

  // Render thanh loading với gradient và animation
  return (
    <div className="loading-progress" style={progressStyle}>
      <div className={`loading-progress-bar${isCompleting ? ' completing' : ''}`} />
    </div>
  );
};
