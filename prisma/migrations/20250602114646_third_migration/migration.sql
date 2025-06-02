/*
  Warnings:

  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `SubjectOffering` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STUDENT');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "SubjectOffering" DROP CONSTRAINT "SubjectOffering_courseId_fkey";

-- DropIndex
DROP INDEX "Student_email_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubjectOffering" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_userId_key" ON "Student"("userId");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
