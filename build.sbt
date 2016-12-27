name := """Let's Discuss"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayJava)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  javaJdbc,
  cache,
  javaWs,
  "org.mongodb" % "mongo-java-driver" % "3.4.0",
  "uk.co.panaxiom" %% "play-jongo" % "2.0.0-jongo1.3",
  "com.google.firebase" % "firebase-server-sdk" % "3.0.1"
)
