import axios from 'axios';

class ProductService {
  constructor() {
    this.baseUrl = 'http://192.168.43.179:9001';
  }

  async allProducts(pageNo, category) {
    try {
      const cat =
        category !== null ? (category === 'All' ? null : category) : null;

      const url = `${this.baseUrl}/api/v1/product/all-products?${
        cat && `category=${cat}`
      }&pageNo=${pageNo}`;
      const response = await axios.get(url);
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const productService = new ProductService();
