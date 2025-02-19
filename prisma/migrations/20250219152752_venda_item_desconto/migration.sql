/*
  Warnings:

  - Added the required column `desconto` to the `VendaItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VendaItem" ADD COLUMN     "desconto" DECIMAL(65,30) NOT NULL;
