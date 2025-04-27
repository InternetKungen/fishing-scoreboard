import { useState } from "react";
import Modal from "./Modal"; // Vi återanvänder samma Modal
import showImage from "../assets/img/imagesmode_24dp.svg";
export default function Top3Section({ top3Abborre, top3Gadda }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="top3-container">
      <div className="top3-box">
        <h2>Top 3 Största Abborre</h2>
        <ul>
          {top3Abborre.map((item, index) => (
            <li key={index}>
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
              {item.fisherman}: {item.length} cm
            </li>
          ))}
        </ul>
      </div>
      <div className="top3-box">
        <h2>Top 3 Största Gädda</h2>
        <ul>
          {top3Gadda.map((item, index) => (
            <li key={index}>
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
              {item.fisherman}: {item.length} cm
            </li>
          ))}
        </ul>
        {selectedImage && (
          <Modal imageSrc={selectedImage} onClose={closeModal} />
        )}
      </div>
    </div>
  );
}
