import express from "express";
import { handleContactIdentification } from "../controllers/contact.controller";

const router = express.Router();

router.post("/", handleContactIdentification);

module.exports = router;
