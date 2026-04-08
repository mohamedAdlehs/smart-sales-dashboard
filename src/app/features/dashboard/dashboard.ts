import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
// 1. إضافة مكتبات النماذج
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // 2. تأكد من إضافة ReactiveFormsModule هنا
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  private fb = inject(FormBuilder); // طريقة حديثة بدلاً من الـ Constructor

  // 3. بناء النموذج مع شروط التحقق
  productForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(1)]],
    category: ['إلكترونيات'],
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  products = signal<Product[]>([
    { id: 1, name: 'شاشة سامسونج 4K', price: 1200, category: 'إلكترونيات', stock: 15 },
    { id: 2, name: 'لوحة مفاتيح ميكانيكية', price: 150, category: 'ملحقات', stock: 50 },
  ]);

  totalInventoryValue = computed(() => 
    this.products().reduce((acc, p) => acc + (p.price * p.stock), 0)
  );

  // 4. وظيفة الإضافة
  addProduct() {
    if (this.productForm.valid) {
      const newProduct = {
        ...this.productForm.value,
        id: Date.now() // توليد ID مؤقت
      } as Product;

      // تحديث الـ Signal (ستلاحظ تحديث الجدول والإجمالي فوراً!)
      this.products.update(prev => [...prev, newProduct]);
      
      this.productForm.reset({ price: 0, stock: 0, category: 'إلكترونيات' });
    }
  }

  deleteProduct(id: number) {
    this.products.update(prev => prev.filter(p => p.id !== id));
  }
}