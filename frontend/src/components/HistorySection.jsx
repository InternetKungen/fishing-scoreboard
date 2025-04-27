import { useState } from "react";
import Modal from "./Modal"; // Vi återanvänder samma Modal
import showImage from "../assets/img/imagesmode_24dp.svg";

export default function HistorySection({ catches }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="history-container">
      <h2>Historik</h2>
      <ul className="history-list">
        {catches.map((item, index) => (
          <li key={index}>
            <div className="history-item">
              {item.image && (
                <button
                  className="show-image-button"
                  title="Visa bild"
                  onClick={() =>
                    openImageModal(`/public/uploads/images/${item.image}`)
                  }
                >
                  <img src={showImage} alt="Visa bild" />
                </button>
              )}
              {item.date?.slice(0, 10) || "okänt datum"} – {item.fish} –{" "}
              {item.length} cm ({item.fisherman})
            </div>
          </li>
        ))}
      </ul>

      {selectedImage && <Modal imageSrc={selectedImage} onClose={closeModal} />}
    </div>
  );
}
