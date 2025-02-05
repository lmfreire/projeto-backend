-- CreateTable
CREATE TABLE "Fabricante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "Fabricante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL,
    "precoVenda" DECIMAL(65,30) NOT NULL,
    "fabricanteId" INTEGER NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdutoItem" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descricao" TEXT,
    "complemento" TEXT,
    "markup" TEXT,
    "codigogtin" TEXT,
    "produtoId" INTEGER NOT NULL,

    CONSTRAINT "ProdutoItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fabricante" ADD CONSTRAINT "Fabricante_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_fabricanteId_fkey" FOREIGN KEY ("fabricanteId") REFERENCES "Fabricante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produto" ADD CONSTRAINT "Produto_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutoItem" ADD CONSTRAINT "ProdutoItem_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
