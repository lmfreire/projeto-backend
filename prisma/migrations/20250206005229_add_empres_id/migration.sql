/*
  Warnings:

  - Added the required column `empresaId` to the `ProdutoItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProdutoItem" ADD COLUMN     "empresaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ProdutoItem" ADD CONSTRAINT "ProdutoItem_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
