import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Category } from '../../Models/categorie.model';
import { CategoryService } from '../../services/categorie.service';
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
    private categoryService: CategoryService,
    private authService: AuthService
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required]],
      categoryId: [null],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Current user:', this.currentUser);

    if (!this.authService.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');
    //console.log('ID depuis les paramètres de route:', id);
    this.isEditMode = !!id;
    //console.log('Mode édition?', this.isEditMode);

    if (id) {
      this.articleId = +id;
      //console.log('articleId défini à:', this.articleId);
      this.loadArticle(+id);
    }

    this.loadCategories();
  }

  loadArticle(id: number): void {
    this.loading = true;
    //console.log('Chargement de l\'article avec ID:', id);

    this.articleService.getArticleById(id)
      .subscribe({
        next: (article: Article) => {
          //console.log('Article récupéré:', article);
          this.articleForm.patchValue({
            title: article.title,
            content: article.content,
            categoryId: article.categoryId,
            isActive: article.isActive
          });
          //console.log('Formulaire mis à jour avec les valeurs de l\'article');
          this.loading = false;
        },
        error: (error: any) => {
          this.error = 'Erreur lors du chargement de l\'article';
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
        },
        error: (error: any) => {
          this.error = 'Erreur lors du chargement des catégories';
          console.error(error);
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

      // En mode édition
      if (this.isEditMode && this.articleId) {
        console.log('Mode édition - articleId:', this.articleId);

        const updateData: UpdateArticleDTO = {
          id: this.articleId,
          title, content, categoryId, userId, isActive
        };

        this.articleService.updateArticle(updateData)
          .subscribe({
            next: () => {
              this.submitting = false;
              this.router.navigate(['/articles']);
            },
            error: (error) => {
              this.error = 'Erreur lors de la mise à jour';
              console.error(error);
              this.submitting = false;
            }
          });
      }
      // En mode création
      else {
        console.log('Mode création');

        const createData: ArticleDTO = {
          title, content, categoryId, userId, isActive
        };

        this.articleService.createArticle(createData)
          .subscribe({
            next: () => {
              this.submitting = false;
              this.router.navigate(['/articles']);
            },
            error: (error) => {
              this.error = 'Erreur lors de la création';
              console.error(error);
              this.submitting = false;
            }
          });
      }
    } catch (err) {
      this.error = 'Une erreur est survenue';
      console.error(err);
      this.submitting = false;
    }

    console.log('=== FIN onSubmit ===');
  }

  cancel(): void {
    this.router.navigate(['/articles']);
  }

  // Méthode temporaire pour tester la connexion et l'authentification
  testAuth(): void {
    console.log('Test d\'authentification');
    console.log('Utilisateur actuel:', this.currentUser);
    console.log('Token:', this.authService.getToken());

    // Tester l'accès à l'API
    this.articleService.getAllArticles().subscribe({
      next: (articles) => {
        console.log('Articles récupérés avec succès:', articles);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des articles:', error);
      }
    });
  }
}
