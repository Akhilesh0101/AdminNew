import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../admin-services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
  imports: [CommonModule]
})
export class AdminProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load all products from the API
  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        console.log('Fetched products:', data);  // Debug: log the products
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Add a new product (similar to adding a health tip)
  onAddProduct() {
    // Prompt the user for product details
    const productName = prompt('Enter product name:', 'New Product');
    const productImage = prompt('Enter product image URL:', '');
    const productDescription = prompt('Enter product description:', 'Description of the new product');
    const productPrice = prompt('Enter product price:', '0');
    const stockQuantity = prompt('Enter stock quantity:', '0');
    const categoryId = prompt('Enter category ID (number):', '1'); // Default category ID is 1
    const createdByAdminId = prompt('Enter Admin ID (number):', '1'); // Default admin ID is 1

    // Validate inputs before proceeding
    if (productName && productImage && productDescription && productPrice && stockQuantity && categoryId && createdByAdminId) {
      // Create a new Product object
      const newProduct: Product = {
        ProductId: 0,  // Backend will assign this ID
        ProductName: productName,
        Productimg: productImage,
        Description: productDescription,
        Price: parseFloat(productPrice),  // Ensure price is a number
        StockQuantity: parseInt(stockQuantity, 10),  // Ensure stock quantity is a number
        CategoryId: parseInt(categoryId, 10),  // Ensure category ID is a number
        CreatedByAdminId: parseInt(createdByAdminId, 10)  // Ensure Admin ID is a number
      };

      // Call the service to add the new product
      this.productService.addProduct(newProduct).subscribe(
        (product) => {
          this.products.push(product);  // Add the new product to the list
          console.log('Added new product:', product);
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    } else {
      console.error('Please fill in all fields.');
    }
  }

  // Edit an existing product
  onEditProduct(product: Product) {
    // Prompt for each field to be updated
    const updatedName = prompt('Enter new product name:', product.ProductName);
    const updatedImage = prompt('Enter new product Image URL:', product.Productimg);
    const updatedDescription = prompt('Enter new product Description:', product.Description);
    const updatedCategory = prompt('Enter new product category Id:', product.CategoryId.toString());
    const updatedPrice = prompt('Enter new product price:', product.Price.toString());
    const updatedStockQuantity = prompt('Enter new stock quantity:', product.StockQuantity.toString());

    // Check if required fields are updated
    if (updatedName && updatedImage && updatedDescription && updatedCategory && updatedPrice && updatedStockQuantity) {
      // Assign updated values to the product object
      const updatedProduct: Product = {
        ...product,  // Keep existing values for fields that aren't being updated
        ProductName: updatedName,
        Productimg: updatedImage,
        Description: updatedDescription,
        CategoryId: parseInt(updatedCategory, 10),
        Price: parseFloat(updatedPrice),
        StockQuantity: parseInt(updatedStockQuantity, 10)
      };

      // Call the update API
      this.productService.updateProduct(product.ProductId, updatedProduct).subscribe(
        () => {
          // Update the local product list with the updated product
          const index = this.products.findIndex(p => p.ProductId === product.ProductId);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      alert('All fields are required.');
    }
  }

  // Delete product
  onDeleteProduct(productId: number) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter(p => p.ProductId !== productId);
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }
}
