// articles.model.ts
export interface Article {
  id: number; // Retirez le | undefined si vous êtes sûr que l'id est toujours présent
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: Date | string;
  userName: string;
  categoryName?: string;
  categoryId?: number;
  isActive: boolean;
}
