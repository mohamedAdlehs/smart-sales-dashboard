import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root' // متوفرة في كامل التطبيق
})
export class ProductService {
  // البيانات الآن تعيش هنا في الخدمة
  private productsSignal = signal<Product[]>([
    { id: 1, name: 'شاشة سامسونج 4K', price: 1200, category: 'إلكترونيات', stock: 15 },
    { id: 2, name: 'لوحة مفاتيح ميكانيكية', price: 150, category: 'ملحقات', stock: 50 },
  ]);

  // Exposure للبيانات للقراءة فقط (للحفاظ على الأمان)
  products = this.productsSignal.asReadonly();

  // حساب الإجمالي داخل الخدمة
  totalValue = computed(() => 
    this.productsSignal().reduce((acc, p) => acc + (p.price * p.stock), 0)
  );

  addProduct(product: Product) {
    this.productsSignal.update(prev => [...prev, product]);
  }

  deleteProduct(id: number) {
    this.productsSignal.update(prev => prev.filter(p => p.id !== id));
  }
}