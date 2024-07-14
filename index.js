import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    const crypto = req.query.crypto || 'bitcoin';
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: {
                ids: crypto,
                vs_currencies: 'usd'
            }
        });
        const price = response.data[crypto]?.usd || 'N/A';
        res.render('index', { crypto, price });
    } catch (error) {
        console.error(error);
        res.render('index', { crypto, price: 'Error retrieving data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at :${port}`);
});
