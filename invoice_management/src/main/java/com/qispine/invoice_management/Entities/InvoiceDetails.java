package com.qispine.invoice_management.Entities;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Entity
public class InvoiceDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long invoiceDetailsId;
	
	@NotNull
	private String productName;
	
	@NotNull
	private BigDecimal price;
	
	@NotNull
	private Integer qty;
	
	@NotNull
	private BigDecimal totalPrice;
	
	@ManyToOne
	@JoinColumn(name="invoiceId")
	private Invoice invoice;
	
	

	public InvoiceDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InvoiceDetails(Long invoiceDetailsId, @NotNull String productName, @NotNull BigDecimal price,
			@NotNull Integer qty, @NotNull BigDecimal totalPrice, Invoice invoice) {
		super();
		this.invoiceDetailsId = invoiceDetailsId;
		this.productName = productName;
		this.price = price;
		this.qty = qty;
		this.totalPrice = totalPrice;
		this.invoice = invoice;
	}

	public Long getInvoiceDetailsId() {
		return invoiceDetailsId;
	}

	public void setInvoiceDetailsId(Long invoiceDetailsId) {
		this.invoiceDetailsId = invoiceDetailsId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Integer getQty() {
		return qty;
	}

	public void setQty(Integer qty) {
		this.qty = qty;
	}

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Invoice getInvoice() {
		return invoice;
	}

	public void setInvoice(Invoice invoice) {
		this.invoice = invoice;
	}
	
	
	
	
}
