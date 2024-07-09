package com.qispine.invoice_management.Entities;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;

@Entity
public class Invoice {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long invoiceid;
	
	@NotNull
	private String invoiceNumber;
	
	@NotNull
	private LocalDate date;
	
	@NotNull
	private String customerName;
	
	@NotNull
	private String contact;
	
	@NotNull
	private BigDecimal total;
	
	@NotNull
	private String paymentMethod;
	
	@OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL,orphanRemoval = true)
	private List<InvoiceDetails> invoiceDetails = new ArrayList<>();

	
	
	public Invoice() {
		super();
		// TODO Auto-generated constructor stub
	}



	public Invoice(Long invoiceid, @NotNull String invoiceNumber, @NotNull LocalDate date, @NotNull String customerName,
			@NotNull String contact, @NotNull BigDecimal total, @NotNull String paymentMethod,
			List<InvoiceDetails> invoiceDetails) {
		super();
		this.invoiceid = invoiceid;
		this.invoiceNumber = invoiceNumber;
		this.date = date;
		this.customerName = customerName;
		this.contact = contact;
		this.total = total;
		this.paymentMethod = paymentMethod;
		this.invoiceDetails = invoiceDetails;
	}



	public Long getInvoiceid() {
		return invoiceid;
	}



	public void setInvoiceid(Long invoiceid) {
		this.invoiceid = invoiceid;
	}



	public String getInvoiceNumber() {
		return invoiceNumber;
	}



	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}



	public LocalDate getDate() {
		return date;
	}



	public void setDate(LocalDate date) {
		this.date = date;
	}



	public String getCustomerName() {
		return customerName;
	}



	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}



	public String getContact() {
		return contact;
	}



	public void setContact(String contact) {
		this.contact = contact;
	}



	public BigDecimal getTotal() {
		return total;
	}



	public void setTotal(BigDecimal total) {
		this.total = total;
	}



	public String getPaymentMethod() {
		return paymentMethod;
	}



	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}



	public List<InvoiceDetails> getInvoiceDetails() {
		return invoiceDetails;
	}



	public void setInvoiceDetails(List<InvoiceDetails> invoiceDetails) {
		this.invoiceDetails = invoiceDetails;
	}
	
	
	
}
