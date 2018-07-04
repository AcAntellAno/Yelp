var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const _PORT = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var campgrounds = [
  {
    name: 'Salmon Creek',
    image:
      'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1500&q=80'
  },
  {
    name: 'Salmon Creek',
    image:
      'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=1650&q=80'
  },
  {
    name: 'Salmon Creek',
    image:
      'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&s=73115e54fa3d099fcb2d92ccf12eee41&auto=format&fit=crop&w=1653&q=80'
  },
  {
    name: 'Salmon Creek',
    image:
      'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-0.3.5&s=3cea01429048ce122dff533448f43219&auto=format&fit=crop&w=1650&q=80'
  },
  {
    name: 'Salmon Creek',
    image:
      'https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-0.3.5&s=adf3225f314db1ac216ea22b6e58e925&auto=format&fit=crop&w=1650&q=80'
  },
  {
    name: 'Salmon Creek',
    image:
      'https://images.unsplash.com/photo-1486082570281-d942af5c39b7?ixlib=rb-0.3.5&s=c64bd8c13d331948149baf2a7e2ebf30&auto=format&fit=crop&w=1651&q=80'
  },
  {
    name: 'Salmon Creek',
    image:
      'https://images.unsplash.com/photo-1468956398224-6d6f66e22c35?ixlib=rb-0.3.5&s=ceb1121831b576d6483acb67f8c10d35&auto=format&fit=crop&w=1655&q=80'
  },
  {
    name: 'Salmon Creek',
    image:
      'https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5cedc6b95f731395da7269d2341f9a5e&auto=format&fit=crop&w=1500&q=80'
  }
];

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campgrounds: campgrounds }); //1st campgrounds = name, 2nd is our actual data
});

app.post('/campgrounds', (req, res) => {
  //get data from form and add to campgrounds array
  var campName = req.body.campName;
  var image = req.body.image;
  var newCampground = { name: campName, image: image };
  campgrounds.push(newCampground);
  //redirect back to campgrounds page
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs');
});

app.listen(_PORT, () => {
  console.log('The magic is on port 8080...');
});
