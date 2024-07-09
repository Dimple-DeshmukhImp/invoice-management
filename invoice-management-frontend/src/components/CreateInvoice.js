
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const CreateInvoice = () => {
  const [customerName, setCustomerName] = useState('');
  const [contact, setContact] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [todayDate, setTodayDate] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setTodayDate(getFormattedDate());
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      const product = products.find(p => p.id === parseInt(selectedProduct));
      setUnitPrice(product.price);
      setTotalPrice(product.price * quantity);
    }
  }, [selectedProduct, quantity, products]);

  const handleAddProduct = () => {
    const product = products.find(p => p.id === parseInt(selectedProduct));
    const newProduct = {
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
      totalPrice: product.price * quantity,
    };
    setProductList([...productList, newProduct]);
  };

  const handleRemoveProduct = (index) => {
    const newList = productList.filter((_, i) => i !== index);
    setProductList(newList);
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', { customerName, contact, paymentMethod, productList });
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    const invoice = {
       // Generate invoice number as needed
      date: todayDate,
      customerName,
      contact,
      total: calculateTotalAmount(), // Calculate total amount based on productList
      paymentMethod,
      invoiceDetails: productList.map(product => ({
        productName: product.name,
        price: product.unitPrice,
        qty: product.quantity,
        totalPrice: product.totalPrice,

      }))
    };
  
    try {
      const response = await axios.post('http://localhost:8080/api/invoices', invoice);
      console.log('Invoice created:', response.data);
      // Reset form fields or redirect as needed
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };
  

  const getFormattedDate = () => {
    const date = new Date().toISOString().split('T')[0];
    return date;
  };

  const calculateTotalAmount = () => {
    let total = 0;
    productList.forEach(product => {
      total += product.totalPrice;
    });
    return total;
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-4 mt-4">
          <Col>
            <h3>Customer Details</h3>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control type="text" value={todayDate} readOnly />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    required
                  >
                    <option value="">Select Payment Method</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h3>Add Product</h3>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    as="select"
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    required
                  >
                    <option value="">Select Product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder="Unit Price"
                    value={unitPrice}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder="Total Price"
                    value={totalPrice}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button variant="primary" onClick={handleAddProduct}>Add</Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h3>Order Details</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Product Name</th>
                  <th>Unit Price</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.unitPrice}</td>
                    <td>{product.quantity}</td>
                    <td>{product.totalPrice}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemoveProduct(index)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <h4>Total Amount: ${calculateTotalAmount()}</h4>
          </Col>
        </Row>
        <Button variant="success" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default CreateInvoice;
