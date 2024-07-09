package com.qispine.invoice_management.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qispine.invoice_management.Entities.Product;
import com.qispine.invoice_management.Repository.ProductRepository;
import java.util.List;


@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	public Product createProduct(Product product) {
		return productRepository.save(product);
	}
	
	public List<Product> getAllProducts(){
		return productRepository.findAll();
	}
	
	public Product getProductById(Long id) {
		return productRepository.findById(id).orElseThrow();
	}
	
	public Product updateProduct(Long id, Product productDetails) {
		Product product = productRepository.findById(id).orElseThrow();
		product.setName(productDetails.getName());
		product.setPrice(productDetails.getPrice());
		
		return productRepository.save(product);
		
	}
	
	public void deleteProduct(Long id) {
		Product product = productRepository.findById(id).orElseThrow();
		productRepository.delete(product);
	}
}
