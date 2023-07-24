const express = require("express");
const {
  generateImage,
  generateImages,
} = require("../controllers/openaiController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: OPENAI Integration
 *  description: OPENAI section APIs
 *
 */

/**
 * @swagger
 *  components:
 *   schemas:
 *      generateImage:
 *          type: object
 *          required:
 *              prompt
 *              API_KEY
 *              size
 *
 *          properties:
 *              prompt:
 *                  type: string
 *              API_KEY:
 *                  type: string
 *              size:
 *                  type: string
 *
 *      generateImages:
 *          type: object
 *          required:
 *              prompt
 *              API_KEY
 *              size
 *              numImages
 *
 *          properties:
 *              prompt:
 *                  type: string
 *              API_KEY:
 *                  type: string
 *              size:
 *                  type: string
 *              numImages:
 *                  type: string
 */

/**
 * @swagger
 * /openai/generateimage:
 *  post:
 *      tags: ["OPEN_AI"]
 *      summary: "Generate Image"
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/generateImage"
 *
 *      responses:
 *          '200':
 *              description: "Generated Image!"
 *          '400':
 *              description: "Bad Request!"
 */

// generate only one images
router.post("/generateimage", generateImage);

/**
 * @swagger
 * /openai/generateimages:
 *  post:
 *      tags: ["OPEN_AI"]
 *      summary: "Generate Image"
 *
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/generateImages"
 *
 *      responses:
 *          '200':
 *              description: "Generated Images!"
 *          '400':
 *              description: "Bad Request!"
 */

// generate N number of images
router.post("/generateimages", generateImages);

module.exports = router;
