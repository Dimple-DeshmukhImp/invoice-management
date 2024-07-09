import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button, Table } from 'react-bootstrap';
import {  Row, Col , Form} from 'react-bootstrap';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    contact: '',
    total: 0,
    paymentMethod: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
        setError('Error fetching invoices');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleView = (invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
  };

  const handleClose = () => {
    setShowViewModal(false);
    setShowEditModal(false);
    setSelectedInvoice(null);
    setFormData({
      customerName: '',
      contact: '',
      total: 0,
      paymentMethod: '',
    });
  };

  const handleEdit = (invoice) => {
    setSelectedInvoice(invoice);
    setFormData({
      customerName: invoice.customerName,
      contact: invoice.contact,
      total: invoice.total,
      paymentMethod: invoice.paymentMethod,
    });
    setShowEditModal(true);
  };

  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedInvoice = {
        ...selectedInvoice,
        customerName: formData.customerName,
        contact: formData.contact,
        total: formData.total,
        paymentMethod: formData.paymentMethod,
      };
   
      await axios.put(`http://localhost:8080/api/invoices/${selectedInvoice.invoiceid}`, updatedInvoice);

      // Update local state with the updated invoice
      const updatedInvoices = invoices.map((invoice) =>
        invoice.invoiceid === selectedInvoice.invoiceid ? updatedInvoice : invoice
      );
      setInvoices(updatedInvoices);

      // Close the modal after successful update
      setShowEditModal(false);
      setSelectedInvoice(null);
      setFormData({
        customerName: '',
        contact: '',
        total: 0,
        paymentMethod: '',
      });
    } catch (error) {
      console.error('Error updating invoice:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleDelete = async (invoiceId) => {
    try {
      await axios.delete(`http://localhost:8080/api/invoices/${invoiceId}`);
      setInvoices(invoices.filter((invoice) => invoice.invoiced !== invoiceId));
    } catch (error) {
      console.error('Error deleting invoice:', error);
      // Handle error, show error message, etc.
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Contact</th>
            <th>Total</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.invoiceId}>
              <td>{invoice.date}</td>
              <td>{invoice.customerName}</td>
              <td>{invoice.contact}</td>
              <td>{invoice.total}</td>
              <td>{invoice.paymentMethod}</td>
              <td>
                <FaEye style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleView(invoice)} />
                <FaEdit style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(invoice)} />
                <FaTrash style={{ cursor: 'pointer' }} onClick={() => handleDelete(invoice.invoiceid)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedInvoice && (
        <Modal show={showEditModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCustomerName">
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter customer name"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formTotal">
                <Form.Label>Total</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter total"
                  name="total"
                  value={formData.total}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formPaymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {selectedInvoice && (
        <Modal show={showViewModal} onHide={handleClose} >
          <Modal.Header closeButton>
            <Modal.Title>Invoice Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Customer Details</h5>
            <p><strong>Date:</strong> {selectedInvoice.date}</p>
            <Row>
              <Col>
              <p><strong>Name:</strong> {selectedInvoice.customerName}</p>
              </Col>
              <Col><p><strong>Contact:</strong> {selectedInvoice.contact}</p></Col>
              <Col><p><strong>Total:</strong> {selectedInvoice.total}</p></Col>
              <Col><p><strong>Payment Method:</strong> {selectedInvoice.paymentMethod}</p></Col>
            </Row>
        
            <h5>Invoice Items</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice.invoiceDetails.map((detail) => (
                  <tr key={detail.invoiceDetailsId}>
                    <td>{detail.productName}</td>
                    <td>{detail.qty}</td>
                    <td>{detail.price}</td>
                    <td>{detail.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default InvoiceList;

