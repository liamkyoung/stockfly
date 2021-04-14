import express from "express";
import {
  getStockData,
  getSMA,
  percentChange,
  volumeChart,
  stockPerfIndex,
  stockPerfSector,
  dollarsTraded,
  totalTuples,
  getStockInfo,
  getBetaData,
} from "../controllers/stock-controller.js";

const router = express.Router();

router.get("/api/percentChange", percentChange);
router.get("/api/sma", getSMA);
router.get("/api/stock", getStockData);
router.get("/api/volumeChart", volumeChart);
router.get("/api/dollarsTraded", dollarsTraded);
router.get("/api/stockPerfIndex", stockPerfIndex);
router.get("/api/stockPerfSector", stockPerfSector);
router.get("/api/totalTuples", totalTuples);
router.get("/api/getStockInfo", getStockInfo);
router.get("/api/getBetaData", getBetaData);

export default router;
