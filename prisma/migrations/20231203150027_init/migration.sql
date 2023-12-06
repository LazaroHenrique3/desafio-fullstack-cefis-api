-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "teacherId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    CONSTRAINT "course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCourse" INTEGER NOT NULL,
    "idStudent" INTEGER NOT NULL,
    "question_text" TEXT NOT NULL,
    CONSTRAINT "question_idCourse_fkey" FOREIGN KEY ("idCourse") REFERENCES "course" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "question_idStudent_fkey" FOREIGN KEY ("idStudent") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "response" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idQuestion" INTEGER NOT NULL,
    "response_text" TEXT NOT NULL,
    CONSTRAINT "response_idQuestion_fkey" FOREIGN KEY ("idQuestion") REFERENCES "question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
