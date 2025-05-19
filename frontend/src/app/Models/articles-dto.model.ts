// src/app/Models/articles-dto.model.ts
export interface ArticleDTO {
  title: string;
  content: string;
  imageUrl?: string;
  categoryId?: number | null;
  userId: number;
  isActive: boolean;
}

export interface UpdateArticleDTO extends ArticleDTO {
  id: number;
}
