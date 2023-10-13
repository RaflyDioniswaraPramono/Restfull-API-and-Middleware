import Movies from "../models/Movies.js";

export const getAllMovies = async (req, res) => {
  try {
    const offset = await req.query.page;
    
    const movies = await Movies.findAll({
      offset: offset,
      limit: 10,
    });

    res.status(200).json(movies);
  } catch (error) {
    console.log(error);
  }
};

export const getMovieById = async (req, res) => {
  try {
    const id = await req.params.id;

    const movieById = await Movies.findAll({
      where: {
        id: id,
      },
    });

    res.status(201).json(movieById);
  } catch (error) {
    console.log(error);
  }
};

export const addMovie = async (req, res) => {
  try {
    const { id, title, genres, year } = await req.body;

    await Movies.create({
      id: id,
      title: title,
      genres: genres,
      year: year,
    });

    res.status(200).json({
      message: `Add movie ${title} succesfull genre = ${genres}`,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id, title, genres, year } = await req.body;

    await Movies.update(
      {
        title: title,
        genres: genres,
        year: year,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res
      .status(200)
      .json({ message: `Update movie with id ${id} successfully!` });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const id = await req.params.id;

    await Movies.destroy({
      where: {
        id: id,
      },
    });

    res.json({ message: `Delete movie width id ${id} successfully!` });
  } catch (error) {
    console.log(error);
  }
};
