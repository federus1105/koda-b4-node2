import express from 'express';
import router from './src/routes/index.js'; 
import Initdocs from './src/libs/docs.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static('src/uploads'));

Initdocs(app);

app.use('/', router);

app.get('/', (req, res)=>{
  res.json({
    message: 'Backend is running well',
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});