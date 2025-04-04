import Article from "../models/Article.js";

// Hämta alla artiklar
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch articles", error });
  }
};

// Hämta en specifik artikel via ID
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch article", error });
  }
};

// Skapa en ny artikel
export const createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: "Failed to create article", error });
  }
};

// Uppdatera en artikel
export const updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: "Failed to update article", error });
  }
};

// Radera en artikel
export const deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete article", error });
  }
};
