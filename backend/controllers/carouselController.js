import Carousel from "../models/Carousel.js";

// Hämta karusellen
export const getCarousel = async (req, res) => {
  try {
    const carousel = await Carousel.findOne().populate("articles");
    if (!carousel) {
      return res.status(404).json({ message: "Carousel not found" });
    }
    res.json(carousel);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch carousel", error });
  }
};

// Uppdatera karusellen (ersätt befintliga artiklar)
export const updateCarousel = async (req, res) => {
  try {
    const { articles } = req.body;

    if (!Array.isArray(articles)) {
      return res.status(400).json({ message: "Invalid articles format" });
    }

    let carousel = await Carousel.findOne();
    if (!carousel) {
      carousel = new Carousel({ articles });
    } else {
      carousel.articles = articles;
    }

    await carousel.save();
    res.json(carousel);
  } catch (error) {
    res.status(500).json({ message: "Failed to update carousel", error });
  }
};
