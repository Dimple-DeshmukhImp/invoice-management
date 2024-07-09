package com.qispine.invoice_management.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.qispine.invoice_management.Entities.Invoice;
import com.qispine.invoice_management.Services.InvoiceService;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

	@Autowired
	private InvoiceService invoiceService;
	
	 @PostMapping
	    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
	        return new ResponseEntity<>(invoiceService.saveInvoice(invoice), HttpStatus.CREATED);
	    }

	    @GetMapping
	    public List<Invoice> getAllInvoices() {
	        return invoiceService.getAllInvoices();
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
	        return new ResponseEntity<>(invoiceService.getInvoiceById(id), HttpStatus.OK);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody Invoice invoiceDetails) {
	        return new ResponseEntity<>(invoiceService.updateInvoice(id, invoiceDetails), HttpStatus.OK);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteInvoice(@PathVariable Long id) {
	        invoiceService.deleteInvoice(id);
	        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	    }
}
