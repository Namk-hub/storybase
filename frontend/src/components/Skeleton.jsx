const Skeleton = ({ width, height, borderRadius = '12px' }) => {
  return (
    <div className="skeleton-box" style={{ width, height, borderRadius }}>
      <style>{`
        .skeleton-box {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 25%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.05) 75%
          );
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
        }

        @keyframes skeleton-loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

export default Skeleton;
