import { useState } from "react";
import Modal from "./Modal";

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
                  {catchItem.date} - {catchItem.fish} ({catchItem.length} cm)
                  {catchItem.image ? (
                    <>
                      <button
                        onClick={() =>
                          openImageModal(
                            `/public/uploads/images/${catchItem.image}`
                          )
                        }
                      >
                        Visa bild
                      </button>
                    </>
                  ) : (
                    <button>Lägg till bild</button>
                  )}
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
