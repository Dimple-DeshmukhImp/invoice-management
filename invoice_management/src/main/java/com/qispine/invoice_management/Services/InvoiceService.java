package com.qispine.invoice_management.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qispine.invoice_management.Entities.Invoice;
import com.qispine.invoice_management.Repository.InvoiceRepository;

@Service
public class InvoiceService {

	@Autowired
	private InvoiceRepository invoiceRepository;
	
	public Invoice saveInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }

    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id).orElseThrow();
    }

    public Invoice updateInvoice(Long id, Invoice invoiceDetails) {
        Invoice invoice = getInvoiceById(id);
        invoice.setCustomerName(invoiceDetails.getCustomerName());
        invoice.setContact(invoiceDetails.getContact());
        invoice.setPaymentMethod(invoiceDetails.getPaymentMethod());
        invoice.setTotal(invoiceDetails.getTotal());
        invoice.setDate(invoiceDetails.getDate());

        // Update invoice details
        invoice.getInvoiceDetails().clear();
        invoice.getInvoiceDetails().addAll(invoiceDetails.getInvoiceDetails());

        return invoiceRepository.save(invoice);
    }

    public void deleteInvoice(Long id) {
        invoiceRepository.deleteById(id);
    }
	
}
