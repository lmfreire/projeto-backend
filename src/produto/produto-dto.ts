export class ProdutoDto {
    nome: string;
    estoque?: number;
    precoVenda: number;
    empresaId: number;
    fabricanteId: number;
}

export class findAllDto {
    empresaId: number;
}

export class findAllByFabricanteDto extends findAllDto{
    fabricanteId: number;
}

export class findById extends findAllByFabricanteDto{
    id: number;
}

export class adicionarEstoqueDto {
    produtoId: number;
    empresaId: number;
}

export class removerEstoqueDto {
    produtoId: number;
    empresaId: number;
    quantidade: number;
}
