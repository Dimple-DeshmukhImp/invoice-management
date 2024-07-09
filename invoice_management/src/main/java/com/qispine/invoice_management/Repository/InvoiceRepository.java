package com.qispine.invoice_management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qispine.invoice_management.Entities.Invoice;

public interface InvoiceRepository extends JpaRepository<Invoice, Long>{

}
