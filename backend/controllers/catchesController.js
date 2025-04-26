// controllers/catchesController.ts
import Catch from "../models/Catch.js";

// Hämta alla fångster (för alla användare)
export const getAllCatches = async (req, res) => {
  try {
    const catches = await Catch.find().sort({ date: -1 });
    res.json(catches);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta fångster" });
  }
};

// Hämta inloggad användares fångster
export const getMyCatches = async (req, res) => {
  try {
    const myCatches = await Catch.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(myCatches);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte hämta dina fångster" });
  }
};

// POST /api/catches - Lägg till en ny fångst

// För enum variant - Max, Lasse, Markus
// export const addCatch = async (req, res) => {
//   const { fisherman, fish, length } = req.body;

//   if (!fisherman || !fish || !length) {
//     return res.status(400).json({ message: "Fyll i alla fält" });
//   }

//   try {
//     const newCatch = new Catch({
//       user: req.user._id,
//       fisherman,
//       fish,
//       length,
//       date: new Date().toLocaleDateString("sv-SE"),
//     });

//     const saved = await newCatch.save();
//     res.status(201).json(saved);
//   } catch (error) {
//     res.status(500).json({ message: "Kunde inte spara fångsten" });
//   }
// };

// Sätter användarens förnamn som "fiskare" i fångstmodellen
export const addCatch = async (req, res) => {
  const { fish, length, image } = req.body;

  if (!fish || !length) {
    return res.status(400).json({ message: "Fyll i alla fält" });
  }

  try {
    const newCatch = new Catch({
      user: req.user._id,
      fisherman: req.user.firstName,
      fish,
      length,
      image: image || null,
      date: new Date().toLocaleDateString("sv-SE"),
    });

    const saved = await newCatch.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte spara fångsten" });
  }
};

// DELETE /api/catches/:id - Ta bort en fångst
export const deleteCatch = async (req, res) => {
  try {
    const catchId = req.params.id;
    const userId = req.user._id;
    const userRole = req.user.role;

    const catchToDelete = await Catch.findById(catchId);

    if (!catchToDelete) {
      return res.status(404).json({ message: "Fångst hittades inte" });
    }

    if (
      userRole !== "admin" &&
      catchToDelete.user.toString() !== userId.toString()
    ) {
      return res
        .status(403)
        .json({ message: "Du har inte behörighet att ta bort denna fångst" });
    }

    await catchToDelete.deleteOne();
    res.json({ message: "Fångst borttagen" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Kunde inte ta bort fångsten" });
  }
};
