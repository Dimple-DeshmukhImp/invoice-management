package com.qispine.invoice_management.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.qispine.invoice_management.Entities.InvoiceDetails;

public interface InvoiceDetailsRepository extends JpaRepository<InvoiceDetails, Long>{

}
