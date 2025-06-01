/*
  Warnings:

  - You are about to drop the column `code` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `curriculumId` on the `Major` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Major` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Major" DROP CONSTRAINT "Major_curriculumId_fkey";

-- DropIndex
DROP INDEX "Course_code_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "Major" DROP COLUMN "curriculumId",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Major" ADD CONSTRAINT "Major_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
