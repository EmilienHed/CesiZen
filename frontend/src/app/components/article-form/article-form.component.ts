import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../Models/categorie.model';
import { CategorieService } from '../../services/categorie.service';
import { Article } from '../../Models/articles.model';
import { ArticleDTO, UpdateArticleDTO } from '../../Models/articles-dto.model';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    NgClass
  ],
  standalone: true
})
export class ArticleFormComponent implements OnInit {
  articleForm: FormGroup;
  categories: Category[] = [];
  loading = false;
  submitting = false;
  error = '';
  articleId: number | null = null;
  isEditMode = false;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private categoryService: CategorieService,
    private authService: AuthService
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required]],
      categoryId: [null],
      isActive: [true],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current user:', this.currentUser);

    if (!this.authService.isAdmin()) {
      console.log('L\'utilisateur n\'est pas administrateur, redirection vers la page d\'accueil');
      this.router.navigate(['/']);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id;

    if (id) {
      this.articleId = +id;
      this.loadArticle(+id);
    }

    this.loadCategories();
  }

  loadArticle(id: number): void {
    this.loading = true;
    console.log('Chargement de l\'article avec ID:', id);

    this.articleService.getArticleById(id)
      .subscribe({
        next: (article: Article) => {
          console.log('Article récupéré:', article);
          this.articleForm.patchValue({
            title: article.title,
            content: article.content,
            categoryId: article.categoryId,
            isActive: article.isActive,
            imageUrl: article.imageUrl || ''
          });
          console.log('Formulaire mis à jour avec les valeurs de l\'article');
          this.loading = false;
        },
        error: (error: any) => {
          this.error = 'Erreur lors du chargement de l\'article: ' + (error.error?.message || error.statusText || 'Erreur inconnue');
          console.error('Erreur détaillée lors du chargement de l\'article:', error);
          this.loading = false;
        }
      });
  }

  loadCategories(): void {
    this.categoryService.getCategories()
      .subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
          console.log('Catégories chargées:', categories);
        },
        error: (error: any) => {
          this.error = 'Erreur lors du chargement des catégories: ' + (error.error?.message || error.statusText || 'Erreur inconnue');
          console.error('Erreur détaillée lors du chargement des catégories:', error);
        }
      });
  }

  onSubmit(): void {
    console.log('=== DÉBUT onSubmit AVEC PLUS DE LOGS ===');
    console.log('Formulaire valide:', this.articleForm.valid);
    console.log('isEditMode:', this.isEditMode);
    console.log('Valeurs du formulaire:', this.articleForm.value);
    console.log('articleId:', this.articleId);
    console.log('currentUser:', this.currentUser);

    // Éviter les soumissions multiples
    if (this.submitting) {
      console.log('Soumission déjà en cours, sortie de onSubmit');
      return;
    }

    // Si le formulaire n'est pas valide, marquer tous les champs comme touchés
    if (!this.articleForm.valid) {
      Object.keys(this.articleForm.controls).forEach(key => {
        const control = this.articleForm.get(key);
        control?.markAsTouched();
      });
      this.error = 'Veuillez corriger les erreurs du formulaire avant de soumettre.';
      return;
    }

    // Indiquer que la soumission est en cours
    this.submitting = true;
    this.error = '';

    try {
      // Variables communes
      const userId = this.currentUser?.userId || 1;
      const title = this.articleForm.value.title || 'Article sans titre';
      const content = this.articleForm.value.content || 'Contenu à remplir';
      const categoryId = this.articleForm.value.categoryId || null;
      const isActive = this.articleForm.value.isActive !== undefined ? this.articleForm.value.isActive : true;
      const imageUrl = this.articleForm.value.imageUrl || '';

      // En mode édition
      if (this.isEditMode && this.articleId) {
        console.log('Mode édition - articleId:', this.articleId);

        const updateData: UpdateArticleDTO = {
          id: this.articleId,
          title,
          content,
          categoryId,
          userId,
          isActive,
          imageUrl
        };

        this.articleService.updateArticle(updateData)
          .subscribe({
            next: () => {
              this.submitting = false;
              this.router.navigate(['/articles']);
            },
            error: (error) => {
              console.error('Erreur complète lors de la mise à jour:', error);
              this.error = 'Erreur lors de la mise à jour: ' +
                (error.error?.message || error.statusText || 'Erreur inconnue');
              this.submitting = false;
            }
          });
      }
      // En mode création
      else {
        console.log('Mode création');

        const createData: ArticleDTO = {
          title,
          content,
          categoryId,
          userId,
          isActive,
          imageUrl
        };

        console.log('Données à envoyer au serveur:', createData);
        console.log('Token d\'authentification présent:', !!this.authService.getToken());

        this.articleService.createArticle(createData)
          .subscribe({
            next: () => {
              this.submitting = false;
              this.router.navigate(['/articles']);
            },
            error: (error) => {
              console.error('Erreur complète lors de la création:', error);
              this.error = 'Erreur lors de la création: ' +
                (error.error?.message || error.statusText || 'Erreur inconnue');
              this.submitting = false;
            }
          });
      }
    } catch (err: any) {
      this.error = 'Une erreur est survenue: ' + (err.message || 'Erreur inconnue');
      console.error('Exception dans onSubmit:', err);
      this.submitting = false;
    }

    console.log('=== FIN onSubmit ===');
  }

  cancel(): void {
    this.router.navigate(['/articles']);
  }
}
