// Updated DataFetcher.js with Material-UI
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { TextField } from '@mui/material';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://spreadsheets.google.com/feeds/list/2PACX-1vTI9NHb5snf1-B50oizmP1bQa_UePTvxy1fq21ctUs_6uPKQDf1sKi9ByvPbo2MK3twLGIBwqHxyQRm/od6/public/values?alt=json';

      try {
        const response = await axios.get(url);
        const rows = response.data.feed.entry.map(entry => {
          return {
            name: entry.gsx$name.$t,
            description: entry.gsx$description.$t,
            price: entry.gsx$price.$t,
            imageUrl: entry.gsx$imageurl.$t,
          };
        });
        setData(rows);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

  fetchData();
  const interval = setInterval(() => {
    fetchData();
  }, 60000); // Refresh every 60 seconds

  return () => clearInterval(interval);
}, []);

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {filteredData.map((item, index) => (
        // ... existing card code
      ))}
    </div>
  );
};

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <img src={item.imageUrl} alt={item.name} width="200" />
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default DataFetcher;

return (
  <div>
    {data.map((item, index) => (
      <Card key={index} style={{ maxWidth: 345, margin: '20px auto' }}>
        <CardMedia
          component="img"
          height="140"
          image={item.imageUrl}
          alt={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <Typography variant="h6" color="text.primary">
            {item.price}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </div>
);