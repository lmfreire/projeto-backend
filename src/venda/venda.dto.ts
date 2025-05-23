export class VendaDto {    
    empresaId: number;
    clienteId: number;
    valor_total?: number;
    descricao?: string;
}

export class VendaDtoService {    
    empresaId: number;
    usuarioId: number;
    clienteId: number;
    valor_total?: number;
    descricao?: string;
}

export class VendaItemArrDto {
    produtoItemId: string;
    quantidade: number;
    valor_unitario: number;
    valor_total: number;
    desconto: number;
}

export class VendaItemDto {
    vendaId: number;    
    empresaId: number;
    itens: VendaItemArrDto[];
}

export class VendaItemRemoveDto {
    empresaId: number;
    vendaItemId: number;
}

export class VendaItemFindById {
    empresaId: number;
    vendaItemId: number;
}

export class VendaDTO {
    empresaId: number;
    vendaId: number;
}