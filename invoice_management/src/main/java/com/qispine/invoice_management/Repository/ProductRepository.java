package com.qispine.invoice_management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qispine.invoice_management.Entities.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
