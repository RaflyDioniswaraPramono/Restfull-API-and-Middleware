import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
} from "../controllers/users-controller.js";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../controllers/movies-controller.js";
import { auth } from "../middlewares/auth.js";
import { paginate } from "../middlewares/pagination.js";

const router = express.Router();

// Users Restfull Api
/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *        - id
 *        - email
 *        - gender
 *        - password
 *        - role
 *      properties:
 *        id:
 *          type: integer
 *          AUTO_INCREMENT: true
 *          PRIMARY_KEY: true
 *          ALLOW_NULL: false
 *          description: Auto generated key values of the users
 *        email:
 *          type: string
 *          maximum: 50
 *          ALLOW_NULL: false
 *          description: User email as username of users
 *        gender:
 *          type: string
 *          maximum: 50
 *          ALLOW_NULL: false
 *        password:
 *          type: string
 *          maximum: 50
 *          ALLOW_NULL: false
 *          description: User password for basic authentication
 *        role:
 *          type: string
 *          maximum: 50
 *          ALLOW_NULL: false
 *          description: User role for basic authorization
 */
router.get(`${process.env.API_BASE_URL}/users`, auth, paginate, getAllUsers);

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Users management API
 * /api/v1/users:
 *  get:
 *    summary: All users list
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: All users list
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Users'
 * /api/v1/users?page=1&limit=10:
 *  get:
 *    summary: All users list per page
 *    tags: [Users]
 *    parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The number of page       
 *    responses:
 *      200:
 *        description: All users list per page
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Users'
 *  post:
 *    summary: Register user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Users'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message: 
 *                  type: string
 *                  description: Register new user successfully
 *  put: 
 *    summary: Update user
 *    tags: [Users]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Users'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Updating user with id {id} sucessfully!
 * /api/v1/users/{:id}:
 *  get:
 *    summary: Find user by Id
 *    tags: [Users]
 *    parameters: 
 *      -in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: The user id
 *    responses:
 *      200:
 *        description: Get user by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Users'
 *  delete:
 *    summary: Delete user by id
 *    tags: [Users]
 *    parameters:
 *      -in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: The user id
 *    responses:
 *      200:
 *        description: Delete user by id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Delete user with id {id} sucessfully!
 */
router.get(`${process.env.API_BASE_URL}/users/:id`, auth, getUserById);
router.post(`${process.env.API_BASE_URL}/users`, registerUser);
router.put(`${process.env.API_BASE_URL}/users`, auth, updateUser);
router.delete(`${process.env.API_BASE_URL}/users/:id`, auth, deleteUser);

// Movies Restfull Api
/**
 * @swagger
 * components:
 *  schemas:
 *    Movies:
 *      type: object
 *      required:
 *        - id
 *        - title
 *        - genres
 *        - year
 *      properties:
 *        id:
 *          type: integer
 *          AUTO_INCREMENT: true
 *          PRIMARY_KEY: true
 *          ALLOW_NULL: false
 *          description: Auto generated key values of movies
 *        title:
 *          type: string
 *          maximum: 150
 *          ALLOW_NULL: false
 *        genres:
 *          type: string
 *          maximum: 50
 *          ALLOW_NULL: false
 *        year:
 *          type: string
 *          maximum: 50
 *          ALLOW_NULL: false
 */

/**
 * @swagger
 * tags:
 *  name: Movies
 *  description: Movies management API
 * /api/v1/movies:
 *  get:
 *    summary: All movies list
 *    tags: [Movies]
 *    responses:
 *      200:
 *        description: All movies list
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Movies'
 * /api/v1/movies?page=1&limit=10:
 *  get:
 *    summary: All movies list per page
 *    tags: [Movies]
 *    parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The number of page
 *    responses:
 *      200:
 *        description: All movies list per page
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Movies'
 *  post:
 *    summary: Add movie
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Users'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message: 
 *                  type: string
 *                  description: Add new movie successfully!
 *  put: 
 *    summary: Update movie
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#components/schemas/Movies'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Updating movie with id {id} sucessfully!
 * /api/v1/movies/{:id}:
 *  get:
 *    summary: Find movie by Id
 *    tags: [Movies]
 *    parameters: 
 *      -in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: The movie id
 *    responses:
 *      200:
 *        description: Get movie by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                $ref: '#/components/schemas/Movies'
 *  delete:
 *    summary: Delete movie by id
 *    tags: [Movies]
 *    parameters:
 *      -in: path
 *      name: id
 *      schema:
 *        type: integer
 *      required: true
 *      description: The movie id
 *    responses:
 *      200:
 *        description: Delete movie by id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Delete movie with id {id} sucessfully!
 */
router.get(`${process.env.API_BASE_URL}/movies`, auth, paginate, getAllMovies);

router.get(`${process.env.API_BASE_URL}/movies/:id`, auth, getMovieById);
router.post(`${process.env.API_BASE_URL}/movies`, auth, addMovie);
router.put(`${process.env.API_BASE_URL}/movies`, auth, updateMovie);
router.delete(`${process.env.API_BASE_URL}/movies/:id`, auth, deleteMovie);

export default router;
