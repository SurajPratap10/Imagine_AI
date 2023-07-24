const express = require("express");
const {
  signupController,
  loginController,
} = require("../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Authorization
 *  description: Auth section APIs
 *
 */

/**
 * @swagger
 *  components:
 *   schemas:
 *      signup:
 *          type: object
 *          required:
 *              name
 *              email
 *              password
 *
 *          properties:
 *              name:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *
 *      login:
 *          type: object
 *          required:
 *              email
 *              password
 *
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 */

/**
 * @swagger
 * /auth/signup:
 *  post:
 *      tags: ["Auth"]
 *      summary: "Sign up"
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/signup"
 *
 *      responses:
 *          '201':
 *              description: "Signed Up!"
 *          '400':
 *              description: "Invalid email!"
 *          '409':
 *              description: "Email already exists!"
 *          '404':
 *              description: "Something Went Wrong!!! Try Again"
 */

router.post("/signup", signupController);

/**
 * @swagger
 * /auth/login:
 *  post:
 *      tags: ["Auth"]
 *      summary: "Login"
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/login"
 *
 *      responses:
 *          '201':
 *              description: "Logged In!"
 *          '400':
 *              description: "Invalid email! OR Invalid Password! OR No such Email Exists!"
 */

router.post("/login", loginController);

module.exports = router;
