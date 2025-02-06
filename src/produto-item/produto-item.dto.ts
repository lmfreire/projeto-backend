export class ProdutoItemDto {
    codigo: string;
    descricao?: string;
    complemento?: string;
    markup?: string;
    codigogtin?: string;    
    produtoId: number;
    empresaId: number;
}

export class BuscarProdutoItemDto {
    empresaId: number;
    produtoId: number;
}