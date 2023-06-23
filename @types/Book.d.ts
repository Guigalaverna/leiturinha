export type Book = {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: string;
    id: string;
  };
  last_edited_by: {
    object: string;
    id: string;
  };
  cover: any;
  icon: any;
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  properties: {
    'Capa do livro': {
      id: string;
      type: string;
      files: Array<{
        name: string;
        type: string;
        external: {
          url: string;
        };
      }>;
    };
    'Está disponível?': {
      id: string;
      type: string;
      checkbox: boolean;
    };
    Categorias: {
      id: string;
      type: string;
      multi_select: Array<{
        id: string;
        name: string;
        color: string;
      }>;
    };
    Descrição: {
      plain_text: string;
    };
    Título: {
      id: string;
      type: string;
      title: Array<{
        type: string;
        text: {
          content: string;
          link: any;
        };
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color: string;
        };
        plain_text: string;
        href: any;
      }>;
    };
  };
  url: string;
  public_url: any;
};
