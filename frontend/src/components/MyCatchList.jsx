import { useState } from "react";
import Modal from "./Modal";
import addImage from "../assets/img/add_photo_alternate_24dp.svg";
import showImage from "../assets/img/imagesmode_24dp.svg";

export default function MyCatchList({ catches, onDelete }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="my-cathces-container">
      <h2>Mina Fångster</h2>
      <div className="my-catches">
        {catches.length === 0 ? (
          <p>Inga fångster registrerade ännu.</p>
        ) : (
          <ul>
            {catches.map((catchItem) => (
              <li key={catchItem._id}>
                <div className="catch-info">
                  {catchItem.image ? (
                    <>
                      <button
                        className="show-image-button"
                        title="Visa bild"
                        onClick={() =>
                          openImageModal(
                            `/public/uploads/images/${catchItem.image}`
                          )
                        }
                      >
                        <img src={showImage} alt="Visa bild" />
                      </button>
                    </>
                  ) : (
                    <button className="add-image-button" title="Lägg till bild">
                      <img src={addImage} alt="Lägg till bild" />
                    </button>
                  )}
                  {catchItem.date} - {catchItem.fish} ({catchItem.length} cm)
                </div>

                <button
                  className="delete-button"
                  onClick={() => onDelete(catchItem._id)}
                >
                  ❌ Ta bort
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedImage && <Modal imageSrc={selectedImage} onClose={closeModal} />}
    </div>
  );
}
