var express = require('express');
var app = express();
const _PORT = 8080;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  var campgrounds = [
    {
      name: 'Salmon Creek',
      image:
        'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1500&q=80'
    },
    {
      name: 'Colorado Springs',
      image:
        'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&s=73115e54fa3d099fcb2d92ccf12eee41&auto=format&fit=crop&w=1506&q=80'
    },
    {
      name: 'Granite Hill',
      image:
        'https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&s=14948b1b6a8dd54164a0db522662e869&auto=format&fit=crop&w=1500&q=80'
    }
  ];
  res.render('campgrounds', { campgrounds: campgrounds }); //1st campgrounds = name, 2nd is our actual data
});

app.listen(_PORT, () => {
  console.log('The magic is on port 8080...');
});
