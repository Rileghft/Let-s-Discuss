# Let's Discuss

![snapshot lost](https://raw.github.com/Rileghft/Let-s-Discuss/master/snapshot/home.PNG)

## 簡介

Let's Discuss是一個線上多人討論服務，幫助人們改善溝通的效率，我們整合聊天室、重點摘要、文件於同一個頁面中，讓使用者不用再多個程式或分頁中切換，大大提升工作效率。

![snapshot lost](https://raw.github.com/Rileghft/Let-s-Discuss/master/snapshot/discuss.PNG)

## 技術

這個服務使用Firebase作為即時資料庫，處理聊天室訊息、重點摘要與文件，網頁的部分使用Play Web framework，而在文件的部分使用Firepad套件作為多人即時編輯器。

## 建置專案

1. `git clone https://github.com/Rileghft/Let-s-Discuss.git` 或下載專案

2. 安裝JDK8+，並設定環境路徑

3. 安裝Play Web Framework 啟動器 [Activator](https://www.lightbend.com/activator/download) 或[sbt](http://www.scala-sbt.org/)來建置專案

4. 設定activator 或 sbt 環境路徑

5. 開啟終端機，切換到專案目錄，輸入activator run 或 sbt run

6. 打開瀏覽器 [localhost:9000](http://localhost:9000)