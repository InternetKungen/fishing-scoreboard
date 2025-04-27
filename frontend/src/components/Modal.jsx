export default function Modal({ imageSrc, onClose }) {
  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "white",
          }}
        >
          ✖
        </button>
        <img
          src={imageSrc}
          alt="Fångstbild"
          style={{ maxWidth: "90%", maxHeight: "80vh" }}
        />
      </div>
    </div>
  );
}

// Styles
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  position: "relative",
  backgroundColor: "transparent",
  padding: "1rem",
  borderRadius: "8px",
  maxWidth: "90%",
  maxHeight: "90%",
};
