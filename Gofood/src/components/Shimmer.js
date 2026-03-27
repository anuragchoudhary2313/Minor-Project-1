import React from 'react';

const Shimmer = ({ type = 'card' }) => {
  if (type === 'header') {
    return (
      <div className="shimmer mb-4" style={{ height: '40px', width: '250px', borderRadius: '12px' }} />
    );
  }

  return (
    <div className="card h-100 border-0 shadow-sm" style={{ background: 'var(--color-surface)', overflow: 'hidden' }}>
      <div className="shimmer" style={{ height: '200px', width: '100%' }} />
      <div className="p-4">
        <div className="shimmer mb-3" style={{ height: '20px', width: '70%', borderRadius: '4px' }} />
        <div className="shimmer mb-2" style={{ height: '14px', width: '100%', borderRadius: '4px' }} />
        <div className="shimmer mb-4" style={{ height: '14px', width: '90%', borderRadius: '4px' }} />
        <div className="d-flex justify-content-between align-items-center pt-3 border-top">
          <div className="shimmer" style={{ height: '24px', width: '60px', borderRadius: '4px' }} />
          <div className="shimmer" style={{ height: '36px', width: '100px', borderRadius: '24px' }} />
        </div>
      </div>
    </div>
  );
};

export default Shimmer;
