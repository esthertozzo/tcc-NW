import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface DadosFormulario {
  preferencias: string[];
  pele: {
    tipo: string;
    sensibilidade: string;
    tom: string;
    condicoes: string[];
  };
}

export interface Sugestao {
  titulo: string;
  descricao: string;
  categoria: 'maquiagem' | 'pele' | 'rotina';
  prioridade: number;
}

@Injectable({
  providedIn: 'root'
})
export class SugestoesService {

  private storage: Storage | null = null;
  private readonly PREFIXO_USUARIO = 'user_form_data_';



  constructor(private storageService: Storage) {
    this.init();
   }

   async init() {
    this.storage = await this.storageService.create();
   }

   // gera um id unico para o usuario baseado no timestamp atual
   private gerarIdUsuario(): string{
    return `user_${Math.random().toString(36).substr(2, 9)}`;
   }


   // salva os dados do formulario com um id unico de usuario
   async salvarDadosFormulario(dados: DadosFormulario): Promise<string> {
    if (!this.storage) {
      await this.init();
   }

   const idUsuario = this.gerarIdUsuario();
   const chave = this.PREFIXO_USUARIO + idUsuario;

   await this.storage!.set(chave, {
    dados,
    dataCriacao: new Date().toISOString(),
    idUsuario
   });


   // salva o id do usuario atual para referencia
   await this.storage!.set('usuario_atual', idUsuario);
   
   return idUsuario;

  }

  // recupera os dados do formulario do usuario atual
  async getDadosFormularioAtual(): Promise<DadosFormulario | null> {
    if (!this.storage){
      await this.init();
    }

    const idUsuario = await this.storage!.get('usuario_atual');
    if (!idUsuario) return null;

    const chave = this.PREFIXO_USUARIO + idUsuario;
    const dadosSalvos = await this.storage!.get(chave);

    return dadosSalvos?.dados || null;
    
  }

  // limpa os dados do formulario do usuario atual (para logout ou reset)
  async limparDadosusuario(): Promise<void> {
    if(!this.storage){
      await this.init();
    }

    const idUsuario = await this.storage!.get('usuario_atual');
    if (idUsuario){
      const chave = this.PREFIXO_USUARIO + idUsuario;
      await this.storage!.remove(chave);
      await this.storage!.remove('usuario_atual');
    }
  }

  // gera sugestoes personalizadas baseadas nos dados do formulario
  async gerarSugestoesPersonalizadas(): Promise<Sugestao[]> {
    const dados = await this.getDadosFormularioAtual();
    if (!dados) return [];

    const sugestoes: Sugestao[] = [];

    // Sugestões baseadas no tipo de pele
    if (dados.pele.tipo === 'Oleosa') {
      sugestoes.push({
        titulo: 'Controle de Oleosidade',
        descricao: 'Use produtos oil-free e lave o rosto 2x ao dia com sabonete específico para pele oleosa',
        categoria: 'pele',
        prioridade: 1
      });
    } else if (dados.pele.tipo === 'Seca') {
      sugestoes.push({
        titulo: 'Hidratação Intensa',
        descricao: 'Aplique creme hidratante rico em ácido hialurônico e evite água muito quente',
        categoria: 'pele',
        prioridade: 1
      });
    }

    // Sugestões baseadas na sensibilidade
    if (dados.pele.sensibilidade === 'Sim') {
      sugestoes.push({
        titulo: 'Produtos Hipoaergênicos',
        descricao: 'Opte por produtos sem fragrância e teste sempre em uma pequena área primeiro',
        categoria: 'pele',
        prioridade: 2
      });
    }

    // Sugestões baseadas nas condições específicas
    if (dados.pele.condicoes.includes('Acne / Oleosidade')) {
      sugestoes.push({
        titulo: 'Tratamento Anti-Acne',
        descricao: 'Use produtos com ácido salicílico e evite tocar no rosto durante o dia',
        categoria: 'pele',
        prioridade: 1
      });
    }

    if (dados.pele.condicoes.includes('Olheiras')) {
      sugestoes.push({
        titulo: 'Disfarce de Olheiras',
        descricao: 'Use corretivo com tom laranja/salmão para neutralizar o azul das olheiras',
        categoria: 'maquiagem',
        prioridade: 2
      });
    }

    // Sugestões baseadas nas preferências
    if (dados.preferencias.includes('Maquiagem Natural')) {
      sugestoes.push({
        titulo: 'Look Natural',
        descricao: 'Use BB cream, blush em pó e máscara de cílios para um visual discreto e elegante',
        categoria: 'maquiagem',
        prioridade: 3
      });
    }

    if (dados.preferencias.includes('Look Ousado')) {
      sugestoes.push({
        titulo: 'Batom Vibrante',
        descricao: 'Experimente um batom vermelho ou rosa vibrante para destacar os lábios',
        categoria: 'maquiagem',
        prioridade: 3
      });
    }

    if (dados.preferencias.includes('Iluminar Rosto')) {
      sugestoes.push({
        titulo: 'Highlighter Natural',
        descricao: 'Aplique iluminador nas maçãs do rosto, ponta do nariz e arco de cupido',
        categoria: 'maquiagem',
        prioridade: 3
      });
    }

    if (dados.preferencias.includes('Rotina Rápida')) {
      sugestoes.push({
        titulo: 'Rotina Express',
        descricao: 'Limpeza, hidratação e protetor solar em apenas 3 passos para manhãs corridas',
        categoria: 'rotina',
        prioridade: 2
      });
    }

    // Sugestões baseadas no tom de pele
    if (dados.pele.tom === 'Muito Claro' || dados.pele.tom === 'Claro') {
      sugestoes.push({
        titulo: 'Proteção Solar Extra',
        descricao: 'Use FPS 50+ e reaplique a cada 2 horas, especialmente em dias ensolarados',
        categoria: 'pele',
        prioridade: 2
      });
    }

    return sugestoes.sort((a, b) => a.prioridade - b.prioridade).slice(0, 5); // Retorna as 5 sugestões mais prioritárias
  }

  // usa a data atual para gerar uma sugestao "alatoria" mas consistente por dia
  async getSugestaoDoDia(): Promise<Sugestao | null> {
    const sugestoes = await this.gerarSugestoesPersonalizadas();
    if (sugestoes.length === 0) return null;

    const hoje = new Date();
    const diaDoAno = Math.floor((hoje.getTime() - new Date(hoje.getFullYear(), 0, 0).getTime()) / 864e5);
    const indice = diaDoAno % sugestoes.length;

    return sugestoes[indice];

  }

}
