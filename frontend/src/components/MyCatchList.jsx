import { useState } from "react";

export default function MyCatchList({ catches, onDelete }) {
  const [visibleImages, setVisibleImages] = useState({});

  const toggleImage = (id) => {
    setVisibleImages((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
                      <button onClick={() => toggleImage(catchItem._id)}>
                        {visibleImages[catchItem._id]
                          ? "Dölj bild"
                          : "Visa bild"}
                      </button>
                      {visibleImages[catchItem._id] && (
                        <div>
                          <img
                            src={`/public/uploads/images/${catchItem.image}`}
                            alt="Fångstbild"
                            style={{ maxWidth: "300px", marginTop: "0.5rem" }}
                          />
                        </div>
                      )}
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
    </div>
  );
}
