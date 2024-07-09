package com.qispine.invoice_management.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.qispine.invoice_management.Entities.Invoice;
import com.qispine.invoice_management.Entities.InvoiceDetails;
import com.qispine.invoice_management.Repository.InvoiceRepository;

@Service
public class InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Transactional
    public Invoice saveInvoice(Invoice invoice) {
        try {
            // Ensure bidirectional association
            for (InvoiceDetails details : invoice.getInvoiceDetails()) {
                details.setInvoice(invoice);
            }
            return invoiceRepository.save(invoice);
        } catch (Exception e) {
            // Handle or log the exception
            throw new RuntimeException("Failed to save invoice: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Invoice not found"));
    }

    @Transactional
    public Invoice updateInvoice(Long id, Invoice updatedInvoice) {
        try {
            Invoice invoice = getInvoiceById(id);
            invoice.setCustomerName(updatedInvoice.getCustomerName());
            invoice.setContact(updatedInvoice.getContact());
            invoice.setPaymentMethod(updatedInvoice.getPaymentMethod());
            invoice.setTotal(updatedInvoice.getTotal());
            invoice.setDate(updatedInvoice.getDate());

            // Clear existing details and update with new ones
            invoice.getInvoiceDetails().clear();
            for (InvoiceDetails details : updatedInvoice.getInvoiceDetails()) {
                details.setInvoice(invoice);
                invoice.getInvoiceDetails().add(details);
            }

            return invoiceRepository.save(invoice);
        } catch (Exception e) {
            // Handle or log the exception
            throw new RuntimeException("Failed to update invoice: " + e.getMessage());
        }
    }

    @Transactional
    public void deleteInvoice(Long id) {
        try {
            invoiceRepository.deleteById(id);
        } catch (Exception e) {
            // Handle or log the exception
            throw new RuntimeException("Failed to delete invoice: " + e.getMessage());
        }
    }
}
