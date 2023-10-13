export const paginate = async (req, res, next) => {
  try {
    if (!req.query.page) {
      req.query.page = 0
    } else {
      req.query.page = (req.query.page - 1) * 10;
    }

    next();
  } catch (error) {
    console.log(error);
  }
}