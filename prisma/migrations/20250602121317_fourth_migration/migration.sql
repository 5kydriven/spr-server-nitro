/*
  Warnings:

  - You are about to drop the column `studentNo` on the `Student` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middleName` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Student_studentNo_key";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "studentNo",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "birthDate" TEXT,
ADD COLUMN     "birthPlace" TEXT,
ADD COLUMN     "civilStatus" TEXT,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "middleName" TEXT NOT NULL,
ADD COLUMN     "mobileNumber" TEXT,
ADD COLUMN     "parentMobileNumber" TEXT,
ADD COLUMN     "parentName" TEXT,
ADD COLUMN     "sex" TEXT;
