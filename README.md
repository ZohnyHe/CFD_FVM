# CFD_FVM
CFD_FVM

CFD 常用的 Topology 為有限體積法(FVM)。每個 cells 由數個 faces 構成、每個 faces 由數個 points 構成、每個 points 包含三維空間的座標資訊。以一般的案例來說， cells 的數量從 10 萬至 100 萬都有，而有限體積法的輸出資料(如溫度場、速度場)均是儲存在每個 cell 中。

![image](https://user-images.githubusercontent.com/99318533/162600313-ce532278-b3c1-4844-b71a-ff3530b515d0.png)

此專案的目的是解析 CFD 軟體 OpenFOAM 的輸出檔資料結構，並設計 schema:

![image](https://user-images.githubusercontent.com/99318533/162600536-27670808-7f78-4ff6-8601-1f3725f00082.png)

實作方式:
1. 設定好 Postgres 資料庫，並與後端連接。
2. 由以下 API 照順序建立資料
    (POST): createPoints -> createFaces -> createCells -> createConstData -> createTime -> createAllOutputData (createOwner、createNeighbour)
3. 由以下 API 查詢資料
    (GET): getPoint、getFace、getCell、getDataByTimeStep/:timeStep、getDataByTimeStepAndCellsIndex
    
總結:
此專案的資料儲存方式並不適合與網頁前端 (Three.js) 串接，但可作為 regex、設計 schema、關聯性資料庫與撰寫 API 的練習。
