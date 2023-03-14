import { useState, useEffect } from 'react';
import { getAuthors, getCategories, postBook } from 'api/request.api';

function BookForm() {
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    price: '',
    discount: '',
    image: ''
  });
  const [formErrors, setFormErrors] = useState({
    title: '',
    author: '',
    category: '',
    price: '',
    discount: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const authorResponse = await getAuthors();
      const categoryResponse = await getCategories();
      setAuthors(authorResponse.data);
      setCategories(categoryResponse.data);
    };
    fetchData();
  }, []);

  const validateFormData = () => {
    let errors = {};
    if (!formData.title) {
      errors.title = 'Title is required';
    }
    if (!formData.author) {
      errors.author = 'Author is required';
    }
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    if (!formData.price) {
      errors.price = 'Price is required';
    } else if (formData.price < 0) {
      errors.price = 'Price must be a positive number';
    }
    if (formData.discount && formData.discount < 0) {
      errors.discount = 'Discount must be a positive number';
    }
    if (!formData.image) {
      errors.image = 'Image is required';
    } else if (
      formData.image.type !== 'image/jpeg' &&
      formData.image.type !== 'image/png'
    ) {
      errors.image = 'Image must be a JPEG or PNG file';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === 'author' || name === 'category') {
      const selectedOption = Array.from(e.target.selectedOptions, option => option.value);
      setFormData({ ...formData, [name]: selectedOption });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateFormData();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        const response = await postBook(formData);
        setSubmitSuccess(true);
        setFormData({
          title: '',
          author: '',
          category: '',
          price: '',
          discount: '',
          image: ''
        });
      } catch (error) {
        console.log(error);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {formErrors.title && <div className="error">{formErrors.title}</div>}
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <select
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
        >
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author._id} value={author._id}>
              {author.name}
            </option>
          ))}
        </select>
        {formErrors.author && <div className="error">{formErrors.author}</div>}
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
        {formErrors.category && <div className="error">{formErrors.category}</div>}
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        {formErrors.price && <div className="error">{formErrors.price}</div>}
      </div>
      <div>
        <label htmlFor="discount">Discount</label>
        <input
          type="number"
          id="discount"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default BookForm;