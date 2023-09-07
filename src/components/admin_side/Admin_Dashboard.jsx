import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';
import Admin_Navbar from './Admin_Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

function Admin_Dashboard({show}) {
  console.log('is_admin',show);
  const [data, setData] = useState([]);
  const [selectedpaymet, setSelectedpayment] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [Paymetdetals,setPaymentdetail]= useState([])
  const navigate=useNavigate()

  useEffect(() => {
    
      if (show) {
        
      
    
    // Fetch data from API
    axiosInstance.get('/user_side/api/admin_dashboard1/')
      .then(response => {
        setData(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      }else{
        navigate('/')
      }
  }, []);

  console.log(Paymetdetals);
  // Extract labels and values for the charts
  const chartData = data.map(item => ({ label: item.plan, value: item.amount }));
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  return (
    <>
    <Admin_Navbar/>
    <Container>
      <h1 className="mt-4">Dashboard</h1>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="bg-white p-4">
            <h3 className="mb-4">Custom Bar Chart</h3>
            <BarChart width={300} height={200} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="bg-white p-4">
            <h3 className="mb-4">Custom Line Chart</h3>
            <LineChart width={300} height={200} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="bg-white p-4">
            <h3 className="mb-4">Custom Pie Chart</h3>
            <PieChart width={300} height={200}>
              <Pie data={chartData} dataKey="value" nameKey="label" cx="50%" cy="50%" outerRadius={50}>
                {
                  chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
      </Row>
    </Container>
    <Row>
  <Col md={12} className="mb-4">
    <Card className="bg-white p-4">
      <h3 className="mb-4">Data Table</h3>
      <table className="table table-bordered rounded-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>username</th>
            <th>plan</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {item.user_details.username?
              <td>{item.user_details.username}</td>:
              <td>null</td>

}
              <td>{item.plan}</td>
             

            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  </Col>
</Row>
<Modal show={modalShow} onHide={() => setModalShow(false)}>
  <Modal.Header closeButton>
    <Modal.Title>User Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {Paymetdetals ? (
      
      <>
      
        <p>Payment ID: {Paymetdetals.id}</p>
        <p>Amount: {Paymetdetals.amount}</p>
        {/* Add more payment details here */}
      </>
    ) : (
      <p>No payment details available.</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setModalShow(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
}

export default Admin_Dashboard;
