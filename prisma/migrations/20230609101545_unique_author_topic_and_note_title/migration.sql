/*
  Warnings:

  - A unique constraint covering the columns `[authorId,topicId,title]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Note_authorId_topicId_title_key" ON "Note"("authorId", "topicId", "title");
